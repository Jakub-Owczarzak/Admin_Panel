
import * as ActionTypes from '../action-types/action-types';

const initialState = {
    users: [],
    sortingOptions: {
        id: "asc",
        name: "desc",
        username: "desc",
        city: "desc",
        email: "desc"
    }
}


function propComparator(columnName) {
    return (a, b) => {
        if (a[columnName] < b[columnName]) {
            return -1;
        }
        if (a[columnName] > b[columnName]) {
            return 1;
        }
        return 0;
    }
}



const sortFunc = (users, columnName, sortDirection) => {
    if (sortDirection === "asc") {
        const sortedProducts = users.sort(propComparator(columnName));
        return sortedProducts;
    }
    if (sortDirection === "desc") {
        const sortedProducts = users.sort(propComparator(columnName)).reverse();
        return sortedProducts;
    }
    return users;
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SORT:
            const { columnName, sortDirection } = action.payload
            const sortedUsers = sortFunc(state.users, columnName, sortDirection)
            return {
                ...state,
                users: sortedUsers,
                sortingOptions: {
                    ...state.sortingOptions,
                    [columnName]: sortDirection
                }
            }
        case ActionTypes.FETCH_USER:
            return {
                ...state,
                users: [...action.payload]
            }
        case ActionTypes.ADD_USER:
            return {
                ...state,
                users: [...state.users, action.payload]
            }
        case ActionTypes.EDIT_USER:
            const indexOfUser = state.users.map(user => user.id).indexOf(action.payload.id);
            const userStateCopy = [...state.users];

            userStateCopy.splice(indexOfUser, 1, action.payload);
            return {
                ...state,
                users: userStateCopy
            }

        case ActionTypes.DELETE_USER:
            return {
                ...state,
                users: [...state.users.filter(user => user.id !== action.payload)]
            }

        default:
            return {
                ...state
            }
    }
}

export default userReducer