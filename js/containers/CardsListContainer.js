/**
 * Container for CardsList.
 *
 * @flow
 */

import { connect } from 'react-redux'
import CardsList from "../components/CardsList";
import { createCard } from "../actions";

const mapStateToProps = (state) => {
    const cardIds: number[] = Object.keys(state.cards);
    return {
        cardIds: cardIds
    }
};

const mapDispatchToProps = (dispatch) => ({
    createCard: (image: ?string) => {
        dispatch(createCard(image))
    }
});

const CardsListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
) (CardsList);

export default CardsListContainer