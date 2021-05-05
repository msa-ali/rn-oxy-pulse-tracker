import * as React from 'react';
import {StyleSheet} from 'react-native';
import {HelperText} from 'react-native-paper';
import {MemberStat} from '../models/member.interface';
import DialogComponent from './ui/Dialog';
import FormActionButtons from './ui/FormActionButtons';
import TextInputComponent from './ui/TextInput';

type AddMemberObservationProps = {
  visible: boolean;
  hideDialog: () => void;
  onSaveObservationProp: (stat: MemberStat) => void;
};

const AddMemberObservationDialog = ({
  visible,
  hideDialog,
  onSaveObservationProp,
}: AddMemberObservationProps) => {
  const [oxySatError, setOxySatError] = React.useState(false);
  const [pulseRateError, setPulseRateError] = React.useState(false);
  const [oxygen_saturation, setOxySaturation] = React.useState('');
  const [pulse_rate, setPulseRate] = React.useState('');
  const [temperature, setTemperature] = React.useState('');

  const resetState = () => {
    setOxySaturation('');
    setPulseRate('');
    setTemperature('');
    setOxySatError(false);
    setPulseRateError(false);
  };

  const onHideDialog = () => {
    resetState();
    hideDialog();
  };

  const onSaveObservation = () => {
    if (!oxygen_saturation) {
      return setOxySatError(true);
    } else if (!pulse_rate) {
      return setPulseRateError(true);
    }
    onSaveObservationProp({
      oxy_sat: parseFloat(oxygen_saturation),
      pulse_rate: parseFloat(pulse_rate),
      timestamp: Date.now(),
      temperature: temperature ? parseFloat(temperature) : '-',
    });
    resetState();
  };

  return (
    <DialogComponent
      title="Add Observation"
      visible={visible}
      onDismiss={onHideDialog}>
      <TextInputComponent
        label="Oxygen Saturation - SPO2"
        keyboardType="numeric"
        error={oxySatError}
        value={oxygen_saturation}
        onChangeText={text => setOxySaturation(text)}
      />
      <HelperText type="error" visible={!!oxySatError}>
        Please enter valid SPO2 value !
      </HelperText>
      <TextInputComponent
        label="Pulse Rate"
        keyboardType="numeric"
        error={pulseRateError}
        value={pulse_rate}
        onChangeText={text => setPulseRate(text)}
      />
      <HelperText type="error" visible={!!pulseRateError}>
        Please enter valid Pulse Rate !
      </HelperText>
      <TextInputComponent
        label={`Temperature in ${String.fromCharCode(176)}F`}
        keyboardType="numeric"
        value={temperature}
        onChangeText={text => setTemperature(text)}
        style={style.temperatureInput}
      />
      <FormActionButtons
        cancelButton={{text: 'CANCEL', onPress: onHideDialog}}
        saveButton={{text: 'SAVE', onPress: onSaveObservation}}
      />
    </DialogComponent>
  );
};

const style = StyleSheet.create({
  temperatureInput: {marginBottom: 20},
});

export default AddMemberObservationDialog;
