const data = {
  inputValue: "Write Something",
  list: ["早上4点起床，锻炼身体", "中午下班游泳一小时"],
};
export default (state = data, action) => {
  switch (action.type) {
    case "inputChange":
      let newState = JSON.parse(JSON.stringify(state));
      newState.list = action.value;
      return newState;
    case "clickListItem":
      let ewState = JSON.parse(JSON.stringify(state));
      ewState.list = action.value;
      return ewState;
    default:
      break;
  }
  return state;
};
