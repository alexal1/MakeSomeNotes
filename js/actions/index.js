// @flow

import { EDIT_TEXT } from "./actionTypes";

export type ItemTextAction = {
    type: string,
    id: number,
    newText?: string
}

export type ItemAction =
    | ItemTextAction;

export type CardAction = {
    type: string
}

export function editText(id: number, newText: string): ItemTextAction {
    return {
        type: EDIT_TEXT,
        id,
        newText
    }
}