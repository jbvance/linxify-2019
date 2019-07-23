import {
  OPEN_MODAL,
  CLOSE_MODAL,
  OPEN_CONFIRM_MODAL,
  CLOSE_CONFIRM_MODAL
} from "../actions/ui";

const initialState = {
  modalState: {
    openModal: false,
    modalKey: ""
  },
  confirmModalState: {
    openModal: false,
    modalKey: ""
  }
};

function uiReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return Object.assign({}, state, {
        modalState: {
          openModal: true,
          modalKey: action.modalKey
        }
      });

    case OPEN_CONFIRM_MODAL:
      return Object.assign({}, state, {
        confirmModalState: {
          openModal: true,
          modalKey: action.modalKey
        }
      });

    case CLOSE_MODAL:
      return Object.assign({}, state, {
        modalState: {
          openModal: false
        }
      });

    case CLOSE_CONFIRM_MODAL:
      return Object.assign({}, state, {
        confirmModalState: {
          openModal: false
        }
      });

    default:
      return state;
  }
}

export default uiReducer;
