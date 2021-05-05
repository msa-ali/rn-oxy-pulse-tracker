import * as React from 'react';
import {StyleSheet} from 'react-native';
import {List, Avatar} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';

import {Member} from '../models/member.interface';
import MenuComponent from './ui/Menu';

type MemberTileProps = {
  member: Member;
  onPress: any;
  onEditMember: () => void;
  onDeleteMember: () => void;
};

const MemberTile = ({
  member,
  onPress,
  onDeleteMember,
  onEditMember,
}: MemberTileProps) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const {name, relation, id} = member;
  const {capitalizeText} = styles;
  const avatarTitle =
    name
      ?.toUpperCase()
      ?.split(' ')
      ?.map(text => text?.charAt(0) ?? '')
      ?.join('') ?? '';
  return (
    <List.Item
      key={id}
      title={name}
      titleStyle={styles.listTitleStyle}
      description={relation}
      descriptionStyle={[capitalizeText, styles.listDescriptionStyle]}
      onPress={onPress}
      rippleColor="rgba(93, 45, 150, 0.2)"
      left={() => (
        <Avatar.Text
          label={avatarTitle}
          size={50}
          labelStyle={styles.avatarLabel}
          style={styles.avatarStyle}
        />
      )}
      right={() => (
        <MenuComponent
          visible={showMenu}
          onDismiss={() => setShowMenu(false)}
          anchor={
            <Entypo
              name="dots-three-vertical"
              size={24}
              color="grey"
              style={styles.menuIcon}
              onPress={() => setShowMenu(true)}
            />
          }
          items={[
            {
              id: 'edit_member',
              title: 'Edit Member',
              onPress: () => {
                setShowMenu(false);
                onEditMember();
              },
              icon: 'pencil-outline',
            },
            {
              id: 'delete_member',
              title: 'Delete Member',
              onPress: () => {
                setShowMenu(false);
                onDeleteMember();
              },
              icon: 'delete',
              titleStyle: {},
            },
          ]}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  capitalizeText: {
    textTransform: 'capitalize',
  },
  menuIcon: {marginTop: 15, marginRight: 20},
  listTitleStyle: {marginLeft: 10, fontSize: 16},
  listDescriptionStyle: {marginLeft: 10},
  avatarLabel: {fontSize: 18},
  avatarStyle: {backgroundColor: 'rgb(93, 45, 150)'},
});

export default MemberTile;
