export const FILTER_INITIAL_STATE = {
    temperaments: [],
    childFriendly: ["any"],
    dogFriendly: ["any"],
    hypoallergenic: false,
    origin: null,
    weight: [0, 99],
};

export const FILTER_ACTION_TYPES = {
    UPDATE_FILTER: "UPDATE_FILTER",
    RESET_FILTER: "RESET_FILTER",
};

export function filterReducer(state, action) {
    switch (action.type) {
        case FILTER_ACTION_TYPES.UPDATE_FILTER: {
            return {
                ...state,
                [action.payload.key]: action.payload.value,
            };
        }
        case FILTER_ACTION_TYPES.RESET_FILTER: {
            return FILTER_INITIAL_STATE;
        }
        default: {
            return state;
        }
    }
}
