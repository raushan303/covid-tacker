const init = {
  data: [],
  error: false,
  isLoading: false,
  response: false,
};

export default function Reducer(state = init, { type, payload }) {
  switch (type) {
    case 'getCovidData':
      return {
        ...state,
        isLoading: true,
        response: false,
      };
    case `getCovidData.success`:
      return {
        ...state,
        isLoading: false,
        data: payload.data,
        error: false,
        response: true,
      };
    case `getCovidData.failed`:
      return {
        ...state,
        isLoading: false,
        data: payload,
        error: true,
        response: true,
      };
    default:
      return state;
  }
}
