import { ACTIVE_ITEM } from '../actions/types';

export default function(state = {}, action) {
  switch(action.type){
    case ACTIVE_ITEM:
      return { ...state, activeItem: action.payload };
  }

  return state;
}
