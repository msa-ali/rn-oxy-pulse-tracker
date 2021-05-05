import * as React from 'react';
import {StyleProp, TextStyle} from 'react-native';
import {Menu, Divider} from 'react-native-paper';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';

type MenuItemType = {
  id: string;
  title: string;
  onPress: (...props: any[]) => void;
  icon?: IconSource | undefined;
  titleStyle?: StyleProp<TextStyle>;
};

type MenuProps = {
  visible: boolean;
  onDismiss: () => void;
  anchor: React.ReactNode;
  items: Array<MenuItemType>;
};

const MenuComponent = ({visible, onDismiss, anchor, items = []}: MenuProps) => {
  return (
    <Menu visible={visible} onDismiss={onDismiss} anchor={anchor}>
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          <Menu.Item
            key={item.id}
            icon={item.icon}
            onPress={item.onPress}
            title={item.title}
            titleStyle={item.titleStyle}
          />
          {index !== items.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </Menu>
  );
};

export default MenuComponent;
