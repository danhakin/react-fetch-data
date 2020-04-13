import { useState, useEffect, useReducer } from "react";
import axios from "axios";

const ACTIONS = {
  init: "FETCH_INIT",
  success: "FETCH_SUCCESS",
  failure: "FETCH_FAILURE"
};

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.init:
      return { ...state, isLoading: true, isError: false };
    case ACTIONS.success:
      return { ...state, isLoading: false, data: action.payload };
    case ACTIONS.failure:
      return { ...state, isLoading: false, isError: true };
    default:
      throw new Error();
  }
};

export const useDataApi = (initialUrl, initialData = {}) => {
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: ACTIONS.init });

      try {
        const result = await axios(url);
        if (!didCancel) {
          dispatch({ type: ACTIONS.success, payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: ACTIONS.failure });
        }
      }
    };
    fetchData();

    return () => {
      didCancel = true;
    };
  }, [url]);

  return [state, setUrl];
};
