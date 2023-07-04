import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
} from "react-flow-renderer";
import { nodes as initialNodes, edges as initialEdges } from "./elements";
import { Button, Modal, Input, Form } from "antd";
import axios from "axios";

function ReactFlowRenderer() {
  const [id, setId] = useState('');
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: ConnectionLineType.SmoothStep,
            animated: true,
            style: { stroke: "red" },
          },
          eds
        )
      ),
    [setEdges]
  );
  const getNodeId = () => Math.random();

  function onInit() {
    console.log("Logged");
  }

  function displayCustomNamedNodeModal() {
    setIsModalVisible(true);
  }

  function handleCancel() {
    setIsModalVisible(false);
  }

  function handleOk(data) {
    onAdd(data.nodeName);
    setIsModalVisible(false);
  }

  const onAdd = useCallback(
    (data) => {
      const newNode = {
        id: String(getNodeId()),
        data: { label: data },
        position: {
          x: 50,
          y: 0,
        },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const submitFlow = ()=>{
    let data={nodes,edges,id}
    axios.post('http://127.0.0.1:6500/v1/flow',data).then((response)=>{
      console.log("response",response);

    })
  }

  useEffect(()=>{
    axios.get('http://127.0.0.1:6500/v1/flow').then((response)=>{
      if(response && response.data && response.data.data && response.data.data._id){
        setId(response.data.data._id)
        setNodes(response.data.data.nodes)
        setEdges(response.data.data.edges)
      }
    })
  },[])

  const cloneFlow = () => {
    let newNode = JSON.parse(JSON.stringify(nodes));
    let newEdges = JSON.parse(JSON.stringify(edges));
    const count = nodes.length
    //let max = null;
    //newNode.forEach(v => v.position.x > max || !max ? max = v.position.x : max)

    newNode.map((node) => {
      node.id = (Number(node.id) + count).toString()
      node.data.label = node.data.label + "-modified";
      node.position.x = node.position.x + (500 * tmpId)
      node.positionAbsolute.x = node.positionAbsolute.x + (500 * tmpId)
      return node;
    });

    newEdges.map((edge) => {
      edge.source = (parseInt(edge.source) + count).toString()
      edge.target = (parseInt(edge.target) + count).toString()
      edge.id = (Math.random() * (99999 - 11111) + 11111).toString()
      return edge
    })
    let finalDataNodes = [...nodes, ...newNode];
    let finalDataEdges = [...edges, ...newEdges];
    console.log("finalDataNodes", finalDataNodes);
    console.log("finalDataEdges", finalDataEdges);
    console.log("=============================================")
    setNodes(finalDataNodes);
    setEdges(finalDataEdges)
    setTmpId(tmpId + 1)
  }

  return (
    <div style={{ height: "100vh", margin: "10px" }}>
      <Modal
        title="Create New Nodes"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        //onOk={handleOk}
        //onCancel={this.handleCancel}

      >
        <Form onFinish={handleOk} autoComplete="off" name="new node">
          <Form.Item label="Node Name" name="nodeName">
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" className="submit-btn" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </Modal>

      <Button type="primary" onClick={() => displayCustomNamedNodeModal()}>
        Add Custom Name Node
      </Button>

      <Button type="primary" className="button-margin" onClick={() => submitFlow()}>
        Save Data 
      </Button>

      <Button type="primary" className="button-margin" onClick={() => cloneFlow()}>
        Clone Data
      </Button>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        fitView
        attributionPosition="bottom-left"
        connectionLineType={ConnectionLineType.SmoothStep}
      />
    </div>
  );

}

export default ReactFlowRenderer;
