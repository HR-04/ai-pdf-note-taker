import { chatSession } from '@/configs/AImodels';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { useAction, useMutation } from 'convex/react';
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
import { useParams } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

function EditorExtensions({ editor}) {
    const {fileId} =useParams();
    const SearchAI = useAction(api.myaction.search)
    const saveNotes = useMutation(api.notes.AddNotes)
    const {user} = useUser();
    const onAiClick=async()=>{
        toast("AI generating your response....");
        const selectedText=editor.state.doc.textBetween(
            editor.state.selection.from,
            editor.state.selection.to,
            ' '
        )
        console.log(selectedText);

        const result =await SearchAI({
            query:selectedText,
            fileId:fileId
        })
        const UnformattedAns = JSON.parse(result);
        let AllUnformattedAns = '';
        UnformattedAns&&UnformattedAns.forEach(item=> {
            AllUnformattedAns=AllUnformattedAns+item.pageContent;
        });

        const PROMPT = "For Question :" +selectedText+" and with the given content as answer,"+
        "please give appropriate answer in HTML Format. The answer content is : "+AllUnformattedAns;

        const AiModelResult = await chatSession.sendMessage(PROMPT);
        console.log(AiModelResult.response.text());
        const FinalAns = AiModelResult.response.text().replace('```','').replace('html','').replace('```','');
        const AllText = editor.getHTML();
        editor.commands.setContent(AllText+'<p><strong>Answer: </strong>'+FinalAns+'</p>')

        saveNotes({
            notes:editor.getHTML(),
            fileId:fileId,
            createdBy:user?.primaryEmailAddress?.emailAddress
        })
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