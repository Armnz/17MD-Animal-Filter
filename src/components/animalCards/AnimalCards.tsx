import styles from './AnimalCards.module.css'
import {AnimalCard, AnimalCardProps} from "../animalCard/AnimalCard.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store.ts";
import {api} from '../../utils/api.ts'
import {useEffect, useState} from "react";
import {setLoadedAnimals} from "../../features/animalCards/loadedAnimalsSlice.ts";
import {Sort} from "../sort/Sort.tsx";


const animalsUrl = '/animals'
export const AnimalCards = () => {
    const dispatch = useDispatch()
    const loadedAnimals: AnimalCardProps[] = useSelector((state: RootState) => state.loadedAnimals.value)
    // const {data, error, isLoading} = useGetLoadedAnimalCards();


    const [isAnimalsLoaded, setIsAnimalsLoaded] = useState(false);

    const getAllAnimals = async () => {
        setIsAnimalsLoaded(false);
        try {
            const response = await api.get<AnimalCardProps[]>(animalsUrl);
            dispatch(setLoadedAnimals(response.data));
            setIsAnimalsLoaded(true);
            console.log('Animals successfully loaded from db', response.data);
        } catch (error) {
            console.error('Failed to load Animals from db', error);
        }
    }

    const getCardsSortedAlphabetical = async (sortForwardDirection: boolean) => {
        let animalUrlToSort;

        sortForwardDirection ? animalUrlToSort = `${animalsUrl}?_sort=name&_order=asc` : animalUrlToSort = `${animalsUrl}?_sort=name&_order=desc`;

        console.log(animalUrlToSort);

        try {
            const response = await api.get<AnimalCardProps[]>(animalUrlToSort);
            dispatch(setLoadedAnimals(response.data));
            console.log('Animals successfully loaded from db', response.data);
        } catch (error) {
            console.error('Failed to load Animals from db', error);
        }
    }

    const editAnimalCard = (id: number) => {
        console.log(id);
    }

    const deleteAnimalCard = async (id: number) => {
        const urlToDelete = `${animalsUrl}/${id}`;

        try {
            const result = await api.delete(urlToDelete);
            const response = await api.get(animalsUrl)
            dispatch(setLoadedAnimals(response.data));
            console.log('Successfully deleted Animal Card ', result);
        } catch (error) {
            console.error('Failed to delete Animal Card ', error);
        }
    };

    useEffect(() => {
        if (!loadedAnimals.length) {
            getAllAnimals();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.container}>
            <Sort
                onSort={getCardsSortedAlphabetical}
            />

            {!isAnimalsLoaded && <p> Loading... </p>}
            {!loadedAnimals.length && isAnimalsLoaded && <p> There are no existing Animals! </p>}

            <div className={styles.cardContainer}>
                {loadedAnimals.map(({id, name, pictureUrl}) => (
                    <AnimalCard
                        id={id}
                        key={id}
                        name={name}
                        pictureUrl={pictureUrl}
                        onEdit={editAnimalCard}
                        onDelete={deleteAnimalCard}
                    />
                ))}
            </div>
        </div>
    );
};

