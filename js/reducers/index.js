// @flow

import type { ItemsState } from "./items";
import { ITEM_IMAGE, ITEM_TEXT, itemsInitialState } from "./items";
import type { CardsState } from "./cards";
import { cardsInitialState } from "./cards";
import type {
    Action,
    AddItemAction, CardColorAction,
    CardCreateAction,
    CardDeleteAction, CurrentPageAction,
    ItemDeleteAction, ItemImageEditAction,
    ItemTextEditAction
} from "../actions";
import { pagesInitialState } from "./pages";
import type { PagesState } from "./pages";

// Global state

type State = {
    items: ItemsState,
    cards: CardsState,
    pages: PagesState,
    currentPageId: number
}

const initialState: State = {
    items: itemsInitialState,
    cards: cardsInitialState,
    pages: pagesInitialState,
    currentPageId: 0
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
    return Math.max(-1, ...Object.keys(state).map(id => Number(id))) + 1
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

    EDIT_IMAGE(state: State, action: ItemImageEditAction): State {
        return {
            ...state,
            items: {
                ...state.items,
                [action.id.toString()]: {
                    id: action.id,
                    base64: action.newBase64
                }
            }
        }
    },

    CREATE_CARD_WITH_TEXT(state: State, action: CardCreateAction): State {
        const itemTextId = getNewId(state.items);
        const cardId = getNewId(state.cards);
        return {
            ...state,
            items: {
                ...state.items,
                [itemTextId.toString()]: {
                    id: itemTextId,
                    text: action.text
                }
            },
            cards: {
                ...state.cards,
                [cardId.toString()]: {
                    id: cardId,
                    stack: [{itemType: ITEM_TEXT, itemId: itemTextId}],
                    color: 0
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
                    stack: [{itemType: ITEM_IMAGE, itemId: itemImageId}],
                    color: 0
                }
            }
        }
    },

    CREATE_CARD_WITH_TEXT_AND_IMAGE(state: State, action: CardCreateAction): State {
        const itemTextId = getNewId(state.items);
        const itemImageId = itemTextId + 1;
        const cardId = getNewId(state.cards);
        return {
            ...state,
            items: {
                ...state.items,
                [itemTextId.toString()]: {
                    id: itemTextId,
                    text: action.text
                },
                [itemImageId.toString()]: {
                    id: itemImageId,
                    base64: action.image
                }
            },
            cards: {
                ...state.cards,
                [cardId.toString()]: {
                    id: cardId,
                    stack: [
                        {itemType: ITEM_TEXT, itemId: itemTextId},
                        {itemType: ITEM_IMAGE, itemId: itemImageId}
                    ],
                    color: 0
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
    },

    DELETE_CARD(state: State, action: CardDeleteAction): State {
        const cardId = action.id;
        const cardStack = state.cards[cardId.toString()].stack;
        let newItemsState: ItemsState = state.items;
        for (let stackItem of cardStack) {
            newItemsState = removeByKey(newItemsState, stackItem.itemId.toString())
        }
        return {
            ...state,
            items: newItemsState,
            cards: removeByKey(state.cards, cardId.toString())
        }
    },

    SET_CARD_COLOR(state: State, action: CardColorAction): State {
        const cardId = action.cardId;
        return {
            ...state,
            cards: {
                ...state.cards,
                [cardId.toString()]: {
                    ...state.cards[cardId.toString()],
                    color: action.newColor
                }
            }
        }
    },

    SET_CURRENT_PAGE(state: State, action: CurrentPageAction): State {
        const pageId = action.pageId;
        return {
            ...state,
            currentPageId: pageId
        }
    }
};

export default createReducer(initialState, handlers)