import * as React from 'react';
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  TextInputProps,
  TextStyle,
} from 'react-native';
import {TextInput} from 'react-native-paper';

type TextInputComponentProps = TextInputProps & {
  label: string;
  placeholder?: string,
  error?: boolean;
  value: string;
  style?: StyleProp<TextStyle>;
  keyboardType?: KeyboardTypeOptions | undefined;
  onChangeText: (text: string) => void;
};

const TextInputComponent = ({
  label,
  placeholder,
  value,
  error = false,
  keyboardType,
  onChangeText,
  multiline = false,
  numberOfLines
}: TextInputComponentProps) => {
  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      returnKeyType="done"
      returnKeyLabel="Done"
      error={error}
      style={styles.textInput}
      mode="flat"
      keyboardType={keyboardType}
      value={value}
      onChangeText={text => onChangeText(text)}
      multiline={multiline}
      numberOfLines={numberOfLines}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#fff',
  }
});

export default TextInputComponent;
