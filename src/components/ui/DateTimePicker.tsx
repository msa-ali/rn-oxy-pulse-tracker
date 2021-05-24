import React, { useState } from 'react';
import DatePicker, {DatePickerProps} from 'react-native-date-picker';
import RNDateTimePicker, { AndroidNativeProps, IOSNativeProps, WindowsNativeProps } from '@react-native-community/datetimepicker';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';


type DateTimePickerProps = IOSNativeProps | AndroidNativeProps | WindowsNativeProps

const DateTimePicker = (props: DateTimePickerProps) => {
    const [isPickerVisible, setPickerVisible] = useState(false);
    return (
        <View>
            <View>
                <TextInput

                />
            </View>
            {isPickerVisible && <RNDateTimePicker {...props}/>}
        </View>
    );
};


export default DateTimePicker;