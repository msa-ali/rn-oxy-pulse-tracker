import dayjs from 'dayjs';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Caption, List } from 'react-native-paper';
import CollapsibleField from './Collapsible';
import DateTimePicker from './DateTimePicker';

type DateRangePickerProps = {
    title: string,
    startDate: Date,
    endDate: Date,
    minStartDate: Date,
    minEndDate: Date,
    onStartDateChange: (val: Date) => void,
    onEndDateChange: (val: Date) => void
};

const DateRangePicker = ({title, startDate, onStartDateChange, endDate, onEndDateChange, minStartDate, minEndDate}: DateRangePickerProps) => {
    const description = dayjs(startDate).format('DD/MM/YYYY') + " - " + dayjs(endDate).format('DD/MM/YYYY')
    return (
        <CollapsibleField 
            title={title} 
            description={description}
            expandedDefault={false}
        >
        <View>
            <View style={{ marginVertical: 10 }}>
                {/* <Caption style={styles.dateCaption}>Start Date</Caption> */}
                <DateTimePicker
                    label="Start Date"
                    value={startDate}
                    minimumDate={minStartDate}
                    mode="date"
                    style={{ marginTop: 10 }}
                    onChange={(...args) => console.log(args)}
                />
            </View>
            <View>
                {/* <Caption style={styles.dateCaption}>End Date</Caption> */}
                <DateTimePicker
                    label="End Date"
                    value={endDate}
                    onChange={(...args) => console.log(args)}
                    minimumDate={minEndDate}
                    mode="date"
                    style={{ marginVertical: 10 }}            
                />
            </View>
        </View>
        </CollapsibleField>
    )
}

export default DateRangePicker

const styles = StyleSheet.create({
    dateCaption: {
        fontSize: 14,
    }
})
