import React from 'react';
import ReactNativeCalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import {ptBr} from './localeConfig';
import {format} from 'date-fns';
import {theme} from '../../../../theme';

interface WeekCalendarProps {
  onChangeDate: (date: string) => void;
}

const WeekCalendar = ({onChangeDate}: WeekCalendarProps) => {
  return (
    <ReactNativeCalendarStrip
      calendarAnimation={{type: 'parallel', duration: 30}}
      daySelectionAnimation={{
        type: 'background',
        duration: 200,
        highlightColor: theme.colors.title,
      }}
      style={{height: 100, paddingTop: 20, paddingBottom: 10}}
      calendarHeaderStyle={{color: 'white'}}
      dateNumberStyle={{color: 'white'}}
      dateNameStyle={{color: 'white', fontSize: 10}}
      highlightDateNumberStyle={{color: theme.colors.primary[600]}}
      highlightDateNameStyle={{color: theme.colors.primary[600]}}
      disabledDateNameStyle={{color: theme.colors.title}}
      disabledDateNumberStyle={{color: theme.colors.text}}
      iconContainer={{flex: 0.1}}
      iconStyle={{tintColor: theme.colors.title}}
      locale={ptBr}
      scrollable={true}
      selectedDate={moment()}
      onDateSelected={date =>
        onChangeDate(format(new Date(String(date)), 'dd/MM/yyyy'))
      }
    />
  );
};

export {WeekCalendar};
