import * as React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator, List, Paragraph} from 'react-native-paper';
import {Divider, FAB} from 'react-native-paper';
import MemberTile from '../components/MemberTile';
import {OxyPulseDataType, Relation} from '../models/member.interface';
import AddMemberDialog from '../components/AddMemberDialog';
import {
  fetchAllMembers,
  addMember,
  removeMember,
  updateMember,
} from '../db/async_db';
import {getNewMember} from '../utils/member.util';
import Toast from '../components/ui/toast';
import useToast from '../hooks/useToast';
import DeleteMemberConfirmationDialog from '../components/DeleteMemberConfirmationDialog';
import { DEFAULT_LIGHT_COLOR } from '../data/constants';

const MemberListScreen = () => {
  const {useState, useEffect, useCallback} = React;
  const [addMemberDialogVisible, setAddMemberDialogVisible] = useState(false);
  const [deleteMemberDialogVisible, setDeleteMemberDialogVisible] = useState(
    false,
  );
  const [memberIdToBeDelete, setMemberIdToBeDeleted] = useState('');
  const [memberToBeEdited, setMemberToBeEdited] = useState(
    null as OxyPulseDataType,
  );
  const [members, setMembers] = useState(null as any);
  const {
    toastText,
    showToast,
    setInfoToast,
    setErrorToast,
    hideToast,
  } = useToast();

  const onSave = (name: string, relation: Relation, age?: number) => {
    const member = getNewMember(name, relation, age);
    addMember(member)
      .then(() => {
        setInfoToast('Added member !');
      })
      .catch(() => {
        setErrorToast('Something wrong happened!');
      })
      .finally(() => {
        setAddMemberDialogVisible(false);
        getAllMembers();
      });
  };

  const onUpdate = (
    id: string,
    name: any,
    relation: Relation,
    age?: number,
  ) => {
    updateMember(id, name, relation, age)
      .then(() => {
        setInfoToast('Updated member !');
      })
      .catch(() => {
        setErrorToast('Something wrong happened!');
      })
      .finally(() => {
        setAddMemberDialogVisible(false);
        setMemberToBeEdited(null as OxyPulseDataType);
        getAllMembers();
      });
  };

  const getAllMembers = useCallback(() => {
    fetchAllMembers()
      .then((allMembers: any) => {
        const updatedMembers = allMembers?.filter(
          (member: any) => !member?.hasOnboarded,
        );
        setMembers(updatedMembers as Array<OxyPulseDataType>);
        hideToast();
      })
      .catch(_ => {
        setErrorToast('Something wrong happened!');
      })
      .finally(() => {
        setAddMemberDialogVisible(false);
      });
  }, []);

  useEffect(() => {
    getAllMembers();
  }, [getAllMembers]);

  const onDismissSnackBar = () => {
    hideToast();
  };
  const router = useNavigation();
  const headerHeight = useHeaderHeight();

  const onMemberPress = (item: OxyPulseDataType) =>
    router.navigate('member-stats', {
      member: item,
    });

  const onDeleteMemberDialogConfirmation = () => {
    removeMember(memberIdToBeDelete)
      .then(() => {
        setInfoToast('Deleted member !');
      })
      .catch(() => {
        setErrorToast('Something wrong happened!');
      })
      .finally(() => {
        getAllMembers();
        setDeleteMemberDialogVisible(false);
        setMemberIdToBeDeleted('');
      });
  };

  const onDeleteMember = (id: string) => {
    setMemberIdToBeDeleted(id);
    setDeleteMemberDialogVisible(true);
  };

  const onEditMember = (item: OxyPulseDataType) => {
    setMemberToBeEdited(item);
    setAddMemberDialogVisible(true);
  };

  const onDismissDeleteMemberDialog = () => {
    setMemberIdToBeDeleted('');
    setDeleteMemberDialogVisible(false);
  };

  const onHideAddMemberDialog = () => {
    setAddMemberDialogVisible(false);
    setMemberToBeEdited(null as OxyPulseDataType);
  };

  const viewStyle = {flex: 1, marginTop: headerHeight + 5};

  return (
    <View style={viewStyle}>
      {members && members.length ? (
        <>
          <List.Subheader>Family Members</List.Subheader>
          <FlatList
            data={members}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View>
                <MemberTile
                  member={item}
                  onPress={() => onMemberPress(item)}
                  onEditMember={() => onEditMember(item)}
                  onDeleteMember={() => onDeleteMember(item.id)}
                />
                <Divider />
              </View>
            )}
          />
        </>
      ) : (
        <View style={styles.noDataView}>
          {Array.isArray(members) ? (
            <Paragraph style={styles.noDataText}>Click Below To Add New Member</Paragraph>
          ) : (
            <ActivityIndicator color="rgb(93, 45, 150)" />
          )}
        </View>
      )}
      <AddMemberDialog
        member={memberToBeEdited}
        hideDialog={onHideAddMemberDialog}
        onSave={onSave}
        onUpdate={onUpdate}
        visible={addMemberDialogVisible}
      />
      <DeleteMemberConfirmationDialog
        visible={deleteMemberDialogVisible}
        onConfirm={onDeleteMemberDialogConfirmation}
        onDismiss={onDismissDeleteMemberDialog}
      />
      <Toast
        visible={false}
        type={showToast}
        onDismiss={onDismissSnackBar}
        message={toastText}
      />
      <FAB
        label="Add Member"
        color="white"
        icon="plus"
        uppercase
        style={styles.addMemberButton}
        onPress={() => setAddMemberDialogVisible(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  addMemberButton: {
    marginHorizontal: 8,
    marginTop: 2,
    marginBottom: 8,
    backgroundColor: 'rgb(93, 45, 150)',
  },
  noDataView: {flex: 1, justifyContent: 'center', alignItems: 'center'},

  noDataText: {color: DEFAULT_LIGHT_COLOR, fontSize: 15}
});

export default MemberListScreen;
