import { FILES_UPLOAD, FILE_DEL, RESET_FILE } from '../actions/types';

export default function (state = { upFiles: [] }, action) {
  switch (action.type) {
    case FILES_UPLOAD:
      return { ...state, upFiles: [...state.upFiles, action.payload] };

    case FILE_DEL:
      return {
        ...state,
        upFiles: state.upFiles.filter(file => file.filename !== action.payload),
      };

    case RESET_FILE:
      return {
        ...state,
        upFiles: [],
      };

    default:
      return state;
  }
}
