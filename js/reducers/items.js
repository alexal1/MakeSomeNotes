// @flow

import { Item, ItemText } from "./constants";
import type { Action, ActionEditText } from "../actions/constants";

export type ItemById = {[itemId: number]: Item}
const itemById: ItemById = {};

// Default values
itemById[0] = new ItemText(0, "First card.\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
itemById[1] = new ItemText(1, "Second card");
itemById[2] = new ItemText(2, "Third card");
itemById[3] = new ItemText(3, "Fourth card");
itemById[4] = new ItemText(4, "Fifth card");

const items = (state: ItemById = itemById, action: Action) => {
    switch (action.type) {
        case "EDIT_TEXT": {
            const actionEditText = ((action: any): ActionEditText);
            const newState = Object.assign({}, state);
            const item = newState[actionEditText.id];
            (item: ItemText).text = actionEditText.newText;
            return newState
        }

        default:
            return state;
    }
};

export default items