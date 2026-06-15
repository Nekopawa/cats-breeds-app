import { useEffect, useReducer, useRef } from "react";
import "./App.css";
import BreedList from "./components/BreedList";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import {
    APP_ACTION_TYPES,
    init,
    INITIAL_STATE,
    reducer,
} from "./reducer/breedsReducer";
import FavoritesList from "./components/FavoritesList";
import BreedDetails from "./components/BreedDetails";
import {
    FILTER_ACTION_TYPES,
    FILTER_INITIAL_STATE,
    filterReducer,
} from "./reducer/filterReducer";

function App() {
    const [appState, appDispatch] = useReducer(reducer, INITIAL_STATE, init);
    const [filterState, filterDispatch] = useReducer(
        filterReducer,
        FILTER_INITIAL_STATE,
    );
    const previousScrollY = useRef(0);

    //gets all unique temperaments
    const temperamentList = [
        ...new Set(
            appState.breeds.flatMap(
                (breed) =>
                    breed.temperament
                        ?.split(",")
                        .map((temperament) =>
                            temperament.toLowerCase().trim(),
                        ) ?? [],
            ),
        ),
    ].sort();

    //gets all unique origins
    const originList = [
        ...new Set(
            appState.breeds.map((breed) =>
                breed.origin?.toLowerCase().trim(),
            ) ?? [],
        ),
    ].sort();

    function handleSearch(searchValue) {
        appDispatch({
            type: APP_ACTION_TYPES.INPUT_SEARCH,
            input: searchValue,
        });
    }

    function handleToggleFavorite(breedId) {
        const favorite = appState.breeds.find((breed) => breed.id === breedId);
        appDispatch({
            type: APP_ACTION_TYPES.TOGGLE_FAVORITE,
            payload: favorite,
        });
    }

    function handleChangePage(page) {
        appDispatch({ type: APP_ACTION_TYPES.CHANGE_PAGE, page: page });
    }

    function handleOpenDetails(breedId) {
        previousScrollY.current = window.scrollY;

        const breed = appState.breeds.find((breed) => breed.id === breedId);
        appDispatch({ type: APP_ACTION_TYPES.OPEN_DETAILS, payload: breed });
    }

    function handleCloseDetails() {
        appDispatch({ type: APP_ACTION_TYPES.CLOSE_DETAILS });

        //render previous page first, then restores the scroll Y
        setTimeout(() => {
            window.scrollTo(0, previousScrollY.current);
        }, 0);
    }

    function handleChangeFilter(key, value) {
        filterDispatch({
            type: FILTER_ACTION_TYPES.UPDATE_FILTER,
            payload: { key, value },
        });
    }

    function handleResetFilter() {
        filterDispatch({ type: FILTER_ACTION_TYPES.RESET_FILTER });
        appDispatch({ type: APP_ACTION_TYPES.RESET_FILTER });
    }

    function handleFilterBreeds() {
        appDispatch({ type: APP_ACTION_TYPES.FILTER, payload: filterState });
    }

    useEffect(() => {
        async function fetchData() {
            try {
                appDispatch({ type: APP_ACTION_TYPES.SEARCH_START });

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
                        childFriendly: breed.child_friendly,
                        dogFriendly: breed.dog_friendly,
                        hypoallergenic:
                            breed.hypoallergenic === 1 ? true : false,
                        weight: breed.weight.metric,
                    };
                });

                appDispatch({
                    type: APP_ACTION_TYPES.SEARCH_SUCCESS,
                    payload: breeds,
                });
            } catch (error) {
                appDispatch({
                    type: APP_ACTION_TYPES.SEARCH_ERROR,
                    error: error.message,
                });
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        //puts the scroll at the top of the page
        window.scrollTo(0, 0);
    }, [appState.selectedPage]);

    return (
        <>
            <Header page={appState.selectedPage} />

            {appState.selectedPage === "explore" ? (
                <BreedList
                    breeds={appState.filteredBreeds}
                    loading={appState.loading}
                    error={appState.error}
                    favorites={appState.favorites}
                    temperamentList={temperamentList}
                    originList={originList}
                    filters={filterState}
                    onToggleFavorite={handleToggleFavorite}
                    onSearch={handleSearch}
                    onOpenDetails={handleOpenDetails}
                    onChangeFilter={handleChangeFilter}
                    onResetFilter={handleResetFilter}
                    onFilter={handleFilterBreeds}
                />
            ) : appState.selectedPage === "favorites" ? (
                <FavoritesList
                    favorites={appState.favorites}
                    onToggleFavorite={handleToggleFavorite}
                    onOpenDetails={handleOpenDetails}
                />
            ) : appState.selectedPage === "details" ? (
                <BreedDetails
                    breed={appState.selectedBreed}
                    favorites={appState.favorites}
                    onToggleFavorite={handleToggleFavorite}
                    onCloseDetails={handleCloseDetails}
                />
            ) : (
                <p>More...</p>
            )}

            {appState.selectedPage !== "details" && (
                <Navbar
                    onChangePage={handleChangePage}
                    selectedPage={appState.selectedPage}
                />
            )}
        </>
    );
}

export default App;
