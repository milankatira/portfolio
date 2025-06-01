"use client"
import "highlight.js/styles/base16/snazzy.css";
import React from "react";
import { PiTerminalThin } from "react-icons/pi";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { icons } from "@/utils/icons";
import Codeblog from "./codeblog";

export default function MarkdownComp({
  content,
}) {
  return (
    <Markdown
      data-overlay-light="10"
      style={{
        maxWidth: "1200px",
      }}
      rehypePlugins={[rehypeHighlight]}
      components={{
        h1: ({ node, ...props }) => {
          return <h1 {...props} className="text-5xl font-extrabold mt-12 mb-8 leading-tight font-serif tracking-tight" />;
        },
        h2: ({ node, ...props }) => {
          return <h2 {...props} className="text-4xl font-bold mt-10 mb-6 leading-snug font-serif tracking-tight" />;
        },
        h3: ({ node, ...props }) => {
          return <h3 {...props} className="text-2xl font-semibold mt-8 mb-4 leading-snug font-sans tracking-normal" />;
        },
        p: ({ node, ...props }) => {
          return <p {...props} className="text-lg leading-relaxed mb-6 font-sans text-gray-800 dark:text-gray-200" />;
        },
        li: ({ node, ...props }) => {
          return <p {...props} className="text-lg leading-relaxed mb-6 font-sans text-gray-800 dark:text-gray-200" />;
        },
        code: ({ node, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "");
          if (match?.length) {
            let Icon = PiTerminalThin;
            const isMatch = icons?.hasOwnProperty(match[1]);
            if (isMatch) {
              Icon = icons[match[1]];
            }
            return (
              <Codeblog Icon={Icon} node={node}>
                {children}
              </Codeblog>
            );
          } else {
            return (
              <code className="text-base bg-gray-800 text-gray-100 px-2 py-1 rounded break-words font-mono" {...props}>
                {children}
              </code>
            );
          }
        },
      }}
    >
      {content}
    </Markdown>
  );
}
