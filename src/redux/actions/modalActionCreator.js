import { OPEN_MODAL, CLOSE_MODAL } from "../action-types/action-types";


export const openModal = (data, type) => {

    return {
        type: OPEN_MODAL,
        payload: {
            data,
            type
        }
    }
};

export const closeModal = () => {
    return {
        type: CLOSE_MODAL,

    }
};