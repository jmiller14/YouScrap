import * as React from 'react';

export interface ModalBaseProps {}

export interface ModalBaseActionProps {
  closeModal: (data?) => void;
  dismissModal: (data?) => void;
}

export type ModalBaseCombinedProps = ModalBaseProps & ModalBaseActionProps;

export interface ModalBaseState {}

export abstract class ModalBase<
  P extends ModalBaseCombinedProps,
  S extends ModalBaseState = {}
> extends React.Component<P, S> {
  // called on success, e.g., "OK" button pressed
  abstract onClose: (data?: any) => void;

  // called on failure, e.g., "cancel" button pressed
  abstract onDismiss: (data?: any) => void;
}
