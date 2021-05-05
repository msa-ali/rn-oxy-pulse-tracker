import {Picker} from '@react-native-picker/picker';
import * as React from 'react';
import {StyleSheet, Platform} from 'react-native';
import {HelperText, Text} from 'react-native-paper';
import {OxyPulseDataType, Relation} from '../models/member.interface';
import DialogComponent from './ui/Dialog';
import FormActionButtons from './ui/FormActionButtons';
import TextInputComponent from './ui/TextInput';

type AddMemberDialogProps = {
  member?: OxyPulseDataType;
  visible: boolean;
  hideDialog: () => void;
  onSave: (name: string, relation: Relation, age?: number) => void;
  onUpdate: (
    id: string,
    name: string,
    relation: Relation,
    age?: number,
  ) => void;
};

const getMemberValuesFromProp = (member: OxyPulseDataType) => {
  const name = member?.name ?? '';
  const age = member?.age?.toString() ?? '';
  const relationProp = member?.relation;
  let selectedRelationValue = Relation.SELF,
    relationInputValue = '';
  if (relationProp) {
    if (Object.keys(Relation).includes(relationProp)) {
      selectedRelationValue = relationProp as Relation;
    } else {
      relationInputValue = relationProp;
      selectedRelationValue = Relation.OTHER;
    }
  }
  return {name, age, selectedRelationValue, relationInputValue};
};

const AddMemberDialog = ({
  member,
  visible,
  hideDialog,
  onSave,
  onUpdate,
}: AddMemberDialogProps) => {
  const {
    name: defaultName,
    age: defaultAge,
    relationInputValue,
    selectedRelationValue,
  } = getMemberValuesFromProp(member as OxyPulseDataType);
  const isIOS = Platform.OS === 'ios';
  const [nameInputError, setNameInputError] = React.useState(false);
  const [ageInputError, setAgeInputError] = React.useState(false);
  const [name, setName] = React.useState(defaultName);
  const [age, setAge] = React.useState(defaultAge);
  const [selectedRelation, setSelectedRelation] = React.useState(
    selectedRelationValue,
  );
  const [relation, setRelation] = React.useState(relationInputValue);
  const resetState = () => {
    setName('');
    setAge('');
    setAgeInputError(false);
    setSelectedRelation(Relation.SELF);
    setRelation('');
    setNameInputError(false);
  };

  React.useEffect(() => {
    const {
      name: updatedName,
      age: updatedAge,
      relationInputValue: updatedRelationInputValue,
      selectedRelationValue: updatedSelectedRelationValue,
    } = getMemberValuesFromProp(member as OxyPulseDataType);
    setName(updatedName);
    setAge(updatedAge);
    setSelectedRelation(updatedSelectedRelationValue);
    setRelation(updatedRelationInputValue);
  }, [member]);

  const onHideDialog = () => {
    resetState();
    hideDialog();
  };

  const onMemberSave = () => {
    if (!name) {
      return setNameInputError(true);
    } else if (!age) {
      return setAgeInputError(true);
    }
    member
      ? onUpdate(
          member.id,
          name,
          (relation || selectedRelation) as Relation,
          age ? parseInt(age, 10) : undefined,
        )
      : onSave(
          name,
          (relation || selectedRelation) as Relation,
          age ? parseInt(age, 10) : undefined,
        );
    resetState();
  };

  return (
    <DialogComponent
      title="Add Family Member"
      visible={visible}
      onDismiss={onHideDialog}>
      {/* NAME TEXT INPUT */}
      <TextInputComponent
        label="Name"
        error={nameInputError}
        value={name}
        onChangeText={text => {
          setName(text);
          setNameInputError(false);
        }}
      />
      <HelperText type="error" visible={!!nameInputError}>
        Please enter valid name !
      </HelperText>
      {/* AGE INPUT */}
      <TextInputComponent
        label="Age"
        keyboardType="number-pad"
        error={ageInputError}
        value={age}
        onChangeText={text => {
          setAge(text);
          setAgeInputError(false);
        }}
      />
      <HelperText type="error" visible={!!ageInputError}>
        Please enter valid age !
      </HelperText>
      {!isIOS && <Text style={style.iosText}>Select Relation</Text>}
      {!isIOS && (
        <Picker
          selectedValue={selectedRelation}
          style={style.picker}
          onValueChange={itemValue =>
            setSelectedRelation(itemValue as Relation)
          }>
          {Object.keys(Relation).map(relationStr => (
            <Picker.Item
              key={relationStr}
              label={relationStr}
              value={relationStr}
            />
          ))}
        </Picker>
      )}
      {(selectedRelation === Relation.OTHER || isIOS) && (
        <TextInputComponent
          label="Enter Relation"
          style={style.relationTextInput}
          value={relation}
          onChangeText={text => setRelation(text)}
        />
      )}
      <FormActionButtons
        cancelButton={{text: 'CANCEL', onPress: onHideDialog}}
        saveButton={{text: 'SAVE', onPress: onMemberSave}}
      />
    </DialogComponent>
  );
};

const style = StyleSheet.create({
  iosText: {
    color: 'grey',
    fontSize: 12,
    marginLeft: 10,
  },
  picker: {height: 50, width: 200},
  relationTextInput: {marginBottom: 20},
});

export default AddMemberDialog;
