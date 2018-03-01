import * as React from 'react';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';

import { State } from 'src/store/state';
import { ModalType, ModalPropsType, ModalComponents } from './';
import { dismissModal, closeModal, unloadModal } from './actions';
import { ModalBase, ModalBaseCombinedProps, ModalBaseState } from './ModalBase';
import { Modal } from 'src/components/Modal';

export interface ModalDisplayProps {
  modalType: ModalType;
  modalProps: ModalPropsType;
  isOpen: boolean;
  dismissModal: () => void;
  closeModal: () => void;
  unloadModal: () => void;
}

export class ModalDisplayComponent extends React.Component<ModalDisplayProps> {
  private modalRef: ModalBase<ModalBaseCombinedProps, ModalBaseState> = null;
  private hideAction: 'dismiss' | 'close' = null;
  private returnData = null;

  dismissModal = (returnData = null) => {
    this.returnData = returnData;
    this.hideAction = 'dismiss';
    this.props.dismissModal();
  };

  closeModal = (returnData = null) => {
    this.props.closeModal();
    this.hideAction = 'close';
    this.returnData = returnData;
  };

  callHideActionCallback = () => {
    if (this.modalRef && this.hideAction === 'dismiss') {
      this.modalRef.onDismiss(this.returnData);
    } else if (this.modalRef && this.hideAction === 'close') {
      this.modalRef.onClose(this.returnData);
    }

    this.hideAction = null;
    this.returnData = null;
    this.props.unloadModal();
  };

  setModalRef = ref => (this.modalRef = ref);

  render() {
    const ModalComponent: any = this.props.modalType
      ? ModalComponents[this.props.modalType]
      : null;

    return (
      <Modal isOpen={this.props.isOpen} onClose={this.callHideActionCallback}>
        {this.props.modalType && (
          <ModalComponent
            ref={this.setModalRef}
            dismissModal={this.dismissModal}
            closeModal={this.closeModal}
            {...this.props.modalProps}
          />
        )}
      </Modal>
    );
  }
}

export const ModalDisplay = connect(
  (state: State) => ({
    modalType: state.modal.type,
    modalProps: state.modal.props,
    isOpen: state.modal.isOpen,
  }),

  (dispatch: Dispatch<Action>) => ({
    dismissModal: () => dispatch(dismissModal()),
    closeModal: () => dispatch(closeModal()),
    unloadModal: () => dispatch(unloadModal()),
  }),
)(ModalDisplayComponent);
