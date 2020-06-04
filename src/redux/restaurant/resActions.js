export const SEARCH_DATA = "SEARCH_DATA";

export const fetchSearchResults = (searchData) => {
  return {
    type: SEARCH_DATA,
    payload: searchData,
  };
};
