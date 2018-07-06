// @flow

import type { ItemAction } from "../actions";
import { EDIT_TEXT } from "../actions/actionTypes";

export class ItemText {
    id: number;
    text: string;

    constructor(id: number, text: string) {
        this.id = id;
        this.text = text;
    }
}

export type Item =
    | ItemText;

export type ItemsState = {
    [itemId: string]: Item
}

const initialState: ItemsState = {
    "0": new ItemText(0, "First card.\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."),
    "1": new ItemText(1, "Second card"),
    "2": new ItemText(2, "Third card"),
    "3": new ItemText(3, "Fourth card"),
    "4": new ItemText(4, "Fifth card")
};

export default function items(state: ItemsState = initialState, action: ItemAction): ItemsState {
    switch (action.type) {
        case EDIT_TEXT: {
            const id = action.id;
            const text = action.newText;
            return {
                ...state,
                [id.toString()]: {
                    id,
                    text
                }
            }
        }

        default:
            return state;
    }
}