import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TextInputComponent from '../components/ui/TextInput';
import { Button, Caption, Checkbox, Card } from 'react-native-paper';
import { DEFAULT_COLOR } from '../data/constants';
import useInput from '../hooks/useInput';
import DateTimePicker from '../components/ui/DateTimePicker';
import { ScrollView, Swipeable } from 'react-native-gesture-handler';
import dayjs from 'dayjs';
import DateRangePicker from '../components/ui/DateRangePicker';
import CollapsibleField from '../components/ui/Collapsible';

const Schedule = () => {
    const navigation = useNavigation();
    const timeInputsRef = React.useRef<Array<string>>();
    const setTimeInputsRef = React.useRef<any>();
    const selectedTimeRef = React.useRef<Date>();
    const { value: title, onChange: onChangeTitle } = useInput("");
    const { value: description, onChange: onChangeDescription } = useInput("");
    const { value: startDate, onChange: onStartDateChange } = useInput(new Date());
    const { value: endDate, onChange: onEndDateChange } = useInput(new Date());
    const { value: selectedTime, onChange: onSelectedTimeChange } = useInput(new Date());
    const [timeInputs, setTimeInputs] = useState([] as Array<string>);
    const [dailyReminderEnabled, setDailyReminderEnabled] = useState(true);
    timeInputsRef.current = timeInputs;
    setTimeInputsRef.current = setTimeInputs;
    selectedTimeRef.current = selectedTime;
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Schedule Logs',
            headerTransparent: false,
            headerTitleStyle: { color: DEFAULT_COLOR },
            headerStyle: { backgroundColor: 'white' },
            headerLeft: () => (
                <AntDesign
                    name="close"
                    size={26}
                    color={DEFAULT_COLOR}
                    style={styles.close}
                    onPress={() => navigation.navigate('Home')}
                />
            ),
            headerRight: () => (
                <Button
                    mode="text"
                    style={styles.save}
                    onPress={() => navigation.navigate('Home')}
                >
                    Save
                </Button>
            )
        });
    }, []);

    const onAddTime = () => {
        const time_string = dayjs(selectedTimeRef.current).toISOString();
        const timeInputs = timeInputsRef.current as Array<string>;
        if (!timeInputs?.includes(time_string)) {
            // let sortedTimeList = [...timeInputs, time_string]
            //     .sort((time1, time2) =>
            //         new Date(time1).getTime() - new Date(time2).getTime()
            //     );
            setTimeInputsRef.current([...timeInputs, time_string]);
        }
    };

    const swippableTime = (time: string) => {
        return (
            <View style={{ borderWidth: 1, borderColor: "#E0E0E0", marginHorizontal: 10, }}>
                <Swipeable
                    friction={2}
                    renderLeftActions={() => deleteAction(true)}
                    renderRightActions={() => deleteAction(false)}
                    onSwipeableLeftOpen={() => Alert.prompt('LEFT SWIPE')}
                    onSwipeableRightOpen={() => Alert.prompt('Right SWIPE')}
                >
                    <Card elevation={2}>
                        <Card.Title title={dayjs(time).format('hh:mm A')?.toLocaleLowerCase()} />
                    </Card>
                </Swipeable>
            </View>
        );
    };

    const deleteAction = (left: boolean) => {
        const alignItems: any = left ? {} : { alignItems: 'flex-end' };
        return (
            <View
                style={[{ flex: 1, backgroundColor: 'rgba(255,0,0,0.5)', justifyContent: "center", flexDirection: "column-reverse" }, alignItems]}>
                <MaterialIcons
                    name="delete-outline"
                    size={26}
                    color="white"
                    style={left ? styles.leftActionIcon : styles.rightActionIcon}
                    onPress={() => { }}
                />
            </View>
        )
    }

    const header = () => (
        <View style={styles.container}>
            <View>
                <TextInputComponent
                    label="Title"
                    placeholder="Enter Notification Title"
                    onChangeText={onChangeTitle}
                    value={title}
                />
            </View>
            <View>
                <TextInputComponent
                    label="Description"
                    onChangeText={onChangeDescription}
                    value={description}
                    multiline={true}
                    numberOfLines={2}
                />
            </View>
            <View style={{ marginVertical: 30 }}>
                <Checkbox.Item
                    style={{ borderWidth: 1, borderColor: "rgba(105,105,105, 0.2)", borderRadius: 50 }}
                    label="Remind me daily"
                    labelStyle={styles.checkboxLabel}
                    status={dailyReminderEnabled ? "checked" : "unchecked"}
                    onPress={() => setDailyReminderEnabled((val) => !val)}
                    color={DEFAULT_COLOR}
                />
            </View>
            {!dailyReminderEnabled && <View style={{}}>
                <DateRangePicker
                    title="Select Date Range for the schedule"
                    startDate={startDate}
                    endDate={endDate}
                    minStartDate={new Date()}
                    minEndDate={startDate}
                    onStartDateChange={onStartDateChange}
                    onEndDateChange={onEndDateChange}
                />
            </View>}
            <View>
                <CollapsibleField
                    title="Pick Time"
                    description="You can add multiple instances of time to get notifications"
                >
                    <DateTimePicker
                        mode="time"
                        value={selectedTime}
                        onChange={(...args) => console.log(args)}
                    />
                    <Button mode="text" onPress={onAddTime}>Add Time</Button>
                </CollapsibleField>
            </View>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: "white", flex: 1, paddingBottom: 20 }}>
                <FlatList
                    data={timeInputsRef.current}
                    keyExtractor={(item, index) => `${item}_${index}`}
                    renderItem={(data) => swippableTime(data.item)}
                    nestedScrollEnabled={true}
                    ListHeaderComponent={header()}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    close: { paddingLeft: 20 },
    leftActionIcon: { paddingLeft: 20 },
    rightActionIcon: { paddingRight: 20 },
    save: {},
    container: {
        width: '100%',
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    checkboxLabel: {
        color: "gray", padding: 0, margin: 0
    },
    dateCaption: {
        fontSize: 14,
    }
});

export default Schedule;
