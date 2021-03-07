import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './calendar.css';
import {Calendar} from '@ionic-native/calendar/ngx'
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Eventcalendar, getJson, toast, MbscCalendarEvent, MbscEventcalendarView } from '@mobiscroll/react';


const CalendarPage: React.FC<{events:MbscCalendarEvent[]; setEvents:Function;}> = props => {
  

  const view = React.useMemo<MbscEventcalendarView>(() => {
    return {
        calendar: { type: 'month' },
        agenda: { type: 'day' }
    };
  }, []);



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Calendar</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Calendar</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Eventcalendar
            theme="ios" 
            themeVariant="light"
            data={props.events}
            view={view}
        />
        
      </IonContent>
    </IonPage>
  );
};

export default CalendarPage;
