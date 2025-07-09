import React, { useRef } from 'react';

interface Node {
  id: string;
  name: string;
  type: string;
  relationship?: string;
  x?: number;
  y?: number;
}

interface Link {
  source: string;
  target: string;
  type?: string;
  amount?: string;
}

interface MindMapGraphProps {
  nodes: Node[];
  links: Link[];
  selectedNode: string;
  onSelectNode: (id: string) => void;
  width?: number;
  height?: number;
}

const jungle = {
  darkGreen: "#184D27",
  olive: "#6B8E23",
  lightGreen: "#B7E4C7",
  saddleBrown: "#8B5C2A",
  goldenBrown: "#C6862A",
  wheat: "#F5DEB3",
  accent: "#FFD600",
};

const comicFont = `'Comic Sans MS', 'Comic Neue', 'Bangers', 'Arial Black', 'Impact', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;

export const MindMapGraph: React.FC<MindMapGraphProps> = ({
  nodes,
  links,
  selectedNode,
  onSelectNode,
  width = 700,
  height = 400,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const nodeRadius = 32;

  // Find the central node
  const center = { x: width / 2, y: height / 2 };
  const mainNode = nodes.find(n => n.id === selectedNode) || nodes[0];

  // Find direct connections (branches)
  const directLinks = links.filter(l => l.source === mainNode.id);
  const branchNodes = directLinks
    .map(l => nodes.find(n => n.id === l.target))
    .filter(Boolean) as Node[];
  const angleStep = (2 * Math.PI) / Math.max(branchNodes.length, 1);

  // Assign positions: center node and branches in a circle
  const positionedNodes = [
    { ...mainNode, x: center.x, y: center.y },
    ...branchNodes.map((n, idx) => {
      const angle = idx * angleStep;
      return {
        ...n,
        x: center.x + Math.cos(angle) * 150,
        y: center.y + Math.sin(angle) * 150,
      };
    })
  ];

  // Helper to get node by id
  const getNode = (id: string) => positionedNodes.find(n => n.id === id);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      style={{ background: 'rgba(255,255,255,0.01)', borderRadius: 12 }}
    >
      {/* Draw branches from center to each branch node */}
      {directLinks.map((link, i) => {
        const source = getNode(link.source);
        const target = getNode(link.target);
        if (!source || !target) return null;
        return (
          <g key={i}>
            <line
              x1={source.x}
              y1={source.y}
              x2={target.x}
              y2={target.y}
              stroke={jungle.saddleBrown}
              strokeWidth={3}
              opacity={0.7}
              markerEnd="url(#arrowhead)"
            />
            {/* Optional: label on branch */}
            {link.amount && (
              <text
                x={(source.x + target.x) / 2}
                y={(source.y + target.y) / 2 - 8}
                textAnchor="middle"
                fontFamily={comicFont}
                fontSize={14}
                fill={jungle.saddleBrown}
                fontWeight={700}
                style={{ pointerEvents: 'none' }}
              >
                {link.amount}
              </text>
            )}
          </g>
        );
      })}
      {/* Arrowhead marker */}
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="10"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill={jungle.saddleBrown} />
        </marker>
      </defs>
      {/* Draw nodes: center and branches */}
      {positionedNodes.map((node, i) => (
        <g
          key={node.id}
          onClick={() => node.id !== mainNode.id && onSelectNode(node.id)}
          style={{ cursor: node.id !== mainNode.id ? 'pointer' : 'default' }}
        >
          <circle
            cx={node.x}
            cy={node.y}
            r={nodeRadius}
            fill={node.id === mainNode.id ? jungle.accent : jungle.wheat}
            stroke={jungle.saddleBrown}
            strokeWidth={node.id === mainNode.id ? 5 : 3}
            filter={node.id === mainNode.id ? 'drop-shadow(0 0 12px #FFD60088)' : 'drop-shadow(0 0 4px #8B5C2A44)'}
          />
          <text
            x={node.x}
            y={node.y + 6}
            textAnchor="middle"
            fontFamily={comicFont}
            fontSize={18}
            fill={jungle.saddleBrown}
            fontWeight={700}
            pointerEvents="none"
          >
            {node.name}
          </text>
        </g>
      ))}
    </svg>
  );
}; 