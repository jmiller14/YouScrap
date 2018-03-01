import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Action } from 'redux';

import {
  ModalBase,
  ModalBaseProps,
  ModalBaseActionProps,
  ModalBaseState,
} from 'src/components/modal/ModalBase';
import { Text } from 'src/components/Text';
import { InputField } from 'src/components/InputField';
import { Button } from 'src/components/Button';
import { colors, HAIRLINE_WIDTH } from 'src/vars';

export interface CreateBookModalProps extends ModalBaseProps {
  addBook: (title: string) => Action;
}

export interface CreateBookModalState extends ModalBaseState {
  title: string;
}

export class CreateBookModal extends ModalBase<
  CreateBookModalProps & ModalBaseActionProps,
  CreateBookModalState
> {
  private input: InputField;

  state = { title: '' };

  onClose = ({ title }) => this.props.addBook(title);

  onDismiss = () => {};

  cancelPress = () => {
    this.props.dismissModal();
  };

  createPress = () => {
    if (this.state.title.length) {
      this.props.closeModal({ title: this.state.title });
    } else {
      // TODO error message
    }
  };

  titleChanged = title => this.setState({ title });

  componentDidMount() {
    this.input.focus();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.modalText}>Name your new scrapbook.</Text>

        <InputField
          ref={ref => (this.input = ref)}
          style={styles.modalInput}
          placeholder="Title"
          onSubmitEditing={this.createPress}
          value={this.state.title}
          onChangeText={this.titleChanged}
          returnKeyType="done"
          enablesReturnKeyAutomatically
        />

        <View style={styles.modalButtonContainer}>
          <Button
            style={styles.modalCancelButton}
            title="Cancel"
            onPress={this.cancelPress}
          />

          <Button
            style={styles.modalCreateButton}
            title="Create"
            onPress={this.createPress}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},

  modalText: {
    fontSize: 16,
    textAlign: 'center',
  },

  modalInput: {
    borderWidth: HAIRLINE_WIDTH,
    borderColor: colors.gray,
    marginTop: 10,
    marginBottom: 10,
  },

  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  modalCancelButton: {
    backgroundColor: colors.gray,
  },

  modalCreateButton: {
    marginLeft: 5,
  },
});
