import {useRoute, useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, FAB} from 'react-native-paper';
import AddMemberObservationDialog from '../components/AddMemberObservation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Table from '../components/ui/Table';
import Toast from '../components/ui/toast';
import {getMember, updateMember} from '../db/async_db';
import useToast from '../hooks/useToast';
import {MemberStat, OxyPulseDataType} from '../models/member.interface';
import {TableData} from '../models/table.model';
import {
  getFormattedTableData,
  getMemberStatTableData,
} from '../utils/member.util';
import {createPDF} from '../utils/pdf-report';

interface NavStatelessComponent extends React.FunctionComponent {
  navigationOptions?: any;
}

const MemberStatsScreen: NavStatelessComponent = () => {
  const [
    isAddObservationDialogVisible,
    setIsAddObservationDialogVisible,
  ] = React.useState(false);
  const route: any = useRoute();
  const navigation = useNavigation();
  const stateRef = React.useRef<OxyPulseDataType>();
  const memberProp: OxyPulseDataType = route?.params?.member;
  const member_id: string = memberProp?.id;
  const statsProps: Array<MemberStat> | [] = memberProp?.stat;
  const [member, setMember] = React.useState(memberProp as OxyPulseDataType);
  const [stats, setStats] = React.useState(statsProps);
  stateRef.current = member;
  const formattedTableData = getFormattedTableData(stats);
  const tableData: TableData = getMemberStatTableData(formattedTableData);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Logs',
      headerTransparent: true,
      headerStyle: {backgroundColor: 'transparent'},
      headerLeft: () => (
        <Ionicons
          name="arrow-back"
          size={24}
          color="rgb(93, 45, 150)"
          style={styles.backIconStyle}
          onPress={() => navigation.goBack()}
        />
      ),
      headerRight: () => {
        return (
          <Button
            mode="text"
            onPress={() => {
              createPDF(stateRef?.current as OxyPulseDataType);
            }}>
            Save as PDF
          </Button>
        );
      },
    });
  }, [navigation]);

  React.useEffect(() => {
    getStatList(member_id);
  }, [member_id]);
  const {
    toastText,
    showToast,
    setInfoToast,
    setErrorToast,
    hideToast,
  } = useToast();

  const onAddObservation = (id: string, stat: MemberStat) => {
    updateMember(id, null, null, null, stat)
      .then(() => {
        setInfoToast('Added Observation!');
      })
      .catch(() => {
        setErrorToast('Something wrong happened');
      })
      .finally(() => {
        setIsAddObservationDialogVisible(false);
        getStatList(id);
      });
  };

  const getStatList = (id: string) => {
    getMember(id).then(memberData => {
      memberData?.stat?.sort((a, b) => b.timestamp - a.timestamp);
      setMember(memberData as OxyPulseDataType);
      setStats(memberData?.stat || []);
    });
  };

  const onHideAddObservationDialog = () => {
    setIsAddObservationDialogVisible(false);
  };

  return (
    <View style={styles.container}>
      <Table data={tableData} />
      <AddMemberObservationDialog
        hideDialog={onHideAddObservationDialog}
        onSaveObservationProp={(stat: MemberStat) =>
          onAddObservation(member_id, stat)
        }
        visible={isAddObservationDialogVisible}
      />
      <Toast
        visible={false}
        type={showToast}
        onDismiss={hideToast}
        message={toastText}
      />
      <FAB
        label="ADD OBSERVATION"
        color="white"
        icon="plus"
        uppercase
        style={styles.addObservationButton}
        onPress={() => setIsAddObservationDialogVisible(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: '100%',
    flex: 1,
    padding: 16,
    paddingTop: 100,
    backgroundColor: '#fff',
  },
  cell: {
    borderWidth: 0.3,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#ddd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  header: {
    borderWidth: 0.5,
    borderColor: '#ddd',
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  headerText: {
    fontSize: 12,
    color: 'grey',
    fontWeight: '700',
  },
  cellText: {
    fontSize: 13,
  },
  backIconStyle: {paddingLeft: 20},
  addObservationButton: {
    marginBottom: 0,
    backgroundColor: 'rgb(93, 45, 150)',
  },
});

export default MemberStatsScreen;
