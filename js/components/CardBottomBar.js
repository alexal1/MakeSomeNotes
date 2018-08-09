/**
 * Bottom bar with controls for CardView.
 *
 * @flow
 */

import React, { PureComponent } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { scale } from "../globals";
import ColorButton from "./ColorButton";
import { cardColors } from "../resources/colors";

type Props = {
    onRef: (component: CardBottomBar) => {},
    currentColorIndex: number,
    onEditTextClick: () => void,
    onAddImageClick: () => void,
    onChooseColor: (colorIndex: number) => void
}

export default class CardBottomBar extends PureComponent<Props> {

    _isColorChoiceShown = false;
    _colorButtonsArray: ColorButton[] = [];

    hideColorChoice = () => {
        if (this._colorButtonsArray.find((colorButton) => colorButton.isTouchInProgress)) {
            return
        }

        this._colorButtonsArray.length = 0;
        this._isColorChoiceShown = false;
        this.forceUpdate()
    };

    _renderIconsPanel() {
        if (!this._isColorChoiceShown) return (
            <View style={[styles.panel, styles.iconsPanel]}>
                <TouchableOpacity onPress={() => {
                    this._isColorChoiceShown = true;
                    this.forceUpdate()
                }}>
                    <View style={[styles.circle, styles.icon, styles.iconRight]}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.props.onAddImageClick}>
                    <Image
                        style={[styles.icon, styles.iconMiddle]}
                        source={require('../resources/images/ic_camera_24_black.png')}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.props.onEditTextClick}>
                    <Image
                        style={[styles.icon, styles.iconMiddle]}
                        source={require('../resources/images/ic_edit_black.png')}/>
                </TouchableOpacity>
            </View>
        )
    }

    _renderColorChoicePanel() {
        if (this._isColorChoiceShown) return (
            <View style={[styles.panel, styles.colorChoicePanel]}>
                {cardColors.map((_, index) => {
                    return (
                        <ColorButton
                            onRef={(component) => {
                                this._colorButtonsArray.push(component)
                            }}
                            key={index}
                            colorIndex={index}
                            isSelected={index === this.props.currentColorIndex}
                            onPress={() => this.props.onChooseColor(index)}/>
                    )
                })}
            </View>
        )
    }

    render () {
        return (
            <View>
                {this._renderIconsPanel()}
                {this._renderColorChoicePanel()}
            </View>
        )
    }

    componentDidMount() {
        this.props.onRef(this)
    }
}

const styles = StyleSheet.create({
    panel: {
        marginLeft: scale(24),
        marginRight: scale(24),
        marginBottom: scale(20)
    },
    iconsPanel: {
        flexDirection: "row-reverse",
        height: scale(32),
        alignItems: "center"
    },
    icon: {
        opacity: 0.3,
        marginBottom: scale(2)
    },
    iconMiddle: {
        marginLeft: scale(6),
        marginRight: scale(6)
    },
    iconRight: {
        marginLeft: scale(6),
        marginRight: scale(2)
    },
    circle: {
        width: scale(20),
        height: scale(20),
        borderRadius: scale(10),
        borderWidth: scale(2),
        borderColor: 'black'
    },
    colorChoicePanel: {
        flexDirection: "row",
        height: scale(32),
        justifyContent: "space-between",
        alignItems: "center"
    }
});