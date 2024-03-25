import "highlight.js/styles/github-dark-dimmed.min.css";
import React, { useEffect, useState } from "react"; // Import React, useEffect, and useState
import { PiTerminalThin } from "react-icons/pi";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { icons } from "../../utils/icon";
import Codeblog from "./codeblog";

export default function MarkdownComp({
  content,
  className = "p-4", // Change Tailwind padding class to Bootstrap padding class
}) {
  return (
    <Markdown
      data-overlay-light="10"
      style={{
        maxWidth: "1200px",
      }}
      className={className} // Use Bootstrap padding class
      rehypePlugins={[rehypeHighlight]}
      components={{
        h1: ({ node, ...props }) => {
          return <h1 {...props} className="display-4 font-weight-bold" />; // Use Bootstrap typography classes
        },
        h2: ({ node, ...props }) => {
          return (
            <h1 {...props} className="display-5 font-weight-bold mt-4 mb-4" />
          ); // Use Bootstrap typography classes
        },
        h3: ({ node, ...props }) => {
          return (
            <h1 {...props} className="display-6 font-weight-bold mt-4 mb-4" />
          ); // Use Bootstrap typography classes
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
              // TODO: convert to code block
              <code className="text-lg break-word p-1 rounded" {...props}>
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
