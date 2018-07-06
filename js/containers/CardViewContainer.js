/**
 * Container for CardView.
 *
 * @flow
 */

import { connect } from 'react-redux'
import { editText } from "../actions";
import type { ItemsState } from "../reducers/items";
import { ItemText } from "../reducers/items";
import { Card } from "../reducers/cards";
import CardView from "../components/CardView";

function getFirstItemText(card: Card, itemsState: ItemsState): ?ItemText {
    for (let value of card.stack) {
        if (value.itemType === ItemText.name) {
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