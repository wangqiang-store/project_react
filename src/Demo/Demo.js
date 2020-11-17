import React, { Component, Fragment } from "react";
import "./Demo.css";
import { Input, Button, List } from "antd";
import store from "../store/store";
import { connect } from "react-redux";
import { INPUT_CHANGE, CLICK_LISTITEM, ADD_CLICK } from "../store/typeCretors";

class Demo extends Component {
  constructor(props) {
    super(props);
    console.log("props: ", props);
    this.state = {
      status: "",
      statusList: ["吃饭", "睡觉", "打游戏"],
      data: store.getState().list,
    };
    store.subscribe(this.storeChange);
  }
  storeChange = () => {
    this.setState({ data: store.getState().list });
  };
  setStatus = (e) => {
    this.setState({ status: e.target.value });
  };
  addStatus = () => {
    let statusList = this.state.statusList;
    if (this.state.status === "跳转") {
      this.props.history.push("/App");
    }
    this.setState({ statusList: [...statusList, this.state.status] });
    // const action = {
    //   type: ADD_CLICK,
    //   value: [...statusList, this.state.status],
    // };
    // store.dispatch(action);
  };
  deleteStatus = (index) => {
    let status = this.state.statusList;
    status.splice(index, 1);
    this.setState({ statusList: status });
  };
  listItem = (index) => {
    let status = this.state.data;
    status.splice(index, 1);
    const action = {
      type: CLICK_LISTITEM,
      value: status,
    };
    store.dispatch(action);
  };
  componentDidMount() {}
  render() {
    let { addClick, inputValue, inputChange } = this.props;
    return (
      <Fragment>
        <div>
          <Input
            value={this.state.status}
            onChange={this.setStatus.bind(this)}
            style={{ width: "10%", marginRight: "10px" }}
          />
          <Button
            onClick={addClick.bind(this, this.props.inputValue)}
            type="primary"
          >
            添加
          </Button>
          <hr />
          <Input
            value={inputValue}
            onChange={inputChange}
            style={{ width: "10%", marginRight: "10px" }}
          />
          <div style={{ width: "300px", margin: "10px" }}>
            <List
              bordered
              dataSource={this.state.data}
              renderItem={(item, index) => (
                <h5>
                  <List-Item onClick={this.listItem.bind(this, index)}>
                    {item}
                  </List-Item>
                </h5>
              )}
            />
          </div>
          <ul>
            {this.state.statusList.map((item, index) => {
              return (
                <div key={index} className="d_flex">
                  <li className="mr-10">{item}</li>
                  <button onClick={this.deleteStatus.bind(this, index)}>
                    删除
                  </button>
                </div>
              );
            })}
          </ul>
        </div>
      </Fragment>
    );
  }
}

const setToProps = (state) => {
  return {
    inputValue: state.inputValue,
  };
};

const setToDispatch = (dispatch) => {
  return {
    inputChange: (e) => {
      const action = {
        type: INPUT_CHANGE,
        value: e.target.value,
      };
      dispatch(action);
    },
    addClick: (value) => {
      const action = {
        type: ADD_CLICK,
        value,
      };
      dispatch(action);
    },
  };
};

export default connect(setToProps, setToDispatch)(Demo);
