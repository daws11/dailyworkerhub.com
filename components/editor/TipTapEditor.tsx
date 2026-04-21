import * as React from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import { common, createLowlight } from "lowlight"
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  Minus,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Toggle } from "@/components/ui/toggle"

const lowlight = createLowlight(common)

interface TipTapEditorProps {
  content?: string
  onChange?: (html: string) => void
  placeholder?: string
  className?: string
  editable?: boolean
}

const TipTapEditor = React.forwardRef<HTMLDivElement, TipTapEditorProps>(
  ({ content = "", onChange, placeholder = "Start writing your article...", className, editable = true }, ref) => {
    const editor = useEditor({
      extensions: [
        StarterKit.configure({
          codeBlock: false,
        }),
        Image.configure({
          HTMLAttributes: {
            class: "rounded-md max-w-full h-auto",
          },
        }),
        Link.configure({
          openOnClick: false,
          HTMLAttributes: {
            class: "text-primary underline underline-offset-4 hover:text-primary/80",
          },
        }),
        Placeholder.configure({
          placeholder,
        }),
        CodeBlockLowlight.configure({
          lowlight,
        }),
      ],
      content,
      editable,
      onUpdate: ({ editor }) => {
        onChange?.(editor.getHTML())
      },
    })

    React.useEffect(() => {
      if (editor && content !== editor.getHTML()) {
        editor.commands.setContent(content)
      }
    }, [editor, content])

    React.useEffect(() => {
      if (editor) {
        editor.setEditable(editable)
      }
    }, [editor, editable])

    if (!editor) {
      return null
    }

    const addLink = () => {
      const url = window.prompt("Enter URL:")
      if (url) {
        editor.chain().focus().setLink({ href: url }).run()
      }
    }

    const addImage = () => {
      const url = window.prompt("Enter image URL:")
      if (url) {
        editor.chain().focus().setImage({ src: url }).run()
      }
    }

    return (
      <div ref={ref} className={cn("flex flex-col", className)}>
        <div className="flex flex-wrap gap-1 p-2 border-b bg-muted/50">
          <Toggle
            size="sm"
            pressed={editor.isActive("heading", { level: 1 })}
            onPressedChange={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            disabled={!editable}
            aria-label="Heading 1"
          >
            <Heading1 className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive("heading", { level: 2 })}
            onPressedChange={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            disabled={!editable}
            aria-label="Heading 2"
          >
            <Heading2 className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive("heading", { level: 3 })}
            onPressedChange={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            disabled={!editable}
            aria-label="Heading 3"
          >
            <Heading3 className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive("heading", { level: 4 })}
            onPressedChange={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
            disabled={!editable}
            aria-label="Heading 4"
          >
            <Heading4 className="h-4 w-4" />
          </Toggle>

          <div className="w-px h-6 bg-border mx-1 self-center" />

          <Toggle
            size="sm"
            pressed={editor.isActive("bold")}
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
            disabled={!editable}
            aria-label="Bold"
          >
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive("italic")}
            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editable}
            aria-label="Italic"
          >
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive("strike")}
            onPressedChange={() =>
              editor.chain().focus().toggleStrike().run()
            }
            disabled={!editable}
            aria-label="Strikethrough"
          >
            <Strikethrough className="h-4 w-4" />
          </Toggle>

          <div className="w-px h-6 bg-border mx-1 self-center" />

          <Toggle
            size="sm"
            pressed={editor.isActive("bulletList")}
            onPressedChange={() =>
              editor.chain().focus().toggleBulletList().run()
            }
            disabled={!editable}
            aria-label="Bullet list"
          >
            <List className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive("orderedList")}
            onPressedChange={() =>
              editor.chain().focus().toggleOrderedList().run()
            }
            disabled={!editable}
            aria-label="Ordered list"
          >
            <ListOrdered className="h-4 w-4" />
          </Toggle>

          <div className="w-px h-6 bg-border mx-1 self-center" />

          <Toggle
            size="sm"
            pressed={editor.isActive("code")}
            onPressedChange={() => editor.chain().focus().toggleCode().run()}
            disabled={!editable}
            aria-label="Inline code"
          >
            <Code className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive("codeBlock")}
            onPressedChange={() =>
              editor.chain().focus().toggleCodeBlock().run()
            }
            disabled={!editable}
            aria-label="Code block"
          >
            <span className="text-xs font-mono">{"</>"}</span>
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive("blockquote")}
            onPressedChange={() =>
              editor.chain().focus().toggleBlockquote().run()
            }
            disabled={!editable}
            aria-label="Blockquote"
          >
            <Quote className="h-4 w-4" />
          </Toggle>

          <div className="w-px h-6 bg-border mx-1 self-center" />

          <Toggle
            size="sm"
            pressed={editor.isActive("link")}
            onPressedChange={addLink}
            disabled={!editable}
            aria-label="Add link"
          >
            <LinkIcon className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={false}
            onPressedChange={addImage}
            disabled={!editable}
            aria-label="Add image"
          >
            <ImageIcon className="h-4 w-4" />
          </Toggle>

          <div className="w-px h-6 bg-border mx-1 self-center" />

          <Toggle
            size="sm"
            pressed={false}
            onPressedChange={() =>
              editor.chain().focus().setHorizontalRule().run()
            }
            disabled={!editable}
            aria-label="Horizontal rule"
          >
            <Minus className="h-4 w-4" />
          </Toggle>
        </div>

        <EditorContent
          editor={editor}
          className={cn(
            "prose prose-sm sm:prose-base lg:prose-lg max-w-none",
            "focus:outline-none min-h-[300px] p-4",
            "[&_.ProseMirror]:min-h-[300px] [&_.ProseMirror]:outline-none",
            "[&_.ProseMirror_p.is-editor-empty:first-child::before]:text-muted-foreground [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0 [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none",
            "[&_.ProseMirror_h1]:text-3xl [&_.ProseMirror_h2]:text-2xl [&_.ProseMirror_h3]:text-xl [&_.ProseMirror_h4]:text-lg",
            "[&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-primary [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:italic [&_.ProseMirror_blockquote]:text-muted-foreground",
            "[&_.ProseMirror_pre]:bg-muted [&_.ProseMirror_pre]:rounded-md [&_.ProseMirror_pre]:p-4 [&_.ProseMirror_pre]:font-mono [&_.ProseMirror_pre]:text-sm",
            "[&_.ProseMirror_code]:bg-muted [&_.ProseMirror_code]:rounded [&_.ProseMirror_code]:px-1.5 [&_.ProseMirror_code]:py-0.5 [&_.ProseMirror_code]:font-mono [&_.ProseMirror_code]:text-sm",
            "[&_.ProseMirror_img]:rounded-md [&_.ProseMirror_img]:max-w-full [&_.ProseMirror_img]:h-auto",
            "[&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-6",
            "[&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-6",
            "[&_.ProseMirror_hr]:border [&_.ProseMirror_hr]:border-border [&_.ProseMirror_hr]:my-8"
          )}
        />
      </div>
    )
  }
)

TipTapEditor.displayName = "TipTapEditor"

export { TipTapEditor }
