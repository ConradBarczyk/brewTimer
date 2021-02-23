import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import AddTimer from '../components/AddTimer';
import ExploreContainer from '../components/ExploreContainer';
import './addBrew.css';

const AddBrew: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="warning">
          <IonTitle>Add Brew</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Add Brew</IonTitle>
          </IonToolbar>
        </IonHeader>
        <AddTimer />
        
      </IonContent>
    </IonPage>
  );
};

export default AddBrew;
