// @flow

import { ItemText } from "./items"
import type { CardAction } from "../actions";

type CardStackItem = {
    itemType: string,
    itemId: number
}

export class Card {
    id: number;
    stack: [CardStackItem];

    constructor(id: number, stack: [CardStackItem]) {
        this.id = id;
        this.stack = stack;
    }
}

export type CardsState = {
    [cardId: string]: Card
}

const initialState: CardsState = {
    "0": new Card(0, [{itemType: ItemText.name, itemId: 0}]),
    "1": new Card(1, [{itemType: ItemText.name, itemId: 1}]),
    "2": new Card(2, [{itemType: ItemText.name, itemId: 2}]),
    "3": new Card(3, [{itemType: ItemText.name, itemId: 3}]),
    "4": new Card(4, [{itemType: ItemText.name, itemId: 4}]),
};

export default function cards(state: CardsState = initialState, action: CardAction): CardsState {
    switch (action.type) {
        default:
            return state;
    }
}