import { useEffect, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
} from '@xyflow/react';
import type { Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

interface Props {
  data: {
    summary: string;
    entryPoint: string;
    files: { name: string; purpose: string }[];
    dependencies: { from: string; to: string; type: string }[];
  };
}

export default function CodebaseGraph({ data }: Props) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    // Convert files → nodes
    const newNodes: Node[] = data.files.map((file, index) => ({
      id: file.name,
      position: { x: index * 250, y: index % 2 === 0 ? 100 : 250 },
      data: { label: file.name },
      style: {
        background: file.name === data.entryPoint ? '#7c3aed' : '#2d2d2d',
        color: '#fff',
        border: '1px solid #555',
        borderRadius: '8px',
        padding: '10px',
      },
    }));

    // Convert dependencies → edges
    const newEdges: Edge[] = data.dependencies.map((dep, index) => ({
      id: `e${index}`,
      source: dep.from,
      target: dep.to,
      label: dep.type,
      style: { stroke: '#7c3aed' },
      labelStyle: { fill: '#888', fontSize: 11 },
    }));

    setNodes(newNodes);
    setEdges(newEdges);
  }, [data]);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <p style={{ color: '#ccc', padding: '12px', fontSize: '13px' }}>
        {data.summary}
      </p>
      <div style={{ height: 'calc(100% - 60px)' }}>
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <Background color="#333" />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}