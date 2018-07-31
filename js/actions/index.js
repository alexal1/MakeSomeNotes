// @flow

import {
    ADD_ITEM_TO_CARD,
    CREATE_CARD_WITH_IMAGE,
    CREATE_CARD_WITH_TEXT,
    EDIT_TEXT
} from "./actionTypes";
import type { Item } from "../reducers/items";

// Items actions

export type AddItemAction = {
    type: string,
    itemType: string,
    item: Item,
    cardId: number
}

export type ItemTextEditAction = {
    type: string,
    id: number,
    newText: string
}

export type ItemAction =
    | AddItemAction
    | ItemTextEditAction;

// Cards actions

export type CardCreateAction = {
    type: string,
    image?: string
}

export type CardAction =
    | CardCreateAction;

// Union action

export type Action =
    | ItemAction
    | CardAction;

// Action creators

export function editText(id: number, newText: string): ItemTextEditAction {
    return {
        type: EDIT_TEXT,
        id,
        newText
    }
}

export function createCard(image: ?string): CardCreateAction {
    if (image == null)
        return {
            type: CREATE_CARD_WITH_TEXT
        };
    else
        return {
            type: CREATE_CARD_WITH_IMAGE,
            image
        };
}

export function addItemToCard(itemType: string, item: Item, cardId: number): CardCreateAction {
    return {
        type: ADD_ITEM_TO_CARD,
        itemType,
        item,
        cardId
    }
}