import { OPEN_MODAL, CLOSE_MODAL } from '../action-types/action-types';

const initialState = {
    isOpen: false,
    data: {},
    type: null
}

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_MODAL:
            return {
                ...state,
                isOpen: true,
                data: { ...action.payload.data },
                type: action.payload.data

            }
        case CLOSE_MODAL:
            return {
                ...state,
                isOpen: false,
                data: {},
                type: null
            }
        default:
            return {
                ...state
            }
    }
}

export default modalReducer