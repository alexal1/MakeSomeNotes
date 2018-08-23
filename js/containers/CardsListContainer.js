/**
 * Container for CardsList.
 *
 * @flow
 */

import { connect } from 'react-redux'
import CardsList from "../components/CardsList";
import { createCard } from "../actions";

const mapStateToProps = (state, ownProps) => {
    const cardIds: number[] = Object.keys(state.cards);
    const firstItem = cardIds.indexOf(ownProps.currentCardId.toString());
    if (firstItem < 0) {
        throw "Cannot find cardId " + ownProps.currentCardId
    }
    return {
        cardIds: cardIds,
        firstItem,
        finish: ownProps.finish
    }
};

const mapDispatchToProps = (dispatch) => ({
    createCard: (text: ?string, image: ?string) => {
        dispatch(createCard(text, image))
    }
});

const CardsListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
) (CardsList);

export default CardsListContainer