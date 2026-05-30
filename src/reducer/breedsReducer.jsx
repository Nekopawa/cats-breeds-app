export const INITIAL_STATE = {
    breeds: [],
    loading: false,
    error: null,
    selectedPage: "explore",
    favorites: [],
};

export const ACTION_TYPES = {
    SEARCH_START: "SEARCH_START",
    SEARCH_ERROR: "SEARCH_ERROR",
    SEARCH_SUCCESS: "SEARCH_SUCCESS",
    TOGGLE_FAVORITE: "TOGGLE_FAVORITE",
};

export function init(initialState) {
    return initialState;
}

export function reducer(state, action) {
    switch (action.type) {
        case ACTION_TYPES.SEARCH_START: {
            return {
                ...state,
                loading: true,
                error: null,
            };
        }
        case ACTION_TYPES.SEARCH_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }
        case ACTION_TYPES.SEARCH_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: null,
                breeds: action.payload,
            };
        }
    }
}
