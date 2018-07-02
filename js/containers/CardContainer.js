/**
 * Container for Card.
 *
 * @flow
 */

import { connect } from 'react-redux'
import Card from "../components/Card";
import PropTypes from 'prop-types'
import { editText } from "../actions";

const mapStateToProps = (state, ownProps) => {
    const item = state.items[ownProps.id];
    return {
        text: item.text,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    save: (newText: string) => dispatch(editText(ownProps.id, newText))
});

const CardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
) (Card);

export default CardContainer

CardContainer.propTypes = {
    id: PropTypes.number.isRequired
};