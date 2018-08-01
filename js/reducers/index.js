// @flow

import type { ItemsState, ItemText } from "./items";
import { ITEM_IMAGE, ITEM_TEXT, itemsInitialState } from "./items";
import type { CardsState } from "./cards";
import { cardsInitialState } from "./cards";
import type {
    Action,
    AddItemAction,
    CardCreateAction,
    ItemDeleteAction,
    ItemTextEditAction
} from "../actions";

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

function removeByKey (myObj, deleteKey) {
    return Object.keys(myObj)
        .filter(key => key !== deleteKey)
        .reduce((result, current) => {
            result[current] = myObj[current];
            return result;
        }, {});
}

function getNewId(state: ItemsState | CardsState): number {
    return Math.max(...Object.keys(state).map(id => Number(id))) + 1
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
        const itemTextId = getNewId(state.items);
        const cardId = getNewId(state.cards);
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
        const itemImageId = getNewId(state.items);
        const cardId = getNewId(state.cards);
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
    },

    ADD_ITEM_TO_CARD(state: State, action: AddItemAction): State {
        const itemId = getNewId(state.items);
        const cardId = action.cardId;
        const newStack = [
            ...state.cards[cardId.toString()].stack.slice(),
            {
                itemType: action.itemType,
                itemId: itemId
            }
        ];

        return {
            ...state,
            items: {
                ...state.items,
                [itemId.toString()]: {
                    ...action.item,
                    id: itemId
                }
            },
            cards: {
                ...state.cards,
                [cardId.toString()]: {
                    ...state.cards[cardId.toString()],
                    stack: newStack
                }
            }
        }
    },

    DELETE_ITEM_FROM_CARD(state: State, action: ItemDeleteAction): State {
        const itemId = action.id;
        const cardId = action.cardId;
        return {
            ...state,
            items: removeByKey(state.items, itemId.toString()),
            cards: {
                ...state.cards,
                [cardId.toString()]: {
                    ...state.cards[cardId.toString()],
                    stack: state.cards[cardId.toString()].stack.filter(
                        cardStackItem => cardStackItem.itemId !== itemId
                    )
                }
            }
        }
    }
};

export default createReducer(initialState, handlers)