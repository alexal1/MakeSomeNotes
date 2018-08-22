/**
 * Container for a ChatView.
 *
 * @flow
 */

import connect from "react-redux/es/connect/connect";
import ChatView from "../components/ChatView";
import type { Card } from "../reducers/cards";
import { getFirstItem } from "../reducers/cards";
import { ITEM_IMAGE, ITEM_TEXT } from "../reducers/items";
import type { ItemImage, ItemsState, ItemText } from "../reducers/items";
import { values } from "../globals"

export type ChatMessage = {
    _id: number,
    text: string,
    image: string
}

function _convertCardIntoMessage(card: Card, itemsState: ItemsState): ChatMessage {
    const itemText = ((getFirstItem(ITEM_TEXT, card, itemsState): any): ?ItemText);
    const itemImage = ((getFirstItem(ITEM_IMAGE, card, itemsState): any): ?ItemImage);
    return {
        _id: card.id,
        text: itemText ? itemText.text : "",
        image: itemImage ? 'data:image/jpeg;base64,' + itemImage.base64 : "",
        user: {}
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        messages: values(state.cards).map((card) => _convertCardIntoMessage(card, state.items)),
        onMessageClick: (id: number) => {
            ownProps.openCard(id)
        }
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({});

const ChatViewContainer = connect(
    mapStateToProps,
    mapDispatchToProps
) (ChatView);

export default ChatViewContainer