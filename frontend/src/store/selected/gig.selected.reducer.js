const initialState = {
    selectedGig: JSON.parse(localStorage.getItem('selectedGig')) || null,
};

export function gigReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_SELECTED_GIG':
            localStorage.setItem('selectedGig', JSON.stringify(action.gig));
            return {
                ...state,
                selectedGig: action.gig,
            }
        default:
            return state
    }
}
