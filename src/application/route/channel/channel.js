import React, { useState } from "react";
import {
  Button,
  Col,
  Input,
  Row,
  Select,
  Table,
  Modal,
  Form,
  message,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
const { Option } = Select;

function Channel(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  let hostList = [
    {
      id: 1,
      name: "真实测试主机",
    },
    {
      id: 2,
      name: "真实测试主机2",
    },
    {
      id: 3,
      name: "真实测试主机3",
    },
    {
      id: 4,
      name: "真实测试主机4",
    },
    {
      id: 5,
      name: "真实测试主机5",
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
      title: "通道名称",
      dataIndex: "channelName",
      key: "channelName",
      align: "center",
    },
    {
      title: "通道编号",
      dataIndex: "code",
      key: "code",
      align: "center",
    },
    {
      title: "主机",
      dataIndex: "hostName",
      key: "hostName",
      align: "center",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "长度",
      dataIndex: "length",
      key: "length",
      align: "center",
      render: (text, record) => <span>{text}</span>,
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      align: "center",
      render: (text, record) => <span>{text}</span>,
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
            handleType: "edit",
          },
          {
            type: "danger",
            text: "删除",
            handleType: "delete",
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
                  onClick={(e) => editModel(e, item.handleType, record)}
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
      hostName: "真实测试主机",
      code: "D00024",
      channelName: "真实测试通道",
      length: 1000,
      createTime: "2021/8/6 13:54:05",
    },
    {
      id: 2,
      hostName: "真实测试主机2",
      code: "D00025",
      channelName: "真实测试通道2",
      length: 1000,
      createTime: "2021/8/6 13:54:06",
    },
    {
      id: 3,
      hostName: "真实测试主机3",
      code: "D00026",
      channelName: "真实测试通道3",
      length: 2000,
      createTime: "2021/8/6 13:54:55",
    },
    {
      id: 4,
      hostName: "真实测试主机4",
      code: "D00056",
      channelName: "真实测试通道4",
      length: 3000,
      createTime: "2021/8/6 13:56:05",
    },
    {
      id: 5,
      hostName: "真实测试主机5",
      code: "D00036",
      channelName: "真实测试通道5",
      length: 10000,
      createTime: "2021/8/6 14:54:05",
    },
  ];
  const [tableData, setTableData] = useState(data);
  const showModal = async () => {
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
          title: "Confirm",
          icon: <ExclamationCircleOutlined />,
          content: "Bla bla ...",
          okText: "确认",
          cancelText: "取消",
          onOk() {
            let arr = JSON.parse(JSON.stringify(tableData));
            arr.forEach((item, index) => {
              if (item.id === record.id) {
                arr.splice(index, 1);
              }
            });
            setTimeout(() => {
              setTableData(arr);
              message.success("删除成功");
            }, 1000);
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
        let obj = form.getFieldsValue();
        obj.id = Math.random() * 100;
        let arr = JSON.parse(JSON.stringify(tableData));
        arr.push(obj);
        setTableData(arr);
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
          placeholder="通道名称"
          style={{ width: "200px", marginRight: "10px" }}
        ></Input>
        <Select
          placeholder="请选择"
          style={{ width: "200px", marginRight: "10px" }}
        >
          {hostList.map((item) => {
            return (
              <Option value={item.id} key={item.id}>
                {item.name}
              </Option>
            );
          })}
        </Select>
        <Button
          type="primary"
          icon={<SearchOutlined />}
          style={{ marginRight: "10px" }}
        ></Button>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          添加
        </Button>
      </Col>
      <Col span={24} style={{ marginTop: "10px" }}>
        <Table
          dataSource={tableData}
          rowKey={(record) => record.id}
          columns={columns}
          bordered
        ></Table>
      </Col>
      <Col span={24}>
        <CreateModal
          hostList={hostList}
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
  let { hostList, isModalVisible, handleOk, handleCancel, form } = props;

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
            form={form}
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
          >
            <Form.Item
              label="主机"
              name="hostName"
              rules={[
                { required: true, message: "Please input your hostName!" },
              ]}
            >
              <Select
                placeholder="请选择"
                style={{ width: "200px", marginRight: "10px" }}
              >
                {hostList.map((item) => {
                  return (
                    <Option value={item.id} key={item.id}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="通道名称"
              name="channelName"
              rules={[
                { required: true, message: "Please input your channelName!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="编号"
              name="code"
              rules={[{ required: true, message: "Please input your code!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="长度"
              name="length"
              rules={[{ required: true, message: "Please input your length!" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </Col>
    </Row>
  );
}

export default React.memo(Channel);
