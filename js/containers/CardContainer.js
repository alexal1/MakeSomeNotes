/**
 * Container for Card.
 *
 * @flow
 */

import { connect } from 'react-redux'
import Card from "../components/Card";
import PropTypes from 'prop-types'

const mapStateToProps = (state, ownProps) => {
    return {
        text: state.titleById[ownProps.id]
    }
};

const mapDispatchToProps = () => ({});

const CardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
) (Card);

export default CardContainer

CardContainer.propTypes = {
    id: PropTypes.number.isRequired
};