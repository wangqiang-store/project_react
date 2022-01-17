import React, { useState } from "react";
import { Row, Col, Input, DatePicker, Button, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Echarts from "../echarts/echarts.js";
import "../history/history.css";
const { RangePicker } = DatePicker;
function Strain(props) {
  let echarts = "echarts";
  let style = {
    width: "90%",
    height: "700px",
  };
  const columns = [
    {
      title: "节点名称",
      dataIndex: "name",
      align: "center",
      key: "name",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "母线槽",
      dataIndex: "buswayName",
      align: "center",
      key: "buswayName",
    },
    {
      title: "电房",
      dataIndex: "electricRoom",
      align: "center",
      key: "electricRoom",
    },
    {
      title: "主机",
      key: "host",
      dataIndex: "host",
      align: "center",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "通道",
      key: "channel",
      dataIndex: "channel",
      align: "center",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "时间段",
      key: "timeQuantum",
      align: "center",
      render: (text, record) => {
        return (
          <>
            <span>
              {record.startTime}-{record.endTime}
            </span>
          </>
        );
      },
    },
    {
      title: "最大应变",
      key: "maxTemp",
      dataIndex: "maxTemp",
      align: "center",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "最小应变",
      key: "minTemp",
      dataIndex: "minTemp",
      align: "center",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "平均应变",
      key: "avgTemp",
      dataIndex: "avgTemp",
      align: "center",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "备注",
      key: "remark",
      dataIndex: "remark",
      align: "center",
      render: (text) => <span>{text}</span>,
    },
  ];

  const data = [
    {
      id: 1,
      name: "节点一",
      buswayName: "真实母线槽",
      electricRoom: "真实电房",
      host: "真实主机",
      channel: "真实通道",
      startTime: "2021/8/5 04:55:02",
      endTime: "2021/8/5 14:28:02",
      maxTemp: "33.3",
      minTemp: "24.6",
      avgTemp: "28.5",
      remark: "网管平台展示",
    },
  ];

  const gatherColumns = [
    {
      title: "序号",
      key: "index",
      align: "center",
      render: (text, record, index) => {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: "采集时间",
      dataIndex: "createTime",
      align: "center",
      key: "createTime",
    },
    {
      title: "采集应变(℃)",
      dataIndex: "gatherTemp",
      align: "center",
      key: "gatherTemp",
    },
  ];
  const gatherData = [
    {
      id: 1,
      createTime: "2021/8/4 22:55:04",
      gatherTemp: 32.3,
    },
    {
      id: 2,
      createTime: "2021/8/4 22:56:04",
      gatherTemp: 32.4,
    },
    {
      id: 3,
      createTime: "2021/8/4 22:57:04",
      gatherTemp: 33.3,
    },
    {
      id: 4,
      createTime: "2021/8/4 22:58:04",
      gatherTemp: 34.3,
    },
    {
      id: 5,
      createTime: "2021/8/4 23:00:04",
      gatherTemp: 33.3,
    },
    {
      id: 6,
      createTime: "2021/8/4 23:05:07",
      gatherTemp: 32.3,
    },
    {
      id: 7,
      createTime: "2021/8/4 23:09:54",
      gatherTemp: 35.3,
    },
  ];
  let [rate, setRate] = useState(2);
  function list() {
    let tempList = [];
    for (let index = 0; index < 200; index++) {
      let temp = 20.03695;
      temp += Math.random() * 20;
      let distance = 100;
      distance += Math.random() * 20;
      tempList.push({
        temp,
        nodeName: `节点${index + 1}`,
        distance,
      });
    }
    return tempList;
  }
  function echartsData(tempList) {
    let list = [];
    tempList.forEach((item) => {
      list.push([item.nodeName, item.temp, item.distance]);
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
  let [options, setOptions] = useState({
    animation: false,
    title: {
      text: "应变折线图",
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
      name: "应变(με)",
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
      data: ["应变"],
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
          节点名称: ${params[0].value[0]}<br/>
          <span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:${params[0].color};"></span>
          应变: ${temp}με<br/>
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
        name: "应变",
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
  return (
    <Row>
      <Col span={24} className="d_flex d_flex_end">
        <span style={{ fontSize: "12px", marginRight: "5px" }}>
          应变显示范围倍率
        </span>
        <Input
          placeholder="请输入倍率"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          style={{ width: "200px", marginRight: "10px" }}
        />

        <RangePicker showTime style={{ width: "200px", marginRight: "10px" }} />
        <Button
          type="primary"
          icon={<SearchOutlined />}
          onClick={() => {
            setOptions((options) => {
              options.series[0].data = list();
              return options;
            });
          }}
        ></Button>
      </Col>
      <Col span={24}>
        <Echarts options={options} id={echarts} style={style} />
      </Col>
      <Col span={24} className="d_flex d_flex_sb">
        <h4>历史数据</h4>
        <Button type="primary">Excel</Button>
      </Col>
      <Col span={24} style={{ marginTop: "10px" }}>
        <Table
          columns={columns}
          dataSource={data}
          rowKey={(record) => record.id}
          bordered
        />
      </Col>
      <Col span={24} style={{ marginTop: "10px" }}>
        <Table
          columns={gatherColumns}
          dataSource={gatherData}
          rowKey={(record) => record.id}
          bordered
        />
      </Col>
    </Row>
  );
}

export default React.memo(Strain);
