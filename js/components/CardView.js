/**
 * Full screen card.
 *
 * @flow
 */

import React, { PureComponent } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native'
import Globals, { scale } from "../globals"
import type { ItemImage, ItemText } from "../reducers/items";
import ImageView from "./ImageView";
import CardBottomBar from "./CardBottomBar";
import CardTopBar from "./CardTopBar";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

type Props = {
    itemText: ?ItemText,
    itemImage: ?ItemImage,
    addItemText: () => void,
    save: (itemTextId: number, newText: string) => {}
}

export default class CardView extends PureComponent<Props> {

    _textInput: ?TextInput = null;
    _isTextInputEditable = false;

    makeTextEditable = (isEditable: boolean) => {
        this._isTextInputEditable = isEditable;
        let pointerEvents = isEditable ? 'auto' : 'none';
        this._textInput && this._textInput.setNativeProps({
            editable: isEditable,
            pointerEvents: pointerEvents
        });

        if (isEditable) {
            this._textInput && this._textInput.focus()
        }
    };

    renderImage = () => {
        if (this.props.itemImage != null)
            return (
                <ImageView
                    style={styles.image}
                    base64={this.props.itemImage.base64}/>
            );
        else
            return null
    };

    renderText = () => {
        if (this.props.itemText != null) {
            const id = this.props.itemText.id;
            return (
                <TouchableOpacity
                    onLongPress={() => this.makeTextEditable(true)}>
                    <TextInput
                        ref={(component) => this._textInput = component}
                        style={styles.text}
                        editable={false}
                        multiline={true}
                        pointerEvents={'none'}
                        onChangeText={(text) => this.props.save(id, text)}
                        onBlur={() => this.makeTextEditable(false)}
                        placeholder={"Some note..."}
                        returnKeyType={"done"}
                        blurOnSubmit={true}>
                        {this.props.itemText.text}
                    </TextInput>
                </TouchableOpacity>
            );
        }
        else
            return null
    };

    render() {
        return (
            <KeyboardAwareScrollView
                onTouchMove={()=> this._textInput && this._textInput.blur()}
                contentContainerStyle={styles.root}>
                <CardTopBar/>
                <View>
                    {this.renderImage()}
                    {this.renderText()}
                </View>
                <CardBottomBar onEditTextClick={() => {
                    if (this.props.itemText == null) {
                        this.props.addItemText();
                    }
                    this.makeTextEditable(true)
                }}/>
            </KeyboardAwareScrollView>
        )
    }

    componentDidUpdate() {
        this.makeTextEditable(this._isTextInputEditable)
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        marginTop: Globals.STATUS_BAR_HEIGHT()
    },
    image: {
        // TODO: add some style
    },
    text: {
        fontSize: 13,
        fontWeight: "500",
        marginLeft: scale(24),
        marginRight: scale(24),
        lineHeight: 20,
        opacity: 0.9
    }
});