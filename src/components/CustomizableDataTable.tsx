import React from 'react';
import {View,} from 'react-native';
import {DataTable} from 'react-native-paper';
import {MoveSet} from '../types/program/MoveSet';

const CustomizableDataTable = (props: { data: MoveSet[]; titles: string[]; childData: any; }) => {
    const tableTitles = props.titles.map((title) => (
      <DataTable.Title key={title}>{title}</DataTable.Title>
    ));
    const tableData = props.data.map((data) => {
        return (
          <DataTable.Row key={data.moveNumber}>
              <DataTable.Cell>{data.name}</DataTable.Cell>
              <DataTable.Cell>{data.sets}</DataTable.Cell>
              {/*            {Object.entries(childData).map(([key, value]) => {
                return (
                  <>
                    <DataTable.Cell>{key}</DataTable.Cell>
                    <DataTable.Cell>{value}</DataTable.Cell>
                  </>
                )
              }
            )}*/}
          </DataTable.Row>
        );
    });
    return (
      <View>
          <DataTable>
              <DataTable.Header>{tableTitles}</DataTable.Header>
              {tableData}

              <DataTable.Pagination
                page={1}
                numberOfPages={3}
                onPageChange={(page) => {
                    console.log(page);
                }}
                label="1-2 of 6"
              />
          </DataTable>
      </View>
    );
};

export default CustomizableDataTable;
