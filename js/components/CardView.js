/**
 * Full screen card.
 *
 * @flow
 */

import React, { PureComponent } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Image } from 'react-native'
import Globals from "../globals"
import type { ItemImage, ItemText } from "../reducers/items";
import ImageView from "./ImageView";

type Props = {
    itemText: ?ItemText,
    itemImage: ?ItemImage,
    save: (itemTextId: number, newText: string) => {}
}

export default class CardView extends PureComponent<Props> {

    _textInput: TextInput;

    makeTextEditable = (isEditable: boolean) => {
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
                <ImageView
                    style={styles.image}
                    base64={this.props.itemImage != null ? this.props.itemImage.base64 : ""}/>
                <TouchableOpacity
                    onLongPress={() => this.makeTextEditable(true)}>
                    <TextInput
                        ref={(component) => this._textInput = component}
                        style={styles.text}
                        editable={false}
                        multiline={true}
                        pointerEvents={'none'}
                        onChangeText={(text) =>
                            this.props.itemText != null
                                ? this.props.save(this.props.itemText.id, text)
                                : {}
                        }
                        onBlur={() => this.makeTextEditable(false)}
                        placeholder={"Some note..."}>
                        {this.props.itemText != null ? this.props.itemText.text : ""}
                    </TextInput>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Globals.STATUS_BAR_HEIGHT()
    },
    image: {
        // TODO: add some style
    },
    text: {
        fontSize: 24,
        fontWeight: "900",
        textAlign: 'center',
        paddingLeft: 16,
        paddingRight: 16
    }
});