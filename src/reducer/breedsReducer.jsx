export const INITIAL_STATE = {
    breeds: [],
    filteredBreeds: [],
    loading: false,
    error: null,
    selectedPage: "explore",
    favorites: [],
    selectedBreed: null,
    previousPage: null,
};

export const APP_ACTION_TYPES = {
    SEARCH_START: "SEARCH_START",
    SEARCH_ERROR: "SEARCH_ERROR",
    SEARCH_SUCCESS: "SEARCH_SUCCESS",
    TOGGLE_FAVORITE: "TOGGLE_FAVORITE",
    INPUT_SEARCH: "INPUT_SEARCH",
    CHANGE_PAGE: "CHANGE_PAGE",
    OPEN_DETAILS: "OPEN_DETAILS",
    CLOSE_DETAILS: "CLOSE_DETAILS",
};

export function init(initialState) {
    try {
        const savedFavorites = localStorage.getItem("favorites");

        if (!savedFavorites) return initialState;

        const parsedFavorites = JSON.parse(savedFavorites);
        return Array.isArray(parsedFavorites)
            ? { ...initialState, favorites: parsedFavorites }
            : initialState;
    } catch {
        return initialState;
    }
}

export function reducer(state, action) {
    switch (action.type) {
        case APP_ACTION_TYPES.SEARCH_START: {
            return {
                ...state,
                loading: true,
                error: null,
            };
        }
        case APP_ACTION_TYPES.SEARCH_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }
        case APP_ACTION_TYPES.SEARCH_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: null,
                breeds: action.payload,
                filteredBreeds: action.payload,
            };
        }
        case APP_ACTION_TYPES.TOGGLE_FAVORITE: {
            const favorite = action.payload;
            const favoriteExists = state.favorites.find(
                (breed) => breed.id === favorite.id,
            );
            let newFavorites;

            if (!favoriteExists) {
                newFavorites = [...state.favorites, favorite];
            } else {
                newFavorites = state.favorites.filter(
                    (breed) => breed.id !== favorite.id,
                );
            }
            newFavorites.sort((a, b) => a.name.localeCompare(b.name));
            localStorage.setItem("favorites", JSON.stringify(newFavorites));

            return {
                ...state,
                favorites: newFavorites,
            };
        }
        case APP_ACTION_TYPES.INPUT_SEARCH: {
            const filtered = state.breeds.filter((breed) =>
                breed.name.toLowerCase().includes(action.input.toLowerCase()),
            );

            return {
                ...state,
                filteredBreeds: filtered,
            };
        }
        case APP_ACTION_TYPES.CHANGE_PAGE: {
            return {
                ...state,
                selectedPage: action.page,
            };
        }
        case APP_ACTION_TYPES.OPEN_DETAILS: {
            return {
                ...state,
                previousPage: state.selectedPage,
                selectedPage: "details",
                selectedBreed: action.payload,
            };
        }
        case APP_ACTION_TYPES.CLOSE_DETAILS: {
            return {
                ...state,
                selectedPage: state.previousPage,
            };
        }
        default: {
            return state;
        }
    }
}
