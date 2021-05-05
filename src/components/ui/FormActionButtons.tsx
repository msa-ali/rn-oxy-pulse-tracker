import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

type ButtonDetail = {
  text: string;
  onPress: (...props: any[]) => void;
};

type FormActionButtonsProps = {
  cancelButton: ButtonDetail;
  saveButton: ButtonDetail;
};

const FormActionButtons = ({
  cancelButton,
  saveButton,
}: FormActionButtonsProps) => {
  return (
    <View style={style.buttonsContainer}>
      <Button mode="text" onPress={cancelButton.onPress}>
        {cancelButton.text}
      </Button>
      <Button mode="text" onPress={saveButton.onPress}>
        {saveButton.text}
      </Button>
    </View>
  );
};

const style = StyleSheet.create({
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginHorizontal: 10,
  },
  button: {
    color: 'rgb(93, 45, 150)',
  },
});

export default FormActionButtons;
