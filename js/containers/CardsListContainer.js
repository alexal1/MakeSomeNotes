/**
 * Container for CardsList.
 *
 * @flow
 */

import { connect } from 'react-redux'
import CardsList from "../components/CardsList";
import { createCard } from "../actions";

const mapStateToProps = (state, ownProps) => {
    const cardIds: number[] = state.pages[ownProps.pageId.toString()].stack;
    const firstItem = cardIds.indexOf(ownProps.currentCardId);
    return {
        cardIds: cardIds,
        firstItem: firstItem >= 0 ? firstItem : null,
        finish: ownProps.finish,
        pageId: ownProps.pageId,
        pageTitle: state.pages[ownProps.pageId.toString()].title
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    createCard: (text: ?string, image: ?string) => {
        dispatch(createCard(text, image, ownProps.pageId))
    }
});

const CardsListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
) (CardsList);

export default CardsListContainer