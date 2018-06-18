/**
 * Container for CardsList.
 *
 * @flow
 */

import { connect } from 'react-redux'
import CardsList from "../components/CardsList";

const mapStateToProps = state => {
    return {
        todoIds: state.todoIds
    }
};

const mapDispatchToProps = () => ({});

const CardsListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
) (CardsList);

export default CardsListContainer