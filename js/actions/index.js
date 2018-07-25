// @flow

import { CREATE_CARD, EDIT_TEXT } from "./actionTypes";

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
    type: string
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

export function createCard(): CardCreateAction {
    return {
        type: CREATE_CARD
    }
}