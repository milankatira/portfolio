import "highlight.js/styles/github-dark-dimmed.min.css";
import React, { useEffect, useState } from "react"; // Import React, useEffect, and useState
import { PiTerminalThin } from "react-icons/pi";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { icons } from "../../utils/icon";
import CopyButton from "./CopyButton";

export default function MarkdownComp({
  content,
  className = "p-4", // Change Tailwind padding class to Bootstrap padding class
}) {
  const [id, setId] = useState(""); // State to store the generated id
  const [textToCopy, settextToCopy] = useState("");
  useEffect(() => {
    // Generate and set the id when the component mounts
    const generatedId = (Math.floor(Math.random() * 100) + 1).toString();
    setId(generatedId);
  }, []); // Empty dependency array to run this effect only once, after the component mounts

  useEffect(() => {
    // Log the element and its text content after the component has rendered
    if (id) {
      settextToCopy(document.getElementById(id)?.textContent);
    }
  }, [id]); // Run this effect whenever the id changes

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
              <div
                style={{
                  background: "#000",
                }}
                className="card border border-secondary mb-4 text-light"
              >
                <div className="card-body d-flex justify-content-between align-items-center px-4 py-2 border-bottom border-secondary">
                  <div className="d-flex align-items-center gap-2">
                    <Icon />
                    <p className="text-muted small">
                      {/* @ts-ignore  */}
                      {node?.data?.meta}
                    </p>
                  </div>
                  <CopyButton textToCopy={textToCopy} />
                </div>
                <div className="card-body p-0">
                  <div className="p-4 description" id={id}>
                    {children}
                  </div>
                </div>
              </div>
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
