import { SEARCH_DATA } from "./resActions";
export const initialState = {
  searchData: "",
};
export const resReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_DATA:
      return {
        state,
        searchData: action.payload,
      };
    default:
      return state;
  }
};
