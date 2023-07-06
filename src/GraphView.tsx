import Tree from 'react-d3-tree';
import RenderCustomNodeElement from './RenderCustomNodeElement';

const treeData = {
  name: 'Parent',
  children: [
    {
      name: 'Child 1',
      value: 10,
      children: [
        { name: 'Grandchild 1', value: 5 },
        { name: 'Grandchild 2', value: 8,children: [
          { name: 'Grandchild 1', value: 5 },
          { name: 'Grandchild 2', value: 8 ,children: [
            { name: 'Grandchild 1', value: 5 },
            { name: 'Grandchild 2', value: 8 }
          ]}
        ] }
      ]
    },
    {
      name: 'Child 2',
      value: 12,
      children: [
        { name: 'Grandchild 3', value: 15,children: [
          { name: 'Grandchild 3', value: 15 ,children: [
            { name: 'Grandchild 1', value: 5 },
            { name: 'Grandchild 2', value: 8 }
          ]}
        ] },
        { name: 'Grandchild 4', value: 3 }
      ]
    },
    {
      name: 'Child 2',
      value: 12,
      children: [
        { name: 'Grandchild 3', value: 15,children: [
          { name: 'Grandchild 3', value: 15 ,children: [
            { name: 'Grandchild 1', value: 5 },
            { name: 'Grandchild 2', value: 8 }
          ]}
        ] },
        { name: 'Grandchild 4', value: 3 }
      ]
    },
    
  ]
};


const GraphView = () => {

  return (
    <div style={{ width: '100%', height: '100vh' }} >
      <Tree
        data={treeData}
        orientation="vertical"
        translate={{ x: 100, y: 50 }}
        pathFunc={'step'}
        renderCustomNodeElement={(nodeProps) => RenderCustomNodeElement(nodeProps.nodeDatum)}
        zoomable={true}
        zoom={1}
        
      />
    </div>
  );
};

export default GraphView;
