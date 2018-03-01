import { ModalBaseCombinedProps } from './ModalBase';
import {
  CreateBookModal,
  CreateBookModalProps,
} from 'src/dashboard/CreateBookModal';

// union type of all modal ids
export type ModalType = 'CREATE_BOOK';

export interface ModalProps {}

// union type of all modal component types
type ModalComponentType = typeof CreateBookModal;

// union type of all modal props types
export type ModalPropsType = ModalBaseCombinedProps | CreateBookModalProps;

export const ModalComponents: { [key in ModalType]: ModalComponentType } = {
  CREATE_BOOK: CreateBookModal,
};
