import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AnimalCardProps} from "../../components/animalCard/AnimalCard.tsx";

export interface LoadedAnimalsState {
    value: AnimalCardProps[];
}

const initialState: LoadedAnimalsState = {
    value: [],
};

export const loadedAnimalsReducer = createSlice({
    name: 'animal',
    initialState,
    reducers: {
        setLoadedAnimals: (state, action: PayloadAction<AnimalCardProps[]>) => {
            state.value = action.payload;
        },
    },
});

export const {setLoadedAnimals} = loadedAnimalsReducer.actions;

export default loadedAnimalsReducer.reducer;
