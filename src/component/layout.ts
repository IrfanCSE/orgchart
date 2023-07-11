import Dagre from "dagre";
import { Edge, Node } from "reactflow";

const graph = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

export const GetLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  options: any
) => {
  graph.setGraph({ rankdir: options.direction });

  edges.forEach((edge) => graph.setEdge(edge.source, edge.target));
  nodes.forEach((node) => graph.setNode(node.id, node));

  Dagre.layout(graph);

  return {
    nodes: nodes.map((node) => {
      const { x, y } = graph.node(node.id);

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};
