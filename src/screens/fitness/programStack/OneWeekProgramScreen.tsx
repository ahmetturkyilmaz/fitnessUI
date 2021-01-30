import React, {useState, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import {totalProgramsNetwork} from '../../../repository/program/program';
import CustomizableDataTable from '../../../components/CustomizableDataTable';
import {
  getMoveSetByDay,
} from './programStackUtil';
import {Button, DefaultTheme} from 'react-native-paper';
import {initializingTotalProgramData} from "../../../model/DefaultProgram";

const OneWeekProgramScreen = ({route, navigation}) => {
  const {totalProgram} = route.params;
  const [allWeeklyPrograms, setAllWeeklyProgram] = useState({});
  const [activeSections, setActiveSections] = useState([0]);
  const [currentTotalProgram, setCurrentTotalProgram] = useState();

  useEffect(() => {
    if (totalProgram == null) {
      console.log('totalProgram null');
      totalProgramsNetwork.post(initializingTotalProgramData).then((data) => {
        console.log(data);
        setCurrentTotalProgram(data);
        setAllWeeklyProgram(data.weeklyPrograms);
      });
    } else {
      console.log('totalProgram not null', totalProgram);
      setCurrentTotalProgram(totalProgram);
      setAllWeeklyProgram(totalProgram.weeklyPrograms);
    }
    if (route.params?.newTotalProgram) {
      setCurrentTotalProgram(route.params?.newTotalProgram);
    }
  }, []);

  const SECTIONS = [
    {
      title: 'MONDAY',
      content: getMoveSetByDay(allWeeklyPrograms, 'MONDAY'),
    },
    {
      title: 'TUESDAY',
      content: getMoveSetByDay(allWeeklyPrograms, 'TUESDAY'),
    },
    {
      title: 'WEDNESDAY',
      content: getMoveSetByDay(allWeeklyPrograms, 'WEDNESDAY'),
    },
    {
      title: 'THURSDAY',
      content: getMoveSetByDay(allWeeklyPrograms, 'THURSDAY'),
    },
    {
      title: 'FRIDAY',
      content: getMoveSetByDay(allWeeklyPrograms, 'FRIDAY'),
    },
    {
      title: 'SATURDAY',
      content: getMoveSetByDay(allWeeklyPrograms, 'SATURDAY'),
    },
    {
      title: 'SUNDAY',
      content: getMoveSetByDay(allWeeklyPrograms, 'SUNDAY'),
    },
  ];

  const renderSectionTitle = (section) => {
    return <View style={styles.content}/>;
  };

  const renderHeader = (section, index, isActive, sections) => {
    return (
      <Animatable.View
        duration={300}
        transition="backgroundColor"
        style={{
          backgroundColor: isActive ? DefaultTheme.colors.primary : '#f1f1f1',

          borderBottomColor: isActive ? '#5109b5' : '#e1e1e1',
          borderBottomWidth: 2,
          paddingHorizontal: 8,
          paddingVertical: 16,
          // backgroundColor: isActive
          //   ? 'rgba(255,255,255,1)'
          //   : 'rgba(245,252,255,1)',
        }}>
        <Text
          style={{
            color: isActive ? '#fff' : '#333',
            fontWeight: 'bold',
          }}>
          {section.title}
        </Text>
      </Animatable.View>
    );
  };

  const renderContent = (section, i, isActive, sections) => {
    return (
      <Animatable.View
        duration={300}
        transition="backgroundColor"
        style={{
          paddingHorizontal: 8,
          paddingVertical: 8,
          backgroundColor: isActive ? '#f5ecff' : '#f1f1f1',
        }}>
        {section.content !== null ? (
          <View>
            <CustomizableDataTable
              data={section.content}
              titles={['Name', 'Sets']}
            />
            <Button
              mode="outlined"
              onPress={() => onPressSection(section.title, section.content)}>
              Edit Program
            </Button>
          </View>
        ) : (
          <View style={{minHeight: 50}}>
            <Button
              icon="plus-circle"
              mode="outlined"
              onPress={() => onPressSection(section.title, [])}>
              Create Program
            </Button>
          </View>
        )}
      </Animatable.View>
    );
  };
  const onPressSection = (day, content) => {
    navigation.navigate('EditDailyProgramScreen', {
      totalProgram: currentTotalProgram,
      day: day,
      moveSet: content,
    });
  };

  const updateSections = (item) => {
    setActiveSections(item);
  };

  return (
    <SafeAreaView>
      <Accordion
        sections={SECTIONS}
        onChange={updateSections}
        renderHeader={renderHeader}
        renderSectionTitle={renderSectionTitle}
        activeSections={activeSections}
        renderContent={renderContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {},
  headerText: {},
});

export default OneWeekProgramScreen;
