/**
 * Container for Card.
 *
 * @flow
 */

import { connect } from 'react-redux'
import Card from "../components/Card";
import PropTypes from 'prop-types'
import { toggleTodo } from "../actions";

const mapStateToProps = (state, ownProps) => {
    const todo = state.todoById[ownProps.id];
    return {
        text: todo.text,
        isDone: todo.isDone
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onToggle: () => dispatch(toggleTodo(ownProps.id))
});

const CardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
) (Card);

export default CardContainer

CardContainer.propTypes = {
    id: PropTypes.number.isRequired
};