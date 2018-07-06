// @flow

import type { ItemText } from "./items"
import type { CardAction } from "../actions";

export type Card = {
    id: number,
    stack: [
        {
            itemType: string,
            itemId: number
        }
    ]
}

export type CardsState = {
    [cardId: string]: Card
}

const initialState: CardsState = {
    "0": {
        id: 0,
        stack: [
            {
                itemType: "ItemText",
                itemId: 0
            }
        ]
    },
    "1": {
        id: 1,
        stack: [
            {
                itemType: "ItemText",
                itemId: 1
            }
        ]
    },
    "2": {
        id: 2,
        stack: [
            {
                itemType: "ItemText",
                itemId: 2
            }
        ]
    },
    "3": {
        id: 3,
        stack: [
            {
                itemType: "ItemText",
                itemId: 3
            }
        ]
    },
    "4": {
        id: 4,
        stack: [
            {
                itemType: "ItemText",
                itemId: 4
            }
        ]
    }
};

export default function cards(state: CardsState = initialState, action: CardAction): CardsState {
    switch (action.type) {
        default:
            return state;
    }
}