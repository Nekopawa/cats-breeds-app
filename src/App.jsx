import { useEffect, useReducer } from "react";
import "./App.css";
import BreedList from "./components/BreedList";
import Filter from "./components/Filter";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import {
    ACTION_TYPES,
    init,
    INITIAL_STATE,
    reducer,
} from "./reducer/breedsReducer";

function App() {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE, init);

    function handleToggleFavorite(breedId) {
        const favorite = state.breeds.find((breed) => breed.id === breedId);
        dispatch({ type: ACTION_TYPES.TOGGLE_FAVORITE, payload: favorite });
    }

    useEffect(() => {
        async function fetchData() {
            try {
                dispatch({ type: ACTION_TYPES.SEARCH_START });

                const response = await fetch(
                    "https://api.thecatapi.com/v1/breeds",
                );

                if (!response.ok) {
                    throw Error("Error fetching the API.");
                }

                const data = await response.json();
                const breeds = data.map((breed) => {
                    return {
                        id: breed.id,
                        name: breed.name,
                        origin: breed.origin,
                        lifeSpan: breed.life_span,
                        affection: breed.affection_level,
                        energy: breed.energy_level,
                        adaptability: breed.adaptability,
                        temperament: breed.temperament,
                        description: breed.description,
                        wikipedia: breed.wikipedia_url,
                        image: breed.reference_image_id,
                    };
                });

                dispatch({
                    type: ACTION_TYPES.SEARCH_SUCCESS,
                    payload: breeds,
                });
            } catch (error) {
                dispatch({
                    type: ACTION_TYPES.SEARCH_ERROR,
                    error: error.message,
                });
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <Header />
            <Filter />
            <BreedList
                breeds={state.breeds}
                loading={state.loading}
                error={state.error}
                favorites={state.favorites}
                onToggleFavorite={handleToggleFavorite}
            />
            <Navbar />
        </>
    );
}

export default App;
