import React, {useState, useEffect} from 'react';
import {FlatList, Text, TouchableOpacity, SafeAreaView, View, StyleSheet} from 'react-native';
import {DataTable} from 'react-native-paper';


class DataTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {data, titles, childData} = this.props;

    const tableTitles = titles.map((title) =>
      <DataTable.Title key={title}>
        {title}
      </DataTable.Title>
    )
    const tableData = data.map(data => {

        return (
          <DataTable.Row key={data.id}>
            <DataTable.Cell>data.number</DataTable.Cell>
            <DataTable.Cell>data.name</DataTable.Cell>
            <DataTable.Cell>data.sets</DataTable.Cell>
            {Object.entries(childData).map(([key, value]) => {
                return (
                  <>
                    <DataTable.Cell>{key}</DataTable.Cell>
                    <DataTable.Cell>{value}</DataTable.Cell>
                  </>
                )
              }
            )}
          </DataTable.Row>
        )
      }
    );
    return (
      <View>
        <DataTable>
          <DataTable.Header>
            {tableTitles}
          </DataTable.Header>

        </DataTable>
      </View>
    );
  }

}
export default DataTable;