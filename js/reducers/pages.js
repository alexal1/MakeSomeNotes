// @flow

export type Page = {
    id: number,
    title: string,
    stack: number[]
}

export type PagesState = {
    [pageId: string]: Page
}

export const pagesInitialState: PagesState = {
    "0": {id: 0, title: "Page 0", stack: [0]},
    "1": {id: 1, title: "Page 1", stack: [1]},
    "2": {id: 2, title: "Page 2", stack: [2]},
    "3": {id: 3, title: "Page 3", stack: [3]},
    "4": {id: 4, title: "Page 4", stack: [4]}
};