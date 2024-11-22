import { Graph } from 'typescript-graph'
import jsonConfig from '../config.json';

type NodeType = { name: string, count: number, metadata: { [string: string]: string } }
const graph = new Graph<NodeType>((n: NodeType) => n.name)

// Creazione del grafo da file json
jsonConfig['nodes'].forEach((node: NodeType) => {
  graph.insert(node);
});

jsonConfig['edges'].forEach((edge: { head: string; tail: string; }) => {
  graph.addEdge(edge.head, edge.tail);
});

// Creazione di graphData per Cytoscape
export const graphData = {
  nodes: jsonConfig['nodes'].map((node) => ({ data: { id: node.name, ...node } })),
  edges: jsonConfig['edges'].map((edge) => ({ data: { source: edge.head, target: edge.tail } })),
};