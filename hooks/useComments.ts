import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

type CommentRow = Database["public"]["Tables"]["comments"]["Row"];
type CommentInsert = Database["public"]["Tables"]["comments"]["Insert"];

export interface CommentWithAuthor extends CommentRow {
  author: {
    username: string;
    full_name: string | null;
    avatar_url: string | null;
  };
}

export interface CommentTreeNode extends CommentWithAuthor {
  replies: CommentTreeNode[];
}

function buildCommentTree(
  comments: (CommentRow & { author: { username: string; full_name: string | null; avatar_url: string | null } })[],
  maxDepth: number
): CommentTreeNode[] {
  const commentMap = new Map<string, CommentTreeNode>();
  const rootComments: CommentTreeNode[] = [];

  for (const comment of comments) {
    commentMap.set(comment.id, {
      ...comment,
      replies: [],
    });
  }

  for (const comment of comments) {
    const node = commentMap.get(comment.id)!;
    if (comment.parent_id && commentMap.has(comment.parent_id)) {
      const parent = commentMap.get(comment.parent_id)!;
      if (parent.replies.length < 3) {
        parent.replies.push(node);
      } else {
        node.depth = maxDepth;
        rootComments.push(node);
      }
    } else {
      rootComments.push(node);
    }
  }

  return rootComments;
}

export function useComments(discussionId: string) {
  return useQuery({
    queryKey: ["comments", discussionId],
    queryFn: async () => {
      const supabase = createClient();

      const { data: comments, error } = await supabase
        .from("comments")
        .select(`
          *,
          author:profiles!author_id (
            username,
            full_name,
            avatar_url
          )
        `)
        .eq("discussion_id", discussionId)
        .is("deleted_at", null)
        .order("created_at", { ascending: true });

      if (error) throw new Error(error.message);

      const { data: discussion } = await supabase
        .from("discussions")
        .select("comments_count")
        .eq("id", discussionId)
        .single();

      return buildCommentTree(comments || [], discussion?.comments_count || 0);
    },
    enabled: !!discussionId,
  });
}

export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      discussionId,
      content,
      parentId = null,
    }: {
      discussionId: string;
      content: string;
      parentId?: string | null;
    }) => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) throw new Error("Unauthorized");

      const parentDepth = parentId
        ? await fetchParentDepth(parentId)
        : -1;

      const insertData: CommentInsert = {
        discussion_id: discussionId,
        content,
        author_id: user.id,
        parent_id: parentId,
        depth: parentDepth + 1,
      };

      const { data, error } = await supabase
        .from("comments")
        .insert(insertData)
        .select()
        .single();

      if (error) throw new Error(error.message);

      const { error: countError } = await supabase.rpc("increment_comments_count", {
        discussion_id: discussionId,
      });

      if (countError) console.error("Failed to update comment count:", countError);

      return data as CommentRow;
    },
    onSuccess: (_, { discussionId }) => {
      queryClient.invalidateQueries({ queryKey: ["comments", discussionId] });
    },
  });
}

async function fetchParentDepth(parentId: string): Promise<number> {
  const supabase = createClient();
  const { data } = await supabase
    .from("comments")
    .select("depth")
    .eq("id", parentId)
    .single();

  return data?.depth ?? 0;
}

export function useUpdateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      commentId,
      content,
    }: {
      commentId: string;
      content: string;
    }) => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) throw new Error("Unauthorized");

      const { data: comment } = await supabase
        .from("comments")
        .select("author_id")
        .eq("id", commentId)
        .single();

      if (comment?.author_id !== user.id) {
        throw new Error("You can only edit your own comments");
      }

      const { data, error } = await supabase
        .from("comments")
        .update({ content })
        .eq("id", commentId)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data as CommentRow;
    },
    onSuccess: (_, { commentId }) => {
      queryClient.invalidateQueries({ queryKey: ["comment", commentId] });
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
}

export function useDeleteComment() {
  return useMutation({
    mutationFn: async (commentId: string) => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) throw new Error("Unauthorized");

      const { data: comment } = await supabase
        .from("comments")
        .select("author_id, discussion_id")
        .eq("id", commentId)
        .single();

      if (comment?.author_id !== user.id) {
        throw new Error("You can only delete your own comments");
      }

      const { error: deleteError } = await supabase
        .from("comments")
        .update({ deleted_at: new Date().toISOString() })
        .eq("id", commentId);

      if (deleteError) throw new Error(deleteError.message);

      const { error: countError } = await supabase.rpc("decrement_comments_count", {
        discussion_id: comment?.discussion_id,
      });

      if (countError) console.error("Failed to update comment count:", countError);

      return commentId;
    },
  });
}
