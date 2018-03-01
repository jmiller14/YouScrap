import { Action } from 'redux';
import { ModalType, ModalProps } from './';

export enum ActionTypes {
  OPEN_MODAL = 'OPEN_MODAL',
  DISMISS_MODAL = 'DISMISS_MODAL',
  CLOSE_MODAL = 'CLOSE_MODAL',
  UNLOAD_MODAL = 'UNLOAD_MODAL',
}

export interface OpenModalAction extends Action {
  modalType: ModalType;
  modalProps: ModalProps;
}

export function openModal(
  type: ModalType,
  props: ModalProps = {
    onDismiss: () => {},
    onClose: () => {},
  },
): OpenModalAction {
  return {
    type: ActionTypes.OPEN_MODAL,
    modalType: type,
    modalProps: props,
  };
}

export function dismissModal(): Action {
  return { type: ActionTypes.DISMISS_MODAL };
}

export function closeModal(): Action {
  return { type: ActionTypes.CLOSE_MODAL };
}

export function unloadModal(): Action {
  return { type: ActionTypes.UNLOAD_MODAL };
}
