import * as React from 'react';
import {StyleSheet, Text, ScrollView, View} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {TableData} from '../../models/table.model';

type TableProps = {
  data: TableData;
};

const Table = ({data}: TableProps) => {
  const {cell, header, scrollView, headerText, cellText} = styles;

  const generateTable = () => {
    return data?.columns?.map((column, index) => {
      if (column) {
        const {size, style: colStyle, rows} = column;
        return (
          <Col size={size} style={colStyle} key={`col#${index}`}>
            {rows.map((row, i) => {
              if (row) {
                const {isHeader, text, style, textStyle} = row;
                const rowStyle = style || (isHeader ? header : cell);
                const rowTextStyle =
                  textStyle || (isHeader ? headerText : cellText);
                return (
                  <Row style={rowStyle} key={`col#${index}row#${i}`}>
                    <Text style={rowTextStyle} key={`col#${index}row#${i}text`}>
                      {text || '-'}
                    </Text>
                  </Row>
                );
              }
            })}
          </Col>
        );
      }
    });
  };
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={scrollView}
        showsVerticalScrollIndicator={false}>
        <ScrollView contentContainerStyle={scrollView} horizontal>
          <Grid style={{}}>{generateTable()}</Grid>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {flexGrow: 1},
  cell: {
    borderWidth: 0.3,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  header: {
    borderWidth: 0.5,
    borderColor: '#ddd',

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
  container: {
    marginTop: 10,
    width: '100%',
    flex: 1,
    padding: 8,
    backgroundColor: '#fff',
  },
});

export default Table;
