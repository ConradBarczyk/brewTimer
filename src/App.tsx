import React from 'react';
import {MbscCalendarEvent} from '@mobiscroll/react';

import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { addCircle, calendar, home } from 'ionicons/icons';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

import '@mobiscroll/react/dist/css/mobiscroll.min.css';




/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Home from './pages/home';
import Calendar from './pages/calendarPage';
import AddBrew from './pages/addBrew';
import { useState } from 'react';

const App: React.FC = () => {
  const [events, setEvents] = React.useState<MbscCalendarEvent[]>([{
    start: new Date(2021, 2, 6, 8, 0),
    end: new Date(2021, 2, 18, 17, 0),
    title: 'Test Brew Stage One'
  }, {
    start: new Date(2020, 2, 18, 9, 0),
    end: new Date(2020, 2, 20, 13, 0),
    title: 'My Second Event'
  }]);

  return (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/calendarPage">
            <Calendar events={events} setEvents={setEvents} />
          </Route>
          <Route path="/addBrew">
            <AddBrew events={events} setEvents={setEvents}/>
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="calendar" href="/calendarPage">
            <IonIcon icon={calendar} />
            <IonLabel>Calendar</IonLabel>
          </IonTabButton>
          <IonTabButton tab="addBrew" href="/addBrew">
            <IonIcon icon={addCircle} />
            <IonLabel>Add Brew</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
)};

export default App;
