// @flow

import type { ItemsState, ItemText } from "./items";
import { ITEM_IMAGE, ITEM_TEXT, itemsInitialState } from "./items";
import type { CardsState } from "./cards";
import { cardsInitialState } from "./cards";
import type { Action, CardCreateAction, ItemTextEditAction } from "../actions";

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

    CREATE_CARD_WITH_TEXT(state: State): State {
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
    },

    CREATE_CARD_WITH_IMAGE(state: State, action: CardCreateAction): State {
        const itemImageId = Object.keys(state.items).length;
        const cardId = Object.keys(state.cards).length;
        return {
            ...state,
            items: {
                ...state.items,
                [itemImageId.toString()]: {
                    id: itemImageId,
                    base64: action.image
                }
            },
            cards: {
                ...state.cards,
                [cardId.toString()]: {
                    id: cardId,
                    stack: [{itemType: ITEM_IMAGE, itemId: itemImageId}]
                }
            }
        }
    }
};

export default createReducer(initialState, handlers)