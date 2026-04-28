"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { extractMentionUsernames } from "@/lib/utils/comment-utils";

interface User {
  username: string;
  full_name: string | null;
  avatar_url: string | null;
}

interface CommentFormProps {
  onSubmit: (content: string, parentId?: string) => Promise<void> | void;
  parentId?: string | null;
  placeholder?: string;
  onCancel?: () => void;
  autoFocus?: boolean;
  disabled?: boolean;
}

export function CommentForm({
  onSubmit,
  parentId = null,
  placeholder = "Tulis komentar...",
  onCancel,
  autoFocus = false,
  disabled = false,
}: CommentFormProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMentions, setShowMentions] = useState(false);
  const [mentionSearch, setMentionSearch] = useState("");
  const [mentionUsers, setMentionUsers] = useState<User[]>([]);
  const [selectedMentionIndex, setSelectedMentionIndex] = useState(0);
  const [cursorPosition, setCursorPosition] = useState<number | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Mock users for autocomplete demo - in production, fetch from API
  const mockUsers: User[] = [
    { username: "andreas_smith", full_name: "Andreas Smith", avatar_url: null },
    { username: "budi_rahman", full_name: "Budi Rahman", avatar_url: null },
    { username: "citra_dewi", full_name: "Citra Dewi", avatar_url: null },
    { username: "doni_kusuma", full_name: "Doni Kusuma", avatar_url: null },
    { username: "eka_wijaya", full_name: "Eka Wijaya", avatar_url: null },
    { username: "fajar_nugroho", full_name: "Fajar Nugroho", avatar_url: null },
  ];

  // Filter users based on mention search
  useEffect(() => {
    if (mentionSearch) {
      const filtered = mockUsers.filter((user) =>
        user.username.toLowerCase().includes(mentionSearch.toLowerCase()) ||
        (user.full_name?.toLowerCase().includes(mentionSearch.toLowerCase()))
      );
      setMentionUsers(filtered.slice(0, 5));
      setSelectedMentionIndex(0);
    } else {
      setMentionUsers(mockUsers.slice(0, 5));
      setSelectedMentionIndex(0);
    }
  }, [mentionSearch]);

  // Handle input change and detect @mention
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      const cursorPos = e.target.selectionStart;
      setContent(value);
      setCursorPosition(cursorPos);

      // Find if cursor is near an @mention
      const textBeforeCursor = value.slice(0, cursorPos);
      const mentionMatch = textBeforeCursor.match(/@([a-zA-Z0-9_]*)$/);

      if (mentionMatch) {
        setShowMentions(true);
        setMentionSearch(mentionMatch[1]);
      } else {
        setShowMentions(false);
        setMentionSearch("");
      }
    },
    []
  );

  // Insert mention into textarea
  const insertMention = useCallback(
    (username: string) => {
      if (cursorPosition === null || !textareaRef.current) return;

      const textBeforeCursor = content.slice(0, cursorPosition);
      const textAfterCursor = content.slice(cursorPosition);

      // Find the @ symbol position
      const mentionStartMatch = textBeforeCursor.match(/@([a-zA-Z0-9_]*)$/);
      if (mentionStartMatch) {
        const mentionStart = textBeforeCursor.lastIndexOf("@");
        const newTextBefore = textBeforeCursor.slice(0, mentionStart);
        const newContent = `${newTextBefore}@${username} ${textAfterCursor}`;

        setContent(newContent);
        setShowMentions(false);
        setMentionSearch("");

        // Reset cursor position after insertion
        setTimeout(() => {
          if (textareaRef.current) {
            const newCursorPos = newTextBefore.length + username.length + 2;
            textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
            textareaRef.current.focus();
          }
        }, 0);
      }
    },
    [content, cursorPosition]
  );

  // Handle keyboard navigation in mention dropdown
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (!showMentions || mentionUsers.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedMentionIndex((prev) =>
            prev < mentionUsers.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedMentionIndex((prev) =>
            prev > 0 ? prev - 1 : mentionUsers.length - 1
          );
          break;
        case "Enter":
        case "Tab":
          if (showMentions) {
            e.preventDefault();
            insertMention(mentionUsers[selectedMentionIndex].username);
          }
          break;
        case "Escape":
          e.preventDefault();
          setShowMentions(false);
          break;
      }
    },
    [showMentions, mentionUsers, selectedMentionIndex, insertMention]
  );

  // Handle form submission
  const handleSubmitForm = useCallback(async () => {
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit(content.trim(), parentId || undefined);
      setContent("");
      setShowMentions(false);
      setMentionSearch("");
    } catch {
      // Error handling - form will remain with content
    } finally {
      setIsSubmitting(false);
    }
  }, [content, isSubmitting, onSubmit, parentId]);

  // Handle keyboard shortcut for submit
  const handleSubmitKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleSubmitForm();
      }
    },
    [handleSubmitForm]
  );

  return (
    <div className="space-y-3">
      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={content}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            handleKeyDown(e);
            handleSubmitKeyDown(e);
          }}
          placeholder={placeholder}
          autoFocus={autoFocus}
          disabled={disabled || isSubmitting}
          className="min-h-[80px] pr-12 resize-none"
        />

        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={handleSubmitForm}
          disabled={!content.trim() || isSubmitting || disabled}
          className="absolute right-2 bottom-2 h-8 w-8 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>

      {/* Mention Autocomplete Popover */}
      <Popover open={showMentions && mentionUsers.length > 0} onOpenChange={setShowMentions}>
        <PopoverContent
          className="w-80 p-0"
          align="start"
          sideOffset={-40}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="py-1">
            {mentionUsers.length === 0 ? (
              <div className="px-3 py-2 text-sm text-muted-foreground/70">
                Tidak ada pengguna ditemukan
              </div>
            ) : (
              mentionUsers.map((user, index) => (
                <button
                  key={user.username}
                  type="button"
                  onClick={() => insertMention(user.username)}
                  className={`flex items-center gap-3 w-full px-3 py-2 text-sm text-left transition-colors ${
                    index === selectedMentionIndex
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "text-foreground/80 hover:bg-muted"
                  }`}
                >
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={user.avatar_url || undefined} />
                    <AvatarFallback className="bg-emerald-500/20 text-emerald-400 text-xs">
                      {user.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <span className="font-medium truncate">
                      @{user.username}
                    </span>
                    {user.full_name && (
                      <span className="text-xs text-muted-foreground/70 truncate">
                        {user.full_name}
                      </span>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </PopoverContent>
      </Popover>

      {onCancel && (
        <div className="flex justify-end">
          <Button type="button" variant="ghost" onClick={onCancel}>
            Batal
          </Button>
        </div>
      )}
    </div>
  );
}

export default CommentForm;
