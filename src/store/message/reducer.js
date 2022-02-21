import { messageTypes } from "./actions";
const initialState = null;

const messageReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case messageTypes.ADD_MESSAGE:
      return payload;
    case messageTypes.CLEAR_MESSAGE:
      return state;
    default:
      return state;
  }
};

export default messageReducer;
