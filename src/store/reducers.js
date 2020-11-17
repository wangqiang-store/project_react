import { INPUT_CHANGE, CLICK_LISTITEM, ADD_CLICK } from "./typeCretors";
const data = {
  inputValue: "Write Something",
  list: ["早上4点起床，锻炼身体", "中午下班游泳一小时"],
};
export default (state = data, action) => {
  switch (action.type) {
    case ADD_CLICK:
      let newState = JSON.parse(JSON.stringify(state));
      newState.list = [...newState.list, action.value];
      return newState;
    case CLICK_LISTITEM:
      let List = JSON.parse(JSON.stringify(state));
      List.list = action.value;
      return List;
    case INPUT_CHANGE:
      let CHANGE = JSON.parse(JSON.stringify(state));
      CHANGE.inputValue = action.value;
      return CHANGE;
    default:
      break;
  }
  return state;
};
