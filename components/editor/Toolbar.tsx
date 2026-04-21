"use client"

import * as React from "react"
import { Editor } from "@tiptap/react"
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Code,
  Link,
  Image,
  Minus,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Toggle } from "@/components/ui/toggle"

interface ToolbarProps {
  editor: Editor | null
  editable?: boolean
  className?: string
}

const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(
  ({ editor, editable = true, className }, ref) => {
    const addLink = React.useCallback(() => {
      if (!editor) return
      const url = window.prompt("Enter URL:")
      if (url) {
        editor.chain().focus().setLink({ href: url }).run()
      }
    }, [editor])

    const addImage = React.useCallback(() => {
      if (!editor) return
      const url = window.prompt("Enter image URL:")
      if (url) {
        editor.chain().focus().setImage({ src: url }).run()
      }
    }, [editor])

    if (!editor) {
      return null
    }

    return (
      <div ref={ref} className={cn("flex flex-wrap gap-1 p-2 border-b bg-muted/50", className)}>
        {/* Headings */}
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

        {/* Text Formatting */}
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

        {/* Lists */}
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

        {/* Code & Blockquote */}
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

        {/* Links & Images */}
        <Toggle
          size="sm"
          pressed={editor.isActive("link")}
          onPressedChange={addLink}
          disabled={!editable}
          aria-label="Add link"
        >
          <Link className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={false}
          onPressedChange={addImage}
          disabled={!editable}
          aria-label="Add image"
        >
          <Image className="h-4 w-4" />
        </Toggle>

        <div className="w-px h-6 bg-border mx-1 self-center" />

        {/* Horizontal Rule */}
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
    )
  }
)

Toolbar.displayName = "Toolbar"

export { Toolbar }