'use client';
import Placeholder from '@tiptap/extension-placeholder';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import TextAlign from '@tiptap/extension-text-align';
import React, { useEffect } from 'react';
import EditorExtensions from './EditorExtensions';

function TextEditor() {
const editor = useEditor({
    extensions: [
    StarterKit,
    Placeholder.configure({
        placeholder: 'Start Taking your Notes here...',
    }),
    Highlight.configure({
        multicolor: true, // Enable multicolor highlighting
    }),
    Underline,
    Heading.configure({
        levels: [1, 2, 3],
    }),
    BulletList.configure({
        itemTypeName: 'listItem',
    }),
    TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
        defaultAlignment: 'left',
    }),
    ],
    editorProps: {
    attributes: {
        class: 'focus:outline-none h-screen p-5',
    },
    },
});

useEffect(() => {
    if (editor) {
      // Insert a bullet list for testing
    editor.commands.insertContent(`
        <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        </ul>
    `);
    }
}, [editor]);

if (!editor) {
    return null; // Return null or a loading state if editor is not initialized
}

return (
    <div>
    <EditorExtensions editor={editor} />
    <div>
        <EditorContent editor={editor} />
    </div>
    </div>
);
}

export default TextEditor;