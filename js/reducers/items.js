// @flow

export type ItemText = {
    id: number,
    text: string
}
export const ITEM_TEXT = "ITEM_TEXT";

export type ItemImage = {
    id: number,
    base64: string
}
export const ITEM_IMAGE = "ITEM_IMAGE";

export type Item =
    | ItemText;

export type ItemsState = {
    [itemId: string]: Item
}

export const itemsInitialState: ItemsState = {
    "0": {id: 0, text: "First card.\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    "1": {id: 1, text: "Second card"},
    "2": {id: 2, text: "Third card"},
    "3": {id: 3, text: "Fourth card"},
    "4": {id: 4, text: "Fifth card"}
};