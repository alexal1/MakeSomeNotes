/**
 * Circle button for color choosing.
 *
 * @flow
 */

import React, { PureComponent } from "react";
import { View } from "react-native";
import { scale } from "../globals";
import { cardColors } from "../resources/colors";

type Props = {
    onRef: (component: ColorButton) => void,
    onPress: () => void,
    colorIndex: number,
    isSelected: boolean
}

export default class ColorButton extends PureComponent<Props> {

    isTouchInProgress = false;

    _getCustomStyle() {
        const backgroundColor = cardColors[this.props.colorIndex];
        const isWhite = this.props.colorIndex === 0;
        const borderColor = isWhite ? 'black' : 'white';
        const opacity = isWhite ? 0.3 : 1.0;
        const size = isWhite ? scale(20) : scale(32);
        const borderRadius = isWhite? scale(10) : scale(16);
        return {
            width: this.props.isSelected ? size : scale(20),
            height: this.props.isSelected ? size : scale(20),
            borderRadius: this.props.isSelected ? borderRadius : scale(10),
            backgroundColor,
            borderWidth: this.props.isSelected ? scale(2) : 0,
            borderColor: this.props.isSelected ? borderColor : 'transparent',
            opacity: this.props.isSelected ? opacity : 1.0
        }
    }

    render() {
        return (
            <View
                onTouchStart={() => {
                    this.isTouchInProgress = true;
                    this.props.onPress()
                }}
                onTouchEnd={() => {
                    this.isTouchInProgress = false;
                }}
                style={this._getCustomStyle()} />
        )
    }

    componentDidMount() {
        this.props.onRef(this)
    }
}