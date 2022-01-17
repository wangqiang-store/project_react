import React, { useRef, useState } from "react";
import {
  Button,
  Col,
  Input,
  Row,
  Select,
  Table,
  Tag,
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
function Host(props) {
  const [form] = Form.useForm();
  let inputName = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  let statusList = [
    {
      status: 1,
      stausName: "在线",
    },
    {
      status: 0,
      stausName: "离线",
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
      title: "主机名称",
      dataIndex: "hostName",
      key: "hostName",
      align: "center",
    },
    {
      title: "主机唯一编号",
      dataIndex: "code",
      key: "code",
      align: "center",
    },
    {
      title: "地址",
      dataIndex: "address",
      key: "address",
      align: "center",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (text, record) => {
        switch (record.status) {
          case 1:
            return <Tag color="green">在线</Tag>;

          case 0:
            return <Tag color="red">离线</Tag>;
          default:
            break;
        }
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
            type: "danger",
            text: "删除",
            handType: "delete",
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
      hostName: "真实测试主机",
      code: "D00024",
      address: "北京市市辖区西城区",
      status: 1,
    },
    {
      id: 2,
      hostName: "真实测试主机2",
      code: "D00025",
      address: "北京市市辖区西城区",
      status: 1,
    },
    {
      id: 3,
      hostName: "真实测试主机3",
      code: "D00026",
      address: "北京市市辖区西城区",
      status: 0,
    },
    {
      id: 4,
      hostName: "真实测试主机4",
      code: "D00027",
      address: "北京市市辖区西城区",
      status: 0,
    },
    {
      id: 5,
      hostName: "真实测试主机5",
      code: "D00028",
      address: "北京市市辖区西城区",
      status: 1,
    },
  ];
  const [tableData, setTableData] = useState(data);
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
        <Select
          placeholder="请选择"
          style={{ width: "200px", marginRight: "10px" }}
        >
          {statusList.map((item) => {
            return (
              <Option value={item.status} key={item.status}>
                {item.stausName}
              </Option>
            );
          })}
        </Select>
        <Input
          placeholder="主机名、主机编号"
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
          dataSource={tableData}
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
              label="主机名称"
              name="hostName"
              rules={[
                { required: true, message: "Please input your hostName!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="主机唯一编号"
              name="code"
              rules={[{ required: true, message: "Please input your code!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="地区" name="region">
              <Input />
            </Form.Item>
            <Form.Item label="地址" name="address">
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </Col>
    </Row>
  );
}
export default React.memo(Host);
