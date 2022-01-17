import React, { useState } from "react";
import imgURL from "../../assets/image/main.png";
import { Modal } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import Echarts from "../echarts/echarts.js";
import { filterTime } from "../../utils/filter";
import "./index.css";
function Main() {
  let echarts = "echarts";
  let style = {
    width: "100%",
    height: "700px",
  };
  function list() {
    let tempList = [];
    for (let index = 0; index < 200; index++) {
      let temp = 20.03695;
      temp += Math.random() * 20;
      let distance = 100;
      distance += Math.random() * 20;
      tempList.push({
        temp,
        tiem: `${filterTime(
          new Date().getTime() - 3600 * 24 * 1000 + index * 6000
        )}`,
        distance,
      });
    }
    return tempList;
  }
  function echartsData(tempList) {
    let list = [];
    tempList.forEach((item) => {
      list.push([item.tiem, item.temp, item.distance]);
    });
    return list;
  }

  function setMaxTemp(tempList) {
    let sortData = tempList.sort((a, b) => {
      return a["temp"] - b["temp"];
    });
    let min = +(
      (sortData[0].temp +
        sortData[sortData.length - 1].temp -
        (sortData[sortData.length - 1].temp - sortData[0].temp) * 2) /
      2
    ).toFixed(1);
    let max = +(
      (sortData[0].temp +
        sortData[sortData.length - 1].temp +
        (sortData[sortData.length - 1].temp - sortData[0].temp) * 2) /
      2
    ).toFixed(1);
    return {
      min,
      max,
    };
  }
  let [options] = useState({
    animation: false,
    title: {
      text: "历史温度折线图",
      left: "center",
    },
    xAxis: {
      name: "节点名称",
      type: "category",
      minorTick: {
        show: true,
      },
      minorSplitLine: {
        show: true,
      },
    },
    yAxis: {
      name: "历史温度(℃)",
      type: "value",
      scale: true,
      min: setMaxTemp(list()).min,
      max: setMaxTemp(list()).max,
      axisLabel: {
        formatter: function (value) {
          return value % 1 === 0 ? value : value.toFixed(1);
        },
      },
      minorTick: {
        show: true,
      },
      minorSplitLine: {
        show: true,
      },
      axisLine: {
        //y轴
        show: true,
      },
      axisTick: {
        //y轴刻度线
        show: true,
      },
      show: true,
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {},
        dataZoom: {
          yAxisIndex: "none",
        },
      },
    },
    legend: {
      selectedMode: false, //取消图例上的点击事件
      data: ["历史温度"],
      top: "4%",
    },
    grid: {
      left: "2%",
      right: "4%",
      bottom: "8%",
      containLabel: true,
      height: "85%",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      formatter: function (params) {
        let temp =
          params[0].value[1] % 1 === 0
            ? params[0].value[1]
            : params[0].value[1].toFixed(1);
        let distance =
          params[0].value[2] % 1 === 0
            ? params[0].value[2]
            : params[0].value[2].toFixed(1);
        var htmlStr = `
        <div style="text-align:left">
          <span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:${params[0].color};"></span>
          时间: ${params[0].value[0]}<br/>
          <span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:${params[0].color};"></span>
          温度: ${temp}℃<br/>
          <span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:${params[0].color};"></span>
          光纤距离: ${distance}m<br/>
        </div>`;
        return htmlStr;
      },
      borderWidth: 1,
    },
    dataZoom: [
      //X轴滑动条
      {
        type: "slider", //滑动条
        show: true, //开启
        xAxisIndex: [0],
        filterMode: "none",
        left: "3.5%", //滑动条位置
        start: 0, //初始化时，滑动条宽度开始标度
        end: 100, //初始化时，滑动条宽度结束标度
      }, //X轴内置滑动
      {
        type: "inside", //内置滑动，随鼠标滚轮展示
        xAxisIndex: [0],
        filterMode: "none",
        start: 0, //初始化时，滑动条宽度开始标度
        end: 100, //初始化时，滑动条宽度结束标度
      },
      //Y轴滑动条
      {
        type: "slider", //滑动条
        show: true, //开启
        yAxisIndex: [0],
        filterMode: "none",
        left: "0%", //滑动条位置
        top: "7%",
        start: 0, //初始化时，滑动条宽度开始标度
        end: 100, //初始化时，滑动条宽度结束标度
      },
      //y轴内置滑动
      {
        type: "inside", //内置滑动，随鼠标滚轮展示
        yAxisIndex: [0],
        filterMode: "none",
        start: 0, //初始化时，滑动条宽度开始标度
        end: 100, //初始化时，滑动条宽度结束标度
      },
    ],
    series: [
      {
        name: "历史温度",
        data: echartsData(list()),
        type: "line",
        // stack: '总量',
        symbol: "circle",
        symbolSize: 5,
        // sampling: 'lttb', //降采样策略
        itemStyle: {
          color: "#bf444c",
          borderColor: "#bf444c", //拐点边框颜色
        },
        lineStyle: {
          color: "#bf444c", //改变折线颜色
        },
      },
    ],
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <div className="node">
        <img width="100%" src={imgURL} alt="" />
        <EnvironmentOutlined className="node-item1" onClick={showModal} />
        <EnvironmentOutlined className="node-item2" onClick={showModal} />
        <EnvironmentOutlined className="node-item3" onClick={showModal} />
        <EnvironmentOutlined className="node-item4" onClick={showModal} />
        <EnvironmentOutlined className="node-item5" onClick={showModal} />
        <EnvironmentOutlined className="node-item6" onClick={showModal} />
        <EnvironmentOutlined className="node-item7" onClick={showModal} />
        <EnvironmentOutlined className="node-item8" onClick={showModal} />
      </div>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width="80%"
      >
        <Echarts options={options} id={echarts} style={style} />
      </Modal>
    </>
  );
}

export default React.memo(Main);
