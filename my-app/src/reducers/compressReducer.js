import * as enums from "../helpers/enums";

const INITIAL_STATE = {
  isLoading: true,
  newLineLoading: false,
  compressData: [],
  counter: 0,
};

const compressReducer = (state = INITIAL_STATE, action) => {
  const orderDataToPayingAndReceivng = (data) => {
    let paying = [];
    let receiving = [];
    data.forEach((line) => {
      if (line !== null || line !== undefined) {
        if (line.amount > 0) {
          receiving.push({ name: line.counterParty, amount: line.amount });
        } else if (line.amount < 0) {
          paying.push({ name: line.tradingParty, amount: line.amount * -1 });
        }
      }
    });
    return [paying, receiving];
  };
  switch (action.type) {
    case enums.compassEnums.COMPASS_FETCH_DATA: {
      let newState = { ...state };
      newState.isLoading = false;
      newState.compressData = orderDataToPayingAndReceivng(
        action.payload.mockDB
      );
      return newState;
    }
    case enums.compassEnums.SEND_NEW_LINE: {
      let newState = { ...state };
      newState.newLineLoading = true;
      return newState;
    }
    case enums.compassEnums.ADD_LINE_PREMISSION: {
      let newState = { ...state };
      newState.newLineLoading = false;
      // check the new line
      if (parseInt(action.payload.newLine.amount) < 0) {
        let tempLine = {
          name: action.payload.newLine.counterParty,
          amount: parseInt(action.payload.newLine.amount * -1),
        };
        newState.compressData[0].push(tempLine);
      } else {
        let tempLine = {
          name: action.payload.newLine.counterParty,
          amount: action.payload.newLine.amount,
        };
        newState.compressData[1].push(tempLine);
      }

      return newState;
    }
    default:
      return state;
  }
};

export default compressReducer;
