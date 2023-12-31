import {AnimalCreateForm} from "../animalCreateForm/AnimalCreateForm.tsx";
import styles from './AnimalPage.module.css'
import {AnimalCards} from "../animalCards/AnimalCards.tsx";
import {api} from "../../utils/api.ts";
import {setLoadedAnimals} from "../../features/animalCards/loadedAnimalsSlice.ts";
import {useDispatch} from "react-redux";
import {AnimalCardProps} from "../animalCard/AnimalCard.tsx";


const animalsUrl = '/animals';
export const AnimalPage = () => {
    const dispatch = useDispatch();

    const createAnimalCard = async (name: string, pictureUrl: string) => {

        try {
            const newAnimal = {
                id: Math.random(),
                name: name,
                pictureUrl: pictureUrl,
            }

            await api.post<AnimalCardProps>(animalsUrl, newAnimal);

            const response = await api.get(animalsUrl)
            dispatch(setLoadedAnimals(response.data));
            console.log('Animals successfully sent to db', newAnimal);
        } catch (error) {
            console.error('Failed to send Animals to db', error);
        }
    }

    return (
        <div className={styles.container}>
            <AnimalCreateForm onCreate={createAnimalCard}/>
            <AnimalCards/>
        </div>
    );
};