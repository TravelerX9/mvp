"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";

interface MarkdownEditorProps {
  initialValue?: string;
  onChange: (value: string) => void;
}

export function MarkdownEditor({ initialValue = "", onChange }: MarkdownEditorProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[600px]">
      <div className="h-full">
        <textarea
          className="w-full h-full p-4 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-zinc-700 resize-none font-mono text-sm"
          value={value}
          onChange={handleChange}
          placeholder="Type your markdown here..."
        />
      </div>
      <div className="h-full overflow-auto p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg prose prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
      </div>
    </div>
  );
}
