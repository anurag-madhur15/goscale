import { GET_DATA } from "./actionTypes";

  const initialState = {
    dataList: null,
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_DATA:
        return {
          ...state,
            dataList: action.dataList
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  