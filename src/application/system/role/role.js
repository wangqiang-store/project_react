import React, { useRef, useState } from "react";
import { Button, Col, Input, Row, Table, Modal, Form, Switch } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
function Role(props) {
  const [form] = Form.useForm();
  let inputName = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const columns = [
    {
      title: "序号",
      align: "center",
      key: "index",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "名称",
      dataIndex: "roleName",
      key: "roleName",
      align: "center",
    },
    {
      title: "备注",
      dataIndex: "remark",
      key: "remark",
      align: "center",
    },
    {
      title: "创建者",
      dataIndex: "createName",
      key: "createName",
      align: "center",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "是否启用",
      dataIndex: "isEnable",
      key: "isEnable",
      align: "center",
      render: (text, record) => {
        return <Switch defaultChecked={record.isEnable} />;
      },
    },
    {
      title: "操作",
      key: "handle",
      align: "center",
      render: (text, record) => {
        let btnList = [
          {
            type: "primary",
            text: "编辑",
            handType: "edit",
          },
          {
            type: "success",
            text: "权限",
            handType: "authority",
          },
        ];
        return (
          <>
            {btnList.map((item, index) => {
              return (
                <Button
                  style={{ marginRight: "10px" }}
                  key={item + index}
                  type={item.type}
                  onClick={(e) => {
                    editModel(e, item.handType, record);
                  }}
                >
                  {item.text}
                </Button>
              );
            })}
          </>
        );
      },
    },
  ];

  const data = [
    {
      id: 1,
      roleName: "admin",
      remark: "超级管理员",
      createName: "超级管路员",
      isEnable: true,
    },
    {
      id: 2,
      roleName: "CeShi",
      remark: "测试人员",
      createName: "超级管路员",
      isEnable: true,
    },
    {
      id: 3,
      roleName: "kaiFa",
      remark: "开发人员",
      createName: "超级管路员",
      isEnable: true,
    },
    {
      id: 4,
      roleName: "YouKe",
      remark: "游客",
      createName: "超级管路员",
      isEnable: true,
    },
  ];
  const showModal = () => {
    setIsModalVisible(true);
    form.resetFields();
  };

  const editModel = (e, type, record) => {
    switch (type) {
      case "edit":
        setIsModalVisible(true);
        let formData = record;
        form.setFieldsValue(formData);
        break;
      case "delete":
        Modal.confirm({
          icon: <ExclamationCircleOutlined />,
          content: "是否确认删除该主机",
          okText: "确认",
          cancelText: "取消",
          onOk() {
            data.forEach((item, index) => {
              if (item.id === record.id) {
                data.splice(index, 1);
              }
            });
          },
        });
        break;
      default:
        break;
    }
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (values) {
        setIsModalVisible(false);
      }
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <Row>
      <Col
        span={24}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Input
          placeholder="角色名称"
          ref={inputName}
          style={{ width: "200px", marginLeft: "10px" }}
        ></Input>
        <Button
          type="primary"
          icon={<SearchOutlined />}
          style={{ marginLeft: "10px" }}
        ></Button>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ marginLeft: "10px" }}
          onClick={showModal}
        >
          添加
        </Button>
      </Col>
      <Col span={24} style={{ marginTop: "10px" }}>
        <Table
          dataSource={data}
          rowKey={(record) => record.id}
          columns={columns}
          bordered
        ></Table>
      </Col>
      <Col span={24}>
        <CreateModal
          isModalVisible={isModalVisible}
          handleOk={handleOk}
          handleCancel={handleCancel}
          form={form}
        />
      </Col>
    </Row>
  );
}

function CreateModal(props) {
  let { isModalVisible, handleOk, handleCancel, form } = props;
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Row>
      <Col span={24}>
        <Modal
          width="50%"
          title="角色"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
          >
            <Form.Item
              label="名称"
              name="roleName"
              rules={[
                { required: true, message: "Please input your roleName!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="备注"
              name="remark"
              rules={[{ required: true, message: "Please input your remark!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="是否启用" name="isEnable">
              <Switch defaultChecked={false} checked />
            </Form.Item>
          </Form>
        </Modal>
      </Col>
    </Row>
  );
}
export default React.memo(Role);
