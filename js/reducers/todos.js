import { TOGGLE_TODO } from "../actions/constants";

const initialState = {
    todoIds: [0, 1, 2, 3, 4],
    todoById: {
        0: {
            text: "First card.\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            isDone: false
        },
        1: {
            text: "Second card",
            isDone: false
        },
        2: {
            text: "Third card",
            isDone: false
        },
        3: {
            text: "Fourth card",
            isDone: false
        },
        4: {
            text: "Fifth card",
            isDone: false
        }
    }
};

const todos = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_TODO: {
            const newState = Object.assign({}, state);
            const todo = newState.todoById[action.id];
            todo.isDone = !todo.isDone;
            return newState
        }
        default:
            return state;
    }
};

export default todos