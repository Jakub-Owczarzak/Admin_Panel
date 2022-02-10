import * as ActionTypes from "../action-types/action-types";

const fetchUsers = (users) => {
    return {
        type: ActionTypes.FETCH_USER,
        payload: users
    }
}

export const deleteUser = (id) => {
    return {
        type: ActionTypes.DELETE_USER,
        payload: id
    }
}

export const addUser = (data) => {
    return {
        type: ActionTypes.ADD_USER,
        payload: data
    }
}
export const editUser = (data) => {
    return {
        type: ActionTypes.EDIT_USER,
        payload: data
    }
}
export const sortUsers = (data) => {

    return {
        type: ActionTypes.SORT,
        payload: data
    }
}


export const fetchUsersAsync = async (dispatch) => {
    try {
        const data = await fetch("https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data");
        const users = await data.json();
        dispatch(fetchUsers(users))
    } catch (err) {
        console.log(err)
    }
}


