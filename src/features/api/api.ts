import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {AnimalCardProps} from "../../components/animalCard/AnimalCard.tsx";


const apiUrl = 'http://localhost:3004'
export const api = createApi({
    reducerPath: apiUrl,
    baseQuery: fetchBaseQuery({baseUrl: apiUrl}),
    endpoints: (builder) => ({
        getPokemonByName: builder.query<AnimalCardProps, string>({
            query: (name) => `pokemon/${name}`,
        }),
    }),
})

// export const {useGetLoadedAnimalCards} = api

