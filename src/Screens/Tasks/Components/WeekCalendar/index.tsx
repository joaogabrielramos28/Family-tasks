import React from 'react';
import {useTheme} from 'native-base';
import ReactNativeCalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import {ptBr} from './localeConfig';

const WeekCalendar = () => {
  const theme = useTheme();

  return (
    <ReactNativeCalendarStrip
      calendarAnimation={{type: 'parallel', duration: 30}}
      daySelectionAnimation={{
        type: 'background',
        duration: 200,
        highlightColor: theme.colors.light[50],
      }}
      style={{height: 100, paddingTop: 20, paddingBottom: 10}}
      calendarHeaderStyle={{color: 'white'}}
      dateNumberStyle={{color: 'white'}}
      dateNameStyle={{color: 'white', fontSize: 10}}
      highlightDateNumberStyle={{color: theme.colors.violet[600]}}
      highlightDateNameStyle={{color: theme.colors.violet[600]}}
      disabledDateNameStyle={{color: theme.colors.info[100]}}
      disabledDateNumberStyle={{color: theme.colors.light[300]}}
      iconContainer={{flex: 0.1}}
      iconStyle={{tintColor: theme.colors.light[50]}}
      locale={ptBr}
      scrollable={true}
      selectedDate={moment()}
    />
  );
};

export {WeekCalendar};
