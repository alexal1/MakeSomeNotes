/**
 * Horizontal scrollable list of Cards.
 *
 * @flow
 */

import React, { PureComponent } from "react";
import { FlatList } from "react-native";
import PropTypes from 'prop-types'
import CardContainer from "../containers/CardContainer";

export default class CardsList extends PureComponent {
    render() {
        return (
            <FlatList
                data={this.props.titleIds}
                renderItem={({item}) => <CardContainer id={item}/>}
                keyExtractor={(item) => item.toString()}
                horizontal={true}
            />
        )
    }
}

CardsList.propTypes = {
    titleIds: PropTypes.array.isRequired
};