// 格式化时间  时分秒
export function filterTime(time, sym = "-", isHMS = true) {
  if (time == null) {
    return "";
  }
  let d = new Date(time);
  let Hours, Minutes, Seconds;
  if (d.getHours() < 10) {
    Hours = "0" + d.getHours();
  } else {
    Hours = d.getHours();
  }
  if (d.getMinutes() < 10) {
    Minutes = "0" + d.getMinutes();
  } else {
    Minutes = d.getMinutes();
  }
  if (d.getSeconds() < 10) {
    Seconds = "0" + d.getSeconds();
  } else {
    Seconds = d.getSeconds();
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
