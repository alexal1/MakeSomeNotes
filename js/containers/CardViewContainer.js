/**
 * Container for CardView.
 *
 * @flow
 */

import { connect } from 'react-redux'
import { editText } from "../actions";
import CardView from "../components/CardView";
import { ITEM_TEXT } from "../reducers/items";
import type { Card } from "../reducers/cards";
import type { ItemsState, ItemText } from "../reducers/items";

function getFirstItemText(card: Card, itemsState: ItemsState): ?ItemText {
    for (let value of card.stack) {
        if (value.itemType === ITEM_TEXT) {
            const id: string = value.itemId.toString();
            return itemsState[id]
        }
    }
    console.log("No ItemText in Card #" + card.id);
    return undefined
}

const mapStateToProps = (state, ownProps) => {
    const card = state.cards[ownProps.cardId];
    const itemText = getFirstItemText(card, state.items);
    return {
        itemText: itemText
    }
};

const mapDispatchToProps = (dispatch) => ({
    save: (itemTextId: number, newText: string) => dispatch(editText(itemTextId, newText))
});

const CardViewContainer = connect(
    mapStateToProps,
    mapDispatchToProps
) (CardView);

export default CardViewContainer