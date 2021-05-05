import * as React from 'react';
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  TextStyle,
} from 'react-native';
import {TextInput} from 'react-native-paper';

type TextInputComponentProps = {
  label: string;
  error?: boolean;
  value: string;
  style?: StyleProp<TextStyle>;
  keyboardType?: KeyboardTypeOptions | undefined;
  onChangeText: (text: string) => void;
};

const TextInputComponent = ({
  label,
  value,
  error = false,
  keyboardType,
  onChangeText,
}: TextInputComponentProps) => {
  return (
    <TextInput
      label={label}
      returnKeyType="done"
      returnKeyLabel="Done"
      error={error}
      style={styles.textInput}
      mode="flat"
      keyboardType={keyboardType}
      value={value}
      onChangeText={text => onChangeText(text)}

    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#fff',
  }
});

export default TextInputComponent;
