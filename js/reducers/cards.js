// @flow

import { ITEM_TEXT } from "./items";

type CardStackItem = {
    itemType: string,
    itemId: number
}

export type Card = {
    id: number,
    stack: [CardStackItem],
    color: number
}

export type CardsState = {
    [cardId: string]: Card
}

export const cardsInitialState: CardsState = {
    "0": {id: 0, stack: [{itemType: ITEM_TEXT, itemId: 0}], color: 0},
    "1": {id: 1, stack: [{itemType: ITEM_TEXT, itemId: 1}], color: 1},
    "2": {id: 2, stack: [{itemType: ITEM_TEXT, itemId: 2}], color: 2},
    "3": {id: 3, stack: [{itemType: ITEM_TEXT, itemId: 3}], color: 3},
    "4": {id: 4, stack: [{itemType: ITEM_TEXT, itemId: 4}], color: 4},
};