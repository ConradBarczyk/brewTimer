import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonGrid, IonItem, IonInput, IonLabel, IonRange, IonButton, IonAlert, useIonViewWillEnter } from '@ionic/react';
import { useRef, useState } from 'react';
import {Timer} from '../hooks/TimerService';
import './addBrew.css';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Datepicker } from '@mobiscroll/react';
import { Eventcalendar, getJson, toast, MbscCalendarEvent, MbscEventcalendarView } from '@mobiscroll/react';
// JSON file with data

// importing sqlite plugins
import {Plugins, Capacitor} from '@capacitor/core';
import {SQLiteConnection} from '@capacitor-community/sqlite';
const {CapacitorSQLite} = Plugins;

const mSQLite = new SQLiteConnection(CapacitorSQLite);

const AddBrew: React.FC<{events:MbscCalendarEvent[]; setEvents:Function;}> = props => {
  const [database, setDatabase] = useState<any>(null);
  const [queryResults, setQueryResults] = useState<any>(null);


  // setting up states
  const [stage, setStage] = useState<number>(1);
  const [msg, setMsg] = useState<string>();
  const [error, setError] = useState<string>();

  const [stageOneDates, setStageOneDates] = useState<Date[]>();
  const [stageTwoDates, setStageTwoDates] = useState<Date[]>();
  const [stageThreeDates, setStageThreeDates] = useState<Date[]>();
  const [stageFourDates, setStageFourDates] = useState<Date[]>();
  const [stageFiveDates, setStageFiveDates] = useState<Date[]>();


  const timers: Timer[] = [];
  // setting up refs for inputs
  const nameInputRef = useRef<HTMLIonInputElement>(null);

  
  // Handlers for each stage calender!
  const onStageOneChange = (ev:any) => {
    setStageOneDates(ev.value);
  }
  const onStageTwoChange = (ev:any) => {
    setStageTwoDates(ev.value);
  }
  const onStageThreeChange = (ev:any) => {
    setStageThreeDates(ev.value);
  }
  const onStageFourChange = (ev:any) => {
    setStageFourDates(ev.value);
  }
  const onStageFiveChange = (ev:any) => {
    setStageFiveDates(ev.value);
  }



  // Action Listener that will add the brew to the calendar!
  const addBrew = () => {
    const enteredName = nameInputRef.current!.value!;
    let name = '';
    let newEvents:MbscCalendarEvent[] = props.events;
    if(!enteredName || !stageOneDates) {
      setError('Please enter all inputs');
      return;
    } else {
      name = enteredName.toString();
      let stageOneEvent:MbscCalendarEvent = {
        start:stageOneDates[0],
        end:stageOneDates[1],
        title:name +' Stage One'
      }
      newEvents.push(stageOneEvent);
      if(stage >= 2 && stageTwoDates){
        let stageTwoEvent:MbscCalendarEvent = {
          start:stageTwoDates[0],
          end:stageTwoDates[1],
          title:name +' Stage Two'
        }
        newEvents.push(stageTwoEvent);
      }
      if(stage >= 3 && stageThreeDates){
        let stageThreeEvent:MbscCalendarEvent = {
          start:stageThreeDates[0],
          end:stageThreeDates[1],
          title:name +' Stage Three'
        }
        newEvents.push(stageThreeEvent);
      }
      if(stage >= 4 && stageFourDates){
        let stageFourEvent:MbscCalendarEvent = {
          start:stageFourDates[0],
          end:stageFourDates[1],
          title:name +' Stage Four'
        }
        newEvents.push(stageFourEvent);
      }
      if(stage >= 5 && stageFiveDates){
        let stageFiveEvent:MbscCalendarEvent = {
          start:stageFiveDates[0],
          end:stageFiveDates[1],
          title:name +' Stage Two'
        }
        newEvents.push(stageFiveEvent);
      }
      props.setEvents(newEvents);
      console.log(props.events);
    }

  }
  // Resets brew inputs
  const resetBrew = () => {
    nameInputRef.current!.value = '';
    if(stage >= 2){
      
    }
    if(stage >= 3){
      
    }
    if(stage >= 4){
      
    }
    if(stage >= 5){
      
    }
  }

  const clearMsg = () => {
    setMsg('');
  }
  const clearError = () => {
    setError('');
  }

  const confirmAdd = () => {
    
  }


  return (
    <React.Fragment>
      <IonAlert isOpen={!!msg} message={msg} buttons={[{text:'Cancel',role: 'cancel',handler: clearMsg},{text:'Add',handler: confirmAdd}]} />
      <IonAlert isOpen={!!error} message={error} buttons={[{text:'Okay',role: 'cancel',handler: clearError}]} />
      <IonPage>
        <IonHeader>
          <IonToolbar color="warning">
            <IonTitle>Add Brew</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className="ion-padding">
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Add Brew</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Brew Name</IonLabel>
                  <IonInput required type="text" ref={nameInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel  position="floating"> How many stages is this brew?</IonLabel>
                    <IonRange min={1} max={5} step={1} snaps={true} color="secondary" onIonChange={e => setStage(e.detail.value as number)}>
                      <IonLabel slot="start">1</IonLabel>
                      <IonLabel slot="end">5</IonLabel>
                    </IonRange>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel>Select the start and end of each stage:</IonLabel>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                  <IonLabel>Stage 1</IonLabel>
                  <Datepicker
                    id={1}
                    controls={['calendar']}
                    display='inline'
                    select="range"
                    rangeHighlight={true}
                    showRangeLabels={true}
                    value={stageOneDates}
                    onChange={onStageOneChange}
                  />
              </IonCol>
            </IonRow>
            {stage >= 2 ? (
              <IonRow>
                <IonCol>
                    <IonLabel position="floating">Stage 2</IonLabel>
                    <Datepicker 
                    id={2}
                    controls={['calendar']}
                    display='inline'
                    select="range"
                    rangeHighlight={true}
                    showRangeLabels={true}
                    value={stageTwoDates}
                    onChange={onStageTwoChange}
                  />
                </IonCol>
              </IonRow>
            ):(<></>)}
            {stage >= 3 ? (
              <IonRow>
              <IonCol>
                  <IonLabel position="floating">Stage 3</IonLabel>
                  <Datepicker
                  id={3} 
                  controls={['calendar']}
                  display='inline'
                  select="range"
                  rangeHighlight={true}
                  showRangeLabels={true}
                  value={stageThreeDates}
                    onChange={onStageThreeChange}
                  
                />
              </IonCol>
            </IonRow>
            ):(<></>)}
            {stage >= 4 ? (
              <IonRow>
              <IonCol>
                  <IonLabel position="floating">Stage 4</IonLabel>
                  <Datepicker
                  id={4}  
                  controls={['calendar']}
                  display='inline'
                  select="range"
                  rangeHighlight={true}
                  showRangeLabels={true}
                  value={stageFourDates}
                    onChange={onStageFourChange}
                />
              </IonCol>
            </IonRow>
            ):(<></>)}
            {stage >= 5 ? (
              <IonRow>
              <IonCol>
                  <IonLabel position="floating">Stage 5</IonLabel>
                  <Datepicker
                  id={5}  
                  controls={['calendar']}
                  display='inline'
                  select="range"
                  rangeHighlight={true}
                  showRangeLabels={true}
                  value={stageFiveDates}
                  onChange={onStageFiveChange}
                />
              </IonCol>
            </IonRow>
            ):(<></>)}
            <IonRow>
              <IonCol className="ion-text-left">
                <IonButton onClick={addBrew}>
                  Add Brew
                </IonButton>
              </IonCol>
              <IonCol className="ion-text-right">
                <IonButton onClick={resetBrew}>
                  Reset
                </IonButton>
              </IonCol>
            </IonRow>

          </IonGrid>
        </IonContent>
      </IonPage>
    </React.Fragment>
  );
};

export default AddBrew;
