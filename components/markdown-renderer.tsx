'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Copy, Check } from 'lucide-react';
import rehypeRaw from 'rehype-raw';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      components={{
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-errors
        code({ inline, className, children }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <CodeBlock
              language={match[1]}
              value={String(children).replace(/\n$/, '')}
            />
          ) : (
            <code className='rounded px-1 py-0.5 text-sm'>{children}</code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

interface CodeBlockProps {
  language: string;
  value: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  return (
    <div className='relative group rounded-lg bg-[#282c34] p-4'>
      <button
        onClick={handleCopy}
        className='absolute top-4 right-4 opacity-0 group-hover:opacity-100 text-white p-1.5 rounded-md bg-gray-700 hover:bg-gray-600 transition-all duration-200'
        title='Copy to clipboard'
      >
        {copied ? (
          <Check className='w-4 h-4 text-green-400' />
        ) : (
          <Copy className='w-4 h-4' />
        )}
      </button>

      <div className='text-xs text-gray-400 mb-2 font-mono'>{language}</div>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: '0rem',
          background: 'transparent',
          fontSize: '0.875rem',
          borderRadius: '0.375rem',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
        wrapLines={true}
        wrapLongLines={true}
        lineNumberStyle={{
          minWidth: '2.5em',
          paddingRight: '0em',
          color: '#4B5563',
          userSelect: 'none',
        }}
        PreTag='div'
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

export default MarkdownRenderer;
