import { LOADING, MODAL_MESSAGE } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: action.payload };

    case MODAL_MESSAGE:
      return { ...state, message: action.payload.msg, link: action.payload.link };

    default:
      return state;
  }
}
