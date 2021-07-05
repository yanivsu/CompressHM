import { getApi, postApi, putApi } from "../helpers/apiUtils";
import * as enums from "../helpers/enums";
import fileSaver from "file-saver";
//----------------- Async Action functions ----------//

export function loadInitData() {
  return function (dispatch) {
    return getApi(enums.serverEnums.API + enums.serverEnums.GETDATA)
      .then(({ data }) => {
        dispatch({
          type: enums.compassEnums.COMPASS_FETCH_DATA,
          payload: data,
        });
      })
      .catch((error) => console.log("loadData Error no data", error.message));
  };
}

export function addLineData(data) {
  return function (dispatch) {
    dispatch({
      type: enums.compassEnums.SEND_NEW_LINE,
    });
    return putApi(enums.serverEnums.API + enums.serverEnums.ADDLINE, data)
      .then(({ data }) => {
        dispatch({
          type: enums.compassEnums.ADD_LINE_PREMISSION,
          payload: data,
        });
      })
      .catch((error) => {
        console.log("error with add line", error.message);
      });
  };
}

export function askForCompressTransactions() {
  return function (dispatch) {
    dispatch({ type: enums.compassEnums.WAIT_FOR_FILE });
    return postApi(enums.serverEnums.API + enums.serverEnums.SEND_COMPRESS)
      .then(async ({ data }) => {
        var blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
        fileSaver.saveAs(blob, "file.csv");
        dispatch({ type: enums.compassEnums.GET_NEW_FILE, payload: data });
      })
      .catch((error) => {
        console.log("error with get file", error.message);
      });
  };
}
