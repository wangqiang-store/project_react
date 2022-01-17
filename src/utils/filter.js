// 格式化时间  时分秒
export function filterTime(time, sym = "-", isHMS = true) {
  if (time == null) {
    return "";
  }
  let d = new Date(time);
  if (d.getHours() < 10) {
    var Hours = "0" + d.getHours();
  } else {
    var Hours = d.getHours();
  }
  if (d.getMinutes() < 10) {
    var Minutes = "0" + d.getMinutes();
  } else {
    var Minutes = d.getMinutes();
  }
  if (d.getSeconds() < 10) {
    var Seconds = "0" + d.getSeconds();
  } else {
    var Seconds = d.getSeconds();
  }

  if (isHMS) {
    return (
      d.getFullYear() +
      sym +
      (d.getMonth() + 1) +
      sym +
      d.getDate() +
      " " +
      Hours +
      ":" +
      Minutes +
      ":" +
      Seconds
    );
  } else {
    return d.getFullYear() + sym + (d.getMonth() + 1) + sym + d.getDate();
  }
}
