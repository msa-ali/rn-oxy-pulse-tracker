import * as React from 'react';
import {View} from 'react-native';
import {Paragraph} from 'react-native-paper';
import DialogComponent from './ui/Dialog';
import FormActionButtons from './ui/FormActionButtons';

type DeleteMemberConfirmationDialogProps = {
  visible: boolean;
  onDismiss: () => void;
  onConfirm: (id: string) => void;
};

const DeleteMemberConfirmationDialog = ({
  visible,
  onDismiss,
  onConfirm,
}: DeleteMemberConfirmationDialogProps) => {
  return (
    <DialogComponent
      title="Are you sure to delete ?"
      visible={visible}
      onDismiss={onDismiss}>
      <View>
        <Paragraph>
          Deleting will remove all associated records for this member.
        </Paragraph>
        <FormActionButtons
          saveButton={{text: 'CONFIRM', onPress: onConfirm}}
          cancelButton={{text: 'CANCEL', onPress: onDismiss}}
        />
      </View>
    </DialogComponent>
  );
};

export default DeleteMemberConfirmationDialog;
