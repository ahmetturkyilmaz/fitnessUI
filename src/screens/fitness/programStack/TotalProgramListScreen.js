import React, {useContext, useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, SafeAreaView, FlatList, TouchableOpacity} from 'react-native';
import {AuthContext} from '../../../components/context';
import {FAB} from 'react-native-paper';
import {getAllTotalPrograms, totalPrograms} from "../../../repository/program/program";


const TotalProgramListScreen = ({navigation}) => {

  const {signOut} = useContext(AuthContext);
  const [programList, setProgramList] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    totalPrograms
      .getAll()
      .then(data => {
        if (data !== null) {
          console.log(data);
          setProgramList(data);
          setLoading(false);
          return data;
        }
      })
  }, [])
  const onPress = (item) => {
    console.log('basıldı')
    navigation.navigate("OneWeekProgramScreen", {
      totalProgram: item
    })
  }
  const totalProgramItem = ({item, style}) => (
    <TouchableOpacity onPress={() => onPress(item)} style={[styles.item, style]}>
      <Text style={styles.title}>{item.programName}</Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {loading && (
        <Text>loading...</Text>
      )}
      <FlatList
        data={programList}
        renderItem={totalProgramItem}
        keyExtractor={item => `key = ${item.id}`}/>

      <Text>HomeScreen</Text>
      <Button title="Sign out" onPress={() => {
        signOut()
      }}/>
      <FAB style={styles.fab} small icon="plus" onPress={() => {
        navigation.navigate("OneWeekProgramScreen", {
          totalProgram: null
        })
      }}/>
    </SafeAreaView>
  );

}
const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})
export default TotalProgramListScreen;
