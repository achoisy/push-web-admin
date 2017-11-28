import _ from 'lodash';
import { MSG_LIST } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case MSG_LIST:
      return _.mapKeys(action.payload.data.msgList, '_id');

    default:
      return state;
  }
}
