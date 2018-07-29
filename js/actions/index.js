// @flow

import {
    CREATE_CARD_WITH_IMAGE,
    CREATE_CARD_WITH_TEXT,
    EDIT_TEXT
} from "./actionTypes";

// Items actions

export type ItemTextEditAction = {
    type: string,
    id: number,
    newText: string
}

export type ItemAction =
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