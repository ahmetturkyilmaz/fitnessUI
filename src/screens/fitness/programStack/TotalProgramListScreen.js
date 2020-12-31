import React, {useContext} from 'react';
import {useState} from 'react';
import {View, Text, Button, StyleSheet, SafeAreaView, FlatList,TouchableOpacity} from 'react-native';
import {AuthContext} from '../../../components/context';
import {FAB} from 'react-native-paper';
import {getAllTotalPrograms} from "../../../repository/program/program";


const TotalProgramListScreen = ({navigation}) => {

    const {signOut} = useContext(AuthContext);
    const [totalPrograms, setTotalPrograms] = useState();

    const programs = async => {
        getAllTotalPrograms(true)
            .then(response => response.data)
            .then(response => {
                if (response.data !== null) {
                    console.log(response);
                    setTotalPrograms(response.data);
                    return response;
                }
            })
    }

    const totalProgramItem = ({ item, onPress, style }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
            <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
    );
    const EmptyProgramScreen = () => (
        <View>
            There are no programs for now
        </View>
    )

    return (
        <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {totalPrograms !== null ?
                <FlatList data={programs}
                          renderItem={totalProgramItem}
                          keyExtractor={item => item.id}>

                </FlatList>
                :
                <EmptyProgramScreen/>
            }
            <Text>HomeScreen</Text>
            <Button title="Sign out" onPress={() => {
                signOut()
            }}/>
            <FAB style={styles.fab} small icon="plus" onPress={() => {
                navigation.push("OneWeekProgramScreen")
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
