import { ModalType, ModalProps } from './';

export interface ModalState {
  type: ModalType;
  props: ModalProps;
  isOpen: boolean;
  wasDismissed: boolean;
  wasClosed: boolean;
  returnData: any;
}
