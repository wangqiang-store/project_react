import React, { useRef, useState } from "react";
import {
  Button,
  Col,
  Input,
  Row,
  Select,
  Table,
  Modal,
  Form,
  Switch,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
const { Option } = Select;
function User(props) {
  const [form] = Form.useForm();
  let inputName = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  let unitList = [
    {
      id: 1,
      name: "CeShi",
    },
    {
      id: 2,
      name: "KaiFa",
    },
    {
      id: 3,
      name: "YouKe",
    },
  ];
  const columns = [
    {
      title: "序号",
      align: "center",
      key: "index",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "用户名",
      dataIndex: "username",
      key: "username",
      align: "center",
    },
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "角色",
      dataIndex: "role",
      key: "role",
      align: "center",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "单位",
      dataIndex: "unit",
      key: "unit",
      align: "center",
      render: (text, record) => {
        let name = "";
        unitList.forEach((item) => {
          if (item.id === text) {
            name = item.name;
          }
        });
        return <span>{name}</span>;
      },
    },
    {
      title: "创建者",
      dataIndex: "createName",
      key: "createName",
      align: "center",
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
            text: "详情",
            handle: "details",
          },
          {
            type: "primary",
            text: "编辑",
            handType: "edit",
          },
          {
            type: "danger",
            text: "重置密码",
            handType: "reset",
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
      username: "wang",
      name: "wang",
      role: "Admin",
      unit: 1,
      createName: "Admin",
      isEnable: true,
    },
    {
      id: 2,
      username: "zhou",
      name: "zhou",
      role: "Admin",
      unit: 2,
      createName: "Admin",
      isEnable: true,
    },
    {
      id: 3,
      username: "song",
      name: "song",
      role: "Admin",
      unit: 2,
      createName: "Admin",
      isEnable: false,
    },
    {
      id: 4,
      username: "li",
      name: "li",
      role: "Admin",
      unit: 1,
      createName: "Admin",
      isEnable: true,
    },
    {
      id: 5,
      username: "cai",
      name: "cai",
      role: "Admin",
      unit: 3,
      createName: "Admin",
      isEnable: false,
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
          placeholder="角色名称搜索"
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
          unitList={unitList}
          form={form}
        />
      </Col>
    </Row>
  );
}

function CreateModal(props) {
  let { isModalVisible, handleOk, handleCancel, form, unitList } = props;
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
          title="添加"
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
              label="用户名称"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="名称"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="确认密码"
              name="confirmPwd"
              rules={[
                { required: true, message: "Please input your confirmPwd!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="角色"
              name="role"
              rules={[{ required: true, message: "Please input your role!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="单位"
              name="unit"
              rules={[{ required: true, message: "Please input your unit!" }]}
            >
              <Select style={{ width: 120 }} placeholder="请选择单位">
                {unitList.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="邮箱"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="电话"
              name="phone"
              rules={[{ required: true, message: "Please input your phone!" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </Col>
    </Row>
  );
}
export default React.memo(User);
