// Stub type declarations for TipTap packages
// These are minimal type definitions to satisfy TypeScript imports

declare module '@tiptap/core' {
  export interface MarkOptions {
    name: string;
    addAttributes?: () => Record<string, any>;
    parseHTML?: () => any[];
    renderHTML?: (props: { HTMLAttributes: Record<string, any> }) => Record<string, any>;
    addCommands?: () => Record<string, any>;
  }

  export interface Mark {
    name: string;
    attrs: Record<string, any>;
    options: MarkOptions;
    parseHTML: () => any[];
    renderHTML: (props: { HTMLAttributes: Record<string, any> }) => Record<string, any>;
  }

  export const Mark: {
    create: (config: MarkOptions) => Mark;
  };

  export function mergeAttributes(...attrs: Record<string, any>[]): Record<string, any>;

  export interface EditorOptions {
    element: HTMLElement;
    extensions?: any[];
    content?: any;
    editable?: boolean;
    autofocus?: boolean;
    onUpdate?: (props: { editor: Editor }) => void;
    onCreate?: (props: { editor: Editor }) => void;
  }

  export interface Editor {
    element: HTMLElement;
    isFocused: boolean;
    isEmpty: boolean;
    isActive: (name: string, attrs?: Record<string, any>) => boolean;
    getText: () => string;
    getHTML: () => string;
    getJSON: () => any;
    setContent: (content: any) => void;
    setEditable: (editable: boolean) => void;
    focus: () => void;
    blur: () => void;
    destroy: () => void;
    commands: any;
    chain: () => any;
    can: () => any;
  }

  export class Editor {
    constructor(options: EditorOptions);
  }

  export interface Extension {
    name?: string;
    priority?: number;
    addOptions?: () => any;
    addProseMirrorPlugins?: () => any[];
    addKeyboardShortcuts?: () => Record<string, any>;
    parseHTML?: () => any[];
    renderHTML?: (props: { HTMLAttributes: Record<string, any> }) => Record<string, any>;
  }

  export interface ExtensionClass {
    new (options?: any): Extension;
  }

  export function createExtension(config?: { addOptions?: () => any }): ExtensionClass;
}

declare module '@tiptap/react' {
  import { Editor as TiptapEditor, EditorOptions } from '@tiptap/core';

  export interface Editor extends TiptapEditor {}

  export interface EditorContentProps {
    editor: Editor | null;
    className?: string;
  }

  export const EditorContent: React.FC<EditorContentProps>;

  export interface UseEditorOptions extends Partial<EditorOptions> {}

  export function useEditor(options: UseEditorOptions): Editor | undefined;
}

declare module '@tiptap/starter-kit' {
  interface StarterKitType {
    configure: (options?: any) => any;
  }

  const StarterKit: StarterKitType;
  export default StarterKit;
}

declare module '@tiptap/extension-image' {
  interface ImageType {
    configure: (options?: any) => any;
  }

  const Image: ImageType;
  export default Image;
}

declare module '@tiptap/extension-link' {
  interface LinkType {
    configure: (options?: any) => any;
  }

  const Link: LinkType;
  export default Link;
}

declare module '@tiptap/extension-placeholder' {
  interface PlaceholderType {
    configure: (options?: any) => any;
  }

  const Placeholder: PlaceholderType;
  export default Placeholder;
}

declare module '@tiptap/extension-code-block-lowlight' {
  interface CodeBlockLowlightType {
    configure: (options?: any) => any;
  }

  const CodeBlockLowlight: CodeBlockLowlightType;
  export default CodeBlockLowlight;
}

declare module 'lowlight' {
  export interface Lowlight {
    register: (language: string | object, grammar?: object) => void;
    highlight: (language: string, value: string) => any;
    listLanguages: () => string[];
  }

  export const common: Record<string, any>;
  export function createLowlight(languages?: Record<string, any>): Lowlight;
}

