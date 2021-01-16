import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, SafeAreaView, View, StyleSheet} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import {totalPrograms} from '../../../repository/program/program';
import CustomizableDataTable from "../../../components/CustomizableDataTable";
import {getMoveSetByDay, initializingTotalProgramData} from "./programStackUtil";


const OneWeekProgramScreen = ({route, navigation}) => {
  const {totalProgram} = route.params;
  const [allWeeklyPrograms, setAllWeeklyProgram] = useState({});
  const [activeSections, setActiveSections] = useState([2, 0]);
  const [currentTotalProgram, setCurrentTotalProgram] = useState();

  useEffect(() => {
    if (totalProgram == null) {
      console.log("totalProgram null")
      totalPrograms
        .post(initializingTotalProgramData)
        .then(data => {
        console.log(data)
        setCurrentTotalProgram(data);
        setAllWeeklyProgram(data.weeklyPrograms)
      })
    } else {
      console.log("totalProgram not null",totalProgram)
      setCurrentTotalProgram(totalProgram);
      setAllWeeklyProgram(totalProgram.weeklyPrograms)
    }
    if (route.params?.newTotalProgram){
      setCurrentTotalProgram(route.params?.newTotalProgram);
    }
  }, [route.params?.newTotalProgram])


  const SECTIONS = [
    {
      title: 'MONDAY',
      content: getMoveSetByDay(allWeeklyPrograms, 'MONDAY'),
    },
    {
      title: 'TUESDAY',
      content: getMoveSetByDay(allWeeklyPrograms, 'TUESDAY'),
    }, {
      title: 'WEDNESDAY',
      content: getMoveSetByDay(allWeeklyPrograms, 'WEDNESDAY'),
    }, {
      title: 'THURSDAY',
      content: getMoveSetByDay(allWeeklyPrograms, 'THURSDAY'),
    }, {
      title: 'FRIDAY',
      content: getMoveSetByDay(allWeeklyPrograms, 'FRIDAY'),
    }, {
      title: 'SATURDAY',
      content: getMoveSetByDay(allWeeklyPrograms, 'SATURDAY'),
    },
    {
      title: 'SUNDAY',
      content: getMoveSetByDay(allWeeklyPrograms, 'SUNDAY'),
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
        {section.content !== null ?
          <TouchableOpacity
            onPress={() => onPressSection(navigation, currentTotalProgram, section.title, section.content)}>
            <Animatable.Text
              duration={300}
              easing="ease-out"
              animation={isActive ? 'zoomIn' : null}>
              <CustomizableDataTable data={section.content} titles={["no", "name", "sets"]}/>
            </Animatable.Text>
          </TouchableOpacity>
          :
          <Icon.Button name="plus-circle" size={30} color="#900"
                       onPress={() => onPressSection(navigation, currentTotalProgram, section.title, [])}/>
        }
      </Animatable.View>
    );
  }
  const onPressSection = (navigation, currentTotalProgram, day, content) => {
    navigation.navigate("EditDailyProgramScreen", {
      totalProgram: currentTotalProgram,
      day: day,
      moveSet: content,
    })
  }

  const updateSections = activeSections => {
    setActiveSections(activeSections);
  }

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

const styles = StyleSheet.create(
  {
    content: {},
    headerText: {}
  }
)

export default OneWeekProgramScreen;