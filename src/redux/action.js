import axios from 'axios';
import * as actionTypes from './actionTypes';
import * as actionHandlers from './helpers/actionHandlers';

export const getCovidData = () =>
  function (dispatch) {
    dispatch(actionHandlers.tryHandle(actionTypes.GET_COVID_DATA));
    return axios
      .get('https://api.covid19india.org/v4/min/data.min.json')
      .then((response) => {
        if (response) {
          dispatch(actionHandlers.handleResponse(actionTypes.GET_COVID_DATA_SUCCESS, response));
        }
      })
      .catch((error) => {
        dispatch(actionHandlers.handleError(actionTypes.GET_COVID_DATA_FAILED, error));
      });
  };
