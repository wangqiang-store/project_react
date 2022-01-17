import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
function Echarts(props) {
  let { options, style, id } = props;
  let myResize = useRef(null);
  let myChart = useRef(null);
  useEffect(() => {
    myChart.current = echarts.init(document.getElementById(id));
    // 绘制图表
    myResize.current = (e) => {
      myChart.current && myChart.current.resize();
    };
    window.addEventListener("resize", myResize.current);
  }, [id]);
  useEffect(() => {
    let drawEcharts = () => {
      // 基于准备好的dom，初始化echarts实例
      myChart.current.setOption(options);
    };
    drawEcharts();
    return () => {
      window.removeEventListener("resize", myResize.current);
    };
  }, [options]);
  return <div id={id} style={style}></div>;
}

export default React.memo(Echarts);
