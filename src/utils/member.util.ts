import {TableData} from '../models/table.model';
import {
  Relation,
  OxyPulseDataType,
  MemberStat,
} from '../models/member.interface';
import uuid from 'react-native-uuid';
import moment from 'moment';

export const getNewMember = (
  name: string,
  relation: Relation,
  age?: number,
) => {
  return {
    id: uuid.v4(),
    name,
    relation,
    age,
    stat: [],
  } as OxyPulseDataType;
};

export const getFormattedTableData = (stats: Array<MemberStat> = []) => {
  return stats
    .map(stat => ({
      ...stat,
      date: moment(stat.timestamp).format('DD/MM/YYYY'),
      time: moment(stat.timestamp).format('hh:mm A'),
    }))
    .map(stat => [
      stat.date,
      stat.time,
      stat.oxy_sat,
      stat.pulse_rate,
      stat.temperature,
    ]);
};

export const getMemberStatTableData = (
  data: (string | number)[][],
): TableData => {
  const headers = ['Date', 'Time', 'SP02', 'Pulse', 'Temp(ºF)'];
  const col_size = [25, 25, 20, 20, 20];
  const tableData: TableData = {
    columns: headers.map((_, index) => {
      return {
        size: col_size[index],
        rows: [headers, ...data].map((rowData, i) => {
          return {
            isHeader: i === 0,

            text: rowData[index] as string,
          };
        }),
      };
    }),
  };
  return tableData;
};
