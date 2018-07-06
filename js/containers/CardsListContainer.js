/**
 * Container for CardsList.
 *
 * @flow
 */

import { connect } from 'react-redux'
import CardsList from "../components/CardsList";

const mapStateToProps = (state) => {
    const cardIds: number[] = Object.keys(state.cards);
    return {
        cardIds: cardIds
    }
};

const mapDispatchToProps = () => ({});

const CardsListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
) (CardsList);

export default CardsListContainer