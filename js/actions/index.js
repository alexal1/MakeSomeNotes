// @flow

import {
    ADD_ITEM_TO_CARD,
    CREATE_CARD_WITH_IMAGE,
    CREATE_CARD_WITH_TEXT, CREATE_CARD_WITH_TEXT_AND_IMAGE, DELETE_CARD,
    DELETE_ITEM_FROM_CARD, EDIT_IMAGE,
    EDIT_TEXT, SET_CARD_COLOR, SET_CURRENT_PAGE
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

export type ItemImageEditAction = {
    type: string,
    id: number,
    newBase64: string
}

export type ItemDeleteAction = {
    type: string,
    id: number,
    cardId: number
}

export type ItemAction =
    | AddItemAction
    | ItemTextEditAction
    | ItemImageEditAction
    | ItemDeleteAction;

// Cards actions

export type CardCreateAction = {
    type: string,
    text?: string,
    image?: string
}

export type CardDeleteAction = {
    type: string,
    id: number
}

export type CardColorAction = {
    type: string,
    cardId: number,
    newColor: number
}

export type CardAction =
    | CardCreateAction
    | CardDeleteAction
    | CardColorAction;

// Pages actions

export type CurrentPageAction = {
    type: string,
    pageId: number
}

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

export function editImage(id: number, newBase64: string): ItemImageEditAction {
    return {
        type: EDIT_IMAGE,
        id,
        newBase64
    }
}

export function createCard(text: ?string, image: ?string): CardCreateAction {
    if (text != null && image != null) {
        return {
            type: CREATE_CARD_WITH_TEXT_AND_IMAGE,
            text,
            image
        }
    }
    else if (text != null) {
        return {
            type: CREATE_CARD_WITH_TEXT,
            text
        };
    }
    else if (image != null) {
        return {
            type: CREATE_CARD_WITH_IMAGE,
            image
        };
    }
    else {
        throw "Attempt to create a card with no text and no image"
    }
}

export function addItemToCard(itemType: string, item: Item, cardId: number): CardCreateAction {
    return {
        type: ADD_ITEM_TO_CARD,
        itemType,
        item,
        cardId
    }
}

export function deleteItemFromCard(id: number, cardId: number): ItemDeleteAction {
    return {
        type: DELETE_ITEM_FROM_CARD,
        id,
        cardId
    }
}

export function deleteCard(id: number): CardDeleteAction {
    return {
        type: DELETE_CARD,
        id
    }
}

export function setCardColor(cardId: number, newColor: number): CardColorAction {
    return {
        type: SET_CARD_COLOR,
        cardId,
        newColor
    }
}

export function setCurrentPage(pageId: number): CurrentPageAction {
    return {
        type: SET_CURRENT_PAGE,
        pageId
    }
}