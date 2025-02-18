import {
    Bold,
    CodeIcon,
    Heading1Icon,
    Heading2Icon,
    Heading3Icon,
    Highlighter,
    Italic,
    ListIcon,
    StrikethroughIcon,
    UnderlineIcon,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Sparkles,
} from 'lucide-react';
import React from 'react';

function EditorExtensions({ editor }) {
    if (!editor) {
      return null; // Return null or a loading state if editor is not initialized
    }
    const onAiClick=()=>{
        const selectedText=editor.state.doc.textBetween(
            editor.state.selection.from,
            editor.state.selection.to,
            ' '
        )
        console.log(selectedText)

    }

    return (
    <div className="p-5">
        <div className="control-group">
        <div className="button-group flex gap-3">
            <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'text-blue-500' : ''}
            >
            <Bold />
            </button>
            <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'text-blue-500' : ''}
            >
            <Italic />
            </button>
            <button
            onClick={() => editor.chain().focus().toggleHighlight({ color: '#74c0fc' }).run()}
            className={editor.isActive('highlight', { color: '#74c0fc' }) ? 'text-blue-500' : ''}
            >
            <Highlighter />
            </button>
            <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={editor.isActive('code') ? 'text-blue-500' : ''}
            >
            <CodeIcon />
            </button>
            <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'text-blue-500' : ''}
            >
            <StrikethroughIcon />
            </button>
            <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive('underline') ? 'text-blue-500' : ''}
            >
            <UnderlineIcon />
            </button>
            <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'text-blue-500' : ''}
            >
            <Heading1Icon />
            </button>
            <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'text-blue-500' : ''}
            >
            <Heading2Icon />
            </button>
            <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive('heading', { level: 3 }) ? 'text-blue-500' : ''}
            >
            <Heading3Icon />
            </button>
            <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'text-blue-500' : ''}
            >
            <ListIcon />
            </button>
            {/* Text Alignment Buttons */}
            <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={editor.isActive({ textAlign: 'left' }) ? 'text-blue-500' : ''}
            >
            <AlignLeft />
            </button>
            <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={editor.isActive({ textAlign: 'center' }) ? 'text-blue-500' : ''}
            >
            <AlignCenter />
            </button>
            <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={editor.isActive({ textAlign: 'right' }) ? 'text-blue-500' : ''}
            >
            <AlignRight />
            </button>
            <button
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={editor.isActive({ textAlign: 'justify' }) ? 'text-blue-500' : ''}
            >
            <AlignJustify />
            </button>
            <button
            onClick={() => onAiClick()}
            className={'hover:text-blue-500'}
            >
            <Sparkles/>
            </button>
        </div>
        </div>
    </div>
    );
}

export default EditorExtensions;