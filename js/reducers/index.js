// @flow

import type { ItemsState, ItemText } from "./items";
import { ITEM_TEXT, itemsInitialState } from "./items";
import type { CardsState } from "./cards";
import { cardsInitialState } from "./cards";
import type { Action, ItemTextEditAction } from "../actions";

// Global state

type State = {
    items: ItemsState,
    cards: CardsState
}

const initialState: State = {
    items: itemsInitialState,
    cards: cardsInitialState
};

// Reducer

function createReducer(_initialState: State, _handlers: {}) {
    return function reducer(state: State = _initialState, action: Action): State {
        return _handlers.hasOwnProperty(action.type) ? _handlers[action.type](state, action) : state;
    };
}

const handlers = {
    EDIT_TEXT(state: State, action: ItemTextEditAction): State {
        return {
            ...state,
            items: {
                ...state.items,
                [action.id.toString()]: {
                    id: action.id,
                    text: action.newText
                }
            }
        }
    },

    CREATE_CARD(state: State): State {
        const itemTextId = Object.keys(state.items).length;
        const cardId = Object.keys(state.cards).length;
        return {
            ...state,
            items: {
                ...state.items,
                [itemTextId.toString()]: {
                    id: itemTextId,
                    text: ""
                }
            },
            cards: {
                ...state.cards,
                [cardId.toString()]: {
                    id: cardId,
                    stack: [{itemType: ITEM_TEXT, itemId: itemTextId}]
                }
            }
        }
    }
};

export default createReducer(initialState, handlers)