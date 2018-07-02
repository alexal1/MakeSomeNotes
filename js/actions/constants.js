// @flow

type ActionType = "EDIT_TEXT"

export type Action = {
    type: ActionType
}

export type ActionEditText = Action & {
    id: number,
    newText: string
}