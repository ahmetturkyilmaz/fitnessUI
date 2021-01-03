import React, {useState, useEffect} from 'react';
import {FlatList, Text, TouchableOpacity, SafeAreaView, View, StyleSheet} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import {totalPrograms, weeklyPrograms} from '../../../repository/program/program';
import DataTable from "../../../components/DataTable";


const OneWeekProgramScreen = ({route, navigation}) => {
  const {totalProgram} = route.params;
  const [allWeeklyPrograms, setAllWeeklyProgram] = useState({});
  const [activeSections, setActiveSections] = useState([2, 0]);
  useEffect(() => {
    if (totalProgram == null) {
      console.log("totalProgram null")
      totalPrograms
        .post({
          programName: "New Program",
          programWeekType: 'ONE_WEEK',
          weeklyPrograms: [
            {
              name: "New Week",
            }
          ]
        }).then(data => {

      })
    } else {

      if (totalProgram.weeklyPrograms == null) {
        weeklyPrograms
          .getAllByTotalProgramId(totalProgram.id)
          .then(data => {
            if (data !== null) {
              console.log("weeklyProgramsCalled")
              setAllWeeklyProgram(data);
            }
          })
      } else {
        console.log("totalProgram.weeklyPrograms", totalProgram.weeklyPrograms[0].dailyProgram[0].moveSet)
        setAllWeeklyProgram(totalProgram.weeklyPrograms)
      }
    }
  }, [allWeeklyPrograms])

  const dataToRender = (dayOfWeek) => {
    console.log("dayofweek", dayOfWeek)
    if (allWeeklyPrograms && allWeeklyPrograms.length > 0) {
      let programOfDay;
      let oneWeekProgram = allWeeklyPrograms[0];
      let dailyPrograms = oneWeekProgram.dailyProgram;

      for (let oneDayProgram of dailyPrograms) {
        if (oneDayProgram.dayOfWeek === dayOfWeek) {
          programOfDay = oneDayProgram;
          console.log("programOfDay", programOfDay)
        }
      }
      if (typeof programOfDay !== 'undefined' && typeof programOfDay.moveSet !== 'undefined') {
        console.log("PROGRAMMMM", programOfDay.moveSet)
        return programOfDay.moveSet
      }
    }
    return [];
  }
  const SECTIONS = [
    {
      title: 'MONDAY',
      content: dataToRender('MONDAY'),
    },
    {
      title: 'TUESDAY',
      content: dataToRender('TUESDAY'),
    }, {
      title: 'WEDNESDAY',
      content: dataToRender('WEDNESDAY'),
    }, {
      title: 'THURSDAY',
      content: dataToRender('THURSDAY'),
    }, {
      title: 'FRIDAY',
      content: dataToRender('FRIDAY'),
    }, {
      title: 'SATURDAY',
      content: dataToRender('SATURDAY'),
    },
    {
      title: 'SUNDAY',
      content: dataToRender('SUNDAY'),
    },
  ];


  const renderSectionTitle = section => {
    return (
      <View style={styles.content}>
      </View>
    );
  };

  const renderHeader = (section, index, isActive, sections) => {
    return (
      <Animatable.View
        duration={300}
        transition="backgroundColor"
        style={{backgroundColor: (isActive ? 'rgba(255,255,255,1)' : 'rgba(245,252,255,1)')}}>
        <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  }

  const renderContent = (section, i, isActive, sections) => {
    return (
      <Animatable.View
        duration={300}
        transition="backgroundColor"
        style={{backgroundColor: (isActive ? 'rgba(255,255,255,1)' : 'rgba(245,252,255,1)')}}>
        {section.content.length > 0 ?
          <Animatable.Text
            duration={300}
            easing="ease-out"
            animation={isActive ? 'zoomIn' : null}>
          <DataTable data={section.content} >

          </DataTable>
          </Animatable.Text>
          :
          <Icon.Button name="plus-circle" size={30} color="#900"
                       onPress={() => {
                         navigation.navigate("EditDailyProgramScreen")
                       }}/>
        }
      </Animatable.View>
    );
  }

  const updateSections = activeSections => {
    setActiveSections(activeSections);
  };

  return (
    <SafeAreaView>
      <Accordion
        sections={SECTIONS}
        onChange={updateSections}
        renderHeader={renderHeader}
        renderSectionTitle={renderSectionTitle}
        activeSections={activeSections}
        renderContent={renderContent}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    content: {},
    headerText: {}
  }
)

export default OneWeekProgramScreen;