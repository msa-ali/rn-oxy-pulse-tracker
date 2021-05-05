import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Portal, Dialog} from 'react-native-paper';
import {DEFAULT_COLOR} from '../../data/constants';

type DialogProps = {
  title: string;
  visible: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
};

const DialogComponent = (props: DialogProps) => {
  const {title, onDismiss, children, visible} = props;
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title style={styles.dialogTitle}>{title}</Dialog.Title>
        <Dialog.Content>{children}</Dialog.Content>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialogTitle: {
    color: DEFAULT_COLOR,
  },
});

export default DialogComponent;
