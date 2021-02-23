import { IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonRow } from '@ionic/react';
import React from 'react';


const AddTimer: React.FC = () => {

    return (
        
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel  position="floating"> How many stage is this brew?</IonLabel>
                            <IonInput  type="number"></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
            </IonGrid>
        
    );
};

export default AddTimer;