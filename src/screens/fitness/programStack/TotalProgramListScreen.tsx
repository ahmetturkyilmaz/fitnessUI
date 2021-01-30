import React, {useContext, useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {AuthContext} from '../../../components/context';
import {FAB} from 'react-native-paper';
import {totalProgramsNetwork} from '../../../repository/program/program';
import {TotalProgram} from "../../../model/TotalProgram";

const TotalProgramListScreen = ({navigation}) => {
  const totalPrograms:TotalProgram = {};
  const {signOut} = useContext(AuthContext);
  const [programList, setProgramList] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    totalProgramsNetwork
      .getAll()
      .then((data) => {
        setProgramList(data);
      })
      .finally(() => {
        console.log(programList)
        setLoading(false)
      });
  }, []);

  const onPress = (totalProgram:TotalProgram) => {
    navigation.navigate('OneWeekProgramScreen', {
      totalProgram: totalProgram,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading && <Text style={styles.loading}>loading...</Text>}
      <FlatList
        style={styles.list}
        data={programList}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => onPress(item)}
            style={[styles.item]}>
            <Text style={styles.title}>{item.programName}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => `key = ${item.id}`}
      />
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => {
          navigation.navigate('OneWeekProgramScreen', {
            totalProgram: null,
          });
        }}
      />
      <FAB style={styles.signOut} small icon="logout" onPress={signOut}/>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    width: '100%',
  },
  loading: {
    paddingVertical: 50,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 50,
    height: 40,
  },
  signOut: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    height: 40,
    backgroundColor: 'red',
  },
  item: {
    backgroundColor: '#FFF',
    width: '100%',
    paddingVertical: 10,
    margin: 1,
    paddingLeft: 10,
  },
  title: {
    width: '100%',
    fontSize: 20,
  },
});
export default TotalProgramListScreen;
