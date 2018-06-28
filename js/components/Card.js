/**
 * Full screen card.
 *
 * @flow
 */

import React, { PureComponent } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import Globals from "../globals"
import CircleCheckBox from "./CircleCheckBox";

export default class Card extends PureComponent {

    makeTextEditable = (isEditable: Boolean) => {
        let pointerEvents = isEditable ? 'auto' : 'none';
        this._textInput.setNativeProps({
            editable: isEditable,
            pointerEvents: pointerEvents
        });

        if (isEditable) {
            this._textInput.focus()
        }
    };

    render() {
        return (
            <View
                onTouchMove={()=> this._textInput.blur()}
                style={styles.root}>
                <View style={styles.containerText}>
                    <TouchableOpacity
                        onLongPress={() => this.makeTextEditable(true)}>
                        <TextInput
                            ref={(component) => this._textInput = component}
                            style={styles.text}
                            editable={false}
                            multiline={true}
                            pointerEvents={'none'}
                            onBlur={() => this.makeTextEditable(false)}>
                            {this.props.text}
                        </TextInput>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerCheckBox}>
                    <CircleCheckBox
                        checked={this.props.isDone}
                        onToggle={this.props.onToggle}
                        outerSize={32}
                        outerColor={'black'}
                        filterSize={31}
                        filterColor={'white'}
                        innerSize={12}
                        innerColor={'black'}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    containerText: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Globals.STATUS_BAR_HEIGHT()
    },
    text: {
        fontSize: 24,
        fontWeight: "900",
        textAlign: 'center',
        paddingLeft: 16,
        paddingRight: 16
    },
    containerCheckBox: {
        flex: 1,
        alignItems: 'center'
    }
});

Card.propTypes = {
    text: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired
};