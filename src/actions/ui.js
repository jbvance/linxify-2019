export const OPEN_MODAL = "open_modal";
export const CLOSE_MODAL = "close_modal";
export const OPEN_CONFIRM_MODAL = "open_confirm_modal";
export const CLOSE_CONFIRM_MODAL = "close_confirm_modal";

export function openModal(obj) {
  return {
    type: OPEN_MODAL,
    modalKey: obj.modalKey
  };
}

export function openConfirmModal(obj) {
  return {
    type: OPEN_CONFIRM_MODAL,
    modalKey: obj.modalKey
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL
  };
}
export function closeConfirmModal() {
  return {
    type: CLOSE_CONFIRM_MODAL
  };
}
