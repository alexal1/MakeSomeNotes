// @flow

import type { ActionEditText } from './constants'

export const editText = (id: number, newText: string): ActionEditText => ({
    type: "EDIT_TEXT",
    id,
    newText
});