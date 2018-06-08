/**
 * Container for CardsList.
 *
 * @flow
 */

import { connect } from 'react-redux'
import CardsList from "../components/CardsList";

const mapStateToProps = state => {
    return {
        titleIds: state.titleIds
    }
};

const mapDispatchToProps = () => ({});

const CardsListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
) (CardsList);

export default CardsListContainer