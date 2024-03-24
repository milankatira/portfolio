import React, { useEffect, useState } from "react";
import CopyButton from "./CopyButton";

const Codeblog = ({Icon,node,children}) => {
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
  }, [id]);
  return (
    <div
      style={{
        background: "#000",
      }}
      className="card border border-secondary mb-4 text-light"
    >
      <div className="card-body d-flex justify-content-between align-items-center px-4 py-2 border-bottom border-secondary">
        <div className="d-flex align-items-center gap-2">
        <Icon/>
          <p className="text-muted small">
            {/* @ts-ignore  */}
            {node?.data?.meta}
          </p>
        </div>
        <CopyButton textToCopy={textToCopy} />
      </div>
      <div className="card-body p-0 " style={{ overflow: "scroll" }}>
        <div className="p-4 description" id={id}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Codeblog;
