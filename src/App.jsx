import { useEffect, useReducer, useRef } from "react";
import "./App.css";
import BreedList from "./components/BreedList";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import FavoritesList from "./components/FavoritesList";
import BreedDetails from "./components/BreedDetails";
import {
    APP_ACTION_TYPES,
    init,
    INITIAL_STATE,
    reducer,
} from "./reducer/breedsReducer";
import {
    FILTER_ACTION_TYPES,
    FILTER_INITIAL_STATE,
    filterReducer,
} from "./reducer/filterReducer";
import { useMediaQuery } from "./util/mediaQuery";

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

    const isWideScreen = useMediaQuery("(min-width: 1500px)");
    const isExplore = appState.selectedPage === "explore";
    const isFavorites = appState.selectedPage === "favorites";
    const isDetails = appState.selectedPage === "details";
    const displayedPage =
        isWideScreen && isDetails
            ? appState.previousPage
            : appState.selectedPage;

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
    }

    function handleChangeSort(option) {
        appDispatch({ type: APP_ACTION_TYPES.CHANGE_SORT, option: option });
    }

    function handleRemoveFilter(key, temperament = null) {
        filterDispatch({
            type: FILTER_ACTION_TYPES.REMOVE_FILTER,
            payload: { key, temperament },
        });
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
        if (!isWideScreen) window.scrollTo(0, 0);
    }, [appState.selectedPage, isWideScreen]);

    useEffect(() => {
        appDispatch({ type: APP_ACTION_TYPES.FILTER, payload: filterState });
        //after loading the breeds for the first time, apply any possible filters selected while loading
    }, [filterState, appState.breeds]);

    return (
        <>
            <div id="header-navbar__container">
                <Header page={displayedPage} isWideScreen={isWideScreen} />

                {(!isDetails || isWideScreen) && (
                    <Navbar
                        onChangePage={handleChangePage}
                        selectedPage={displayedPage}
                    />
                )}
            </div>

            {(isExplore ||
                (isWideScreen &&
                    appState.previousPage === "explore" &&
                    !isFavorites)) && (
                <Filter
                    temperamentList={temperamentList}
                    originList={originList}
                    filters={filterState}
                    sortOption={appState.sort}
                    onChangeFilter={handleChangeFilter}
                    onResetFilter={handleResetFilter}
                    onChangeSort={handleChangeSort}
                    onRemoveFilter={handleRemoveFilter}
                />
            )}

            {displayedPage === "explore" ? (
                <p id="breeds_displayed__amount">
                    <span>{appState.filteredBreeds.length}</span> breeds found
                </p>
            ) : (
                displayedPage === "favorites" && (
                    <p id="breeds_displayed__amount">
                        <span>{appState.favorites.length}</span> favorites
                    </p>
                )
            )}

            <div
                className={
                    isDetails && isWideScreen
                        ? "app__content--split"
                        : "app__content"
                }
            >
                {/* Small screens*/}
                {!isWideScreen && isExplore ? (
                    <BreedList
                        breeds={appState.filteredBreeds}
                        loading={appState.loading}
                        error={appState.error}
                        favorites={appState.favorites}
                        onToggleFavorite={handleToggleFavorite}
                        onOpenDetails={handleOpenDetails}
                    />
                ) : !isWideScreen && isFavorites ? (
                    <FavoritesList
                        favorites={appState.favorites}
                        onToggleFavorite={handleToggleFavorite}
                        onOpenDetails={handleOpenDetails}
                    />
                ) : (
                    !isWideScreen &&
                    isDetails && (
                        <BreedDetails
                            breed={appState.selectedBreed}
                            favorites={appState.favorites}
                            onToggleFavorite={handleToggleFavorite}
                            onCloseDetails={handleCloseDetails}
                        />
                    )
                )}

                {/* Wider screens*/}
                {isWideScreen && displayedPage === "explore" ? (
                    <BreedList
                        breeds={appState.filteredBreeds}
                        loading={appState.loading}
                        error={appState.error}
                        favorites={appState.favorites}
                        temperamentList={temperamentList}
                        originList={originList}
                        filters={filterState}
                        sortOption={appState.sort}
                        onToggleFavorite={handleToggleFavorite}
                        onOpenDetails={handleOpenDetails}
                        onChangeFilter={handleChangeFilter}
                        onResetFilter={handleResetFilter}
                        onChangeSort={handleChangeSort}
                        onRemoveFilter={handleRemoveFilter}
                    />
                ) : (
                    isWideScreen &&
                    displayedPage === "favorites" && (
                        <FavoritesList
                            favorites={appState.favorites}
                            onToggleFavorite={handleToggleFavorite}
                            onOpenDetails={handleOpenDetails}
                        />
                    )
                )}

                {isWideScreen && isDetails && (
                    <BreedDetails
                        breed={appState.selectedBreed}
                        favorites={appState.favorites}
                        onToggleFavorite={handleToggleFavorite}
                        onCloseDetails={handleCloseDetails}
                    />
                )}
            </div>
        </>
    );
}

export default App;
