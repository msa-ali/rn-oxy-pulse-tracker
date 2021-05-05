import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export interface TableRow {
  style?: StyleProp<ViewStyle>;
  text: string;
  textStyle?: StyleProp<TextStyle>;
  isHeader: boolean;
}

export interface TableColumn {
  size?: number;
  style?: StyleProp<ViewStyle>;
  rows: Array<TableRow>;
}

export interface TableData {
  columns: Array<TableColumn>;
}
