
import React, { useRef, useEffect } from 'react';
import { Bold, Italic, List, ListOrdered, Undo, Redo } from 'lucide-react';

interface RichTextEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
  placeholder?: string;
  dir?: 'rtl' | 'ltr';
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ initialValue, onChange, placeholder, dir }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== initialValue) {
      editorRef.current.innerHTML = initialValue;
    }
  }, [initialValue]);

  const execCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="border rounded-xl overflow-hidden bg-white">
      <div className="bg-gray-50 border-b p-2 flex gap-1 flex-wrap">
        <button type="button" onClick={() => execCommand('bold')} className="p-2 hover:bg-gray-200 rounded transition-colors" title="Bold"><Bold size={16}/></button>
        <button type="button" onClick={() => execCommand('italic')} className="p-2 hover:bg-gray-200 rounded transition-colors" title="Italic"><Italic size={16}/></button>
        <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>
        <button type="button" onClick={() => execCommand('insertUnorderedList')} className="p-2 hover:bg-gray-200 rounded transition-colors" title="Bullet List"><List size={16}/></button>
        <button type="button" onClick={() => execCommand('insertOrderedList')} className="p-2 hover:bg-gray-200 rounded transition-colors" title="Numbered List"><ListOrdered size={16}/></button>
        <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>
        <button type="button" onClick={() => execCommand('undo')} className="p-2 hover:bg-gray-200 rounded transition-colors" title="Undo"><Undo size={16}/></button>
        <button type="button" onClick={() => execCommand('redo')} className="p-2 hover:bg-gray-200 rounded transition-colors" title="Redo"><Redo size={16}/></button>
      </div>
      <div 
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        dir={dir}
        className="p-4 min-h-[150px] outline-none prose prose-sm max-w-none text-dark"
        style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}
      ></div>
    </div>
  );
};
