/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  useEdgesState,
  useNodesState,
  Connection,
  Edge,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';
import DiscordNode from './nodes/DiscordNode';
import SlackNode from './nodes/SlackNode';

const nodeTypes = {
  discord: DiscordNode,
  slack: SlackNode,
};

interface FlowCanvasProps {
  nodes: any[];
  edges: any[];
  setNodes: (nodes: any[]) => void;
  setEdges: (edges: any[]) => void;
  onNodeAdded: (type: string) => void;
}

export default function FlowCanvas({
  nodes,
  edges,
  setNodes,
  setEdges,
  onNodeAdded,
}: FlowCanvasProps) {
  const [internalNodes, updateNodes, onNodesChange] = useNodesState(nodes);
  const [internalEdges, updateEdges, onEdgesChange] = useEdgesState(edges);

  // Handle new connections
  const onConnect = useCallback(
    (connection: Edge | Connection) =>
      updateEdges((eds) => addEdge({ ...connection, animated: true }, eds)),
    [updateEdges]
  );

  // Handle drag and drop for new nodes
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      const position = { x: event.clientX, y: event.clientY };

      const newNode = {
        id: `${+new Date()}`,
        type,
        position,
        data: { label: `${type} Node` },
      };

      updateNodes((nds) => nds.concat(newNode));
      onNodeAdded(type);
    },
    [updateNodes, onNodeAdded]
  );

  // Sync parent state
  useEffect(() => {
    setNodes(internalNodes);
    setEdges(internalEdges);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internalNodes, internalEdges]);

  return (
    <ReactFlow
      nodes={internalNodes}
      edges={internalEdges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onDrop={onDrop}
      onDragOver={(event) => event.preventDefault()}
      nodeTypes={nodeTypes}
      fitView
    >
      <Controls position='top-left' />
      <MiniMap position='bottom-left' zoomable pannable />
      <Background
        //  eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        variant='dots'
        gap={12}
        size={1}
      />
    </ReactFlow>
  );
}
