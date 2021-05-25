import React, { useState } from 'react';
import DatePicker, {DatePickerProps} from 'react-native-date-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RNDateTimePicker, { AndroidNativeProps, IOSNativeProps, WindowsNativeProps } from '@react-native-community/datetimepicker';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { DEFAULT_COLOR } from '../../data/constants';


type DateTimePickerProps = IOSNativeProps | AndroidNativeProps | WindowsNativeProps

type propType = DateTimePickerProps & {
    label?: string,
}
const DateTimePicker = (props: propType) => {
    const [isPickerVisible, setPickerVisible] = useState(false);
    return (
        <View>
            <View>
                <TextInput
                    label={props.label}
                    right={<TextInput.Icon name="calendar" color={DEFAULT_COLOR} />}
                    style={{
                        backgroundColor: "transparent"
                    }}
                    onFocus={() => setPickerVisible(true)}
                />
            </View>
            {isPickerVisible && <RNDateTimePicker {...props}/>}
        </View>
    );
};


export default DateTimePicker;