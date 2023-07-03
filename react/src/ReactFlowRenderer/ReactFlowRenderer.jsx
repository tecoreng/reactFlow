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
    axios.post('http://192.168.1.68:6500/v1/flow',data).then((response)=>{
      console.log("response",response);

    })
  }

  useEffect(()=>{
    axios.get('http://192.168.1.68:6500/v1/flow').then((response)=>{
      setId(response.data.data._id)
      setNodes(response.data.data.nodes)
      setEdges(response.data.data.edges)
    })
  },[])
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
