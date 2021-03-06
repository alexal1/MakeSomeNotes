/**
 * Container for CardView.
 *
 * @flow
 */

import { connect } from 'react-redux'
import {
    addItemToCard,
    deleteCard,
    deleteItemFromCard,
    editImage,
    editText,
    setCardColor
} from "../actions";
import CardView from "../components/CardView";
import { ITEM_IMAGE, ITEM_TEXT } from "../reducers/items";
import { getFirstItem } from "../reducers/cards";

const mapStateToProps = (state, ownProps) => {
    const card = state.cards[ownProps.cardId];
    const itemText = getFirstItem(ITEM_TEXT, card, state.items);
    const itemImage = getFirstItem(ITEM_IMAGE, card, state.items);
    const color = card.color;
    return {
        pageTitle: state.pages[ownProps.pageId].title,
        itemText,
        itemImage,
        cardColorIndex: color,
        finish: ownProps.finish
    }
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
    deleteCard: () => dispatch(deleteCard(ownProps.cardId, ownProps.pageId)),
    updateItemText: (itemTextId: number, newText: string) => dispatch(
        editText(itemTextId, newText)
    ),
    updateItemImage: (itemImageId: number, newBase64: string) => dispatch(
        editImage(itemImageId, newBase64)
    ),
    setColor: (newColor: number) => dispatch(setCardColor(ownProps.cardId, newColor))
});

const CardViewContainer = connect(
    mapStateToProps,
    mapDispatchToProps
) (CardView);

export default CardViewContainer