import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import msgReducer from './msg_reducer';
import headerReducer from './header_reducer';
import widget from './widget_reducer';
import dropzoneReducer from './dropzone_reducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  messages: msgReducer,
  header: headerReducer,
  widget,
  files: dropzoneReducer,
});

export default rootReducer;
