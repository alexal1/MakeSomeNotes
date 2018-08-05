/**
 * Container for CardView.
 *
 * @flow
 */

import { connect } from 'react-redux'
import { addItemToCard, deleteCard, deleteItemFromCard, editImage, editText } from "../actions";
import CardView from "../components/CardView";
import { ITEM_IMAGE, ITEM_TEXT } from "../reducers/items";
import type { Card } from "../reducers/cards";
import type { ItemsState, Item } from "../reducers/items";

function getFirstItem(itemType: string, card: Card, itemsState: ItemsState): ?Item {
    for (let value of card.stack) {
        if (value.itemType === itemType) {
            const id: string = value.itemId.toString();
            const result = itemsState[id];
            if (!result)
                throw "Cannot find " + itemType + " " + id + " for card " + card.id + "!";
            else
                return result
        }
    }
    return null
}

const mapStateToProps = (state, ownProps) => {
    const card = state.cards[ownProps.cardId];
    const itemText = getFirstItem(ITEM_TEXT, card, state.items);
    const itemImage = getFirstItem(ITEM_IMAGE, card, state.items);
    return {itemText, itemImage}
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    addItemText: () => dispatch(addItemToCard(
        ITEM_TEXT,
        {
            id: -1,
            text: ""
        },
        ownProps.cardId
    )),
    addItemImage: (base64: string) => dispatch(addItemToCard(
        ITEM_IMAGE,
        {
            id: -1,
            base64
        },
        ownProps.cardId
    )),
    deleteItem: (id: number) => dispatch(deleteItemFromCard(id, ownProps.cardId)),
    deleteCard: () => dispatch(deleteCard(ownProps.cardId)),
    updateItemText: (itemTextId: number, newText: string) => dispatch(
        editText(itemTextId, newText)
    ),
    updateItemImage: (itemImageId: number, newBase64: string) => dispatch(
        editImage(itemImageId, newBase64)
    )
});

const CardViewContainer = connect(
    mapStateToProps,
    mapDispatchToProps
) (CardView);

export default CardViewContainer