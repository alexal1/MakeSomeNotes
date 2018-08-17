/**
 * Full screen card.
 *
 * @flow
 */

import React, { PureComponent } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native'
import { openImagePicker, scale } from "../globals"
import type { ItemImage, ItemText } from "../reducers/items";
import ImageView from "./ImageView";
import CardBottomBar from "./CardBottomBar";
import CardTopBar from "./CardTopBar";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { cardColors } from "../resources/colors";
import Globals from "../globals";
import CardPopup from "./CardPopup";

type Props = {
    itemText: ?ItemText,
    itemImage: ?ItemImage,
    cardColorIndex: number,
    addItemText: () => void,
    addItemImage: (base64: string) => void,
    deleteItem: (id: number) => void,
    deleteCard: () => void,
    updateItemText: (itemTextId: number, newText: string) => void,
    updateItemImage: (itemImageId: number, newBase64: string) => void,
    setColor: (colorIndex: number) => void,
    finish: () => void
}

export default class CardView extends PureComponent<Props> {

    _cardTopBar: CardTopBar;
    _cardBottomBar: CardBottomBar;
    _cardPopup: CardPopup;
    _textInput: ?TextInput = null;
    _isTextInputEditable = false;

    _makeTextEditable = (isEditable: boolean) => {
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

    _getStyleForBackground = () => {
        const backgroundColor = cardColors[this.props.cardColorIndex];
        return { backgroundColor }
    };

    _renderImage = () => {
        if (this.props.itemImage != null)
            return (
                <ImageView
                    style={styles.image}
                    base64={this.props.itemImage.base64}
                    showImagePopup={() => this._cardPopup.showImagePopup()}/>
            );
        else
            return null
    };

    _renderText = () => {
        if (this.props.itemText != null) {
            const id = this.props.itemText.id;
            return (
                <TouchableOpacity
                    onLongPress={() => this._makeTextEditable(true)}>
                    <TextInput
                        ref={(component) => this._textInput = component}
                        style={styles.text}
                        editable={false}
                        multiline={true}
                        pointerEvents={'none'}
                        onChangeText={(text) => this.props.updateItemText(id, text)}
                        onBlur={() => this._makeTextEditable(false)}
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
            <View style={[styles.root, this._getStyleForBackground()]}>
                <KeyboardAwareScrollView
                    onTouchStart={() => this._cardBottomBar.hideColorChoice()}
                    onTouchMove={()=> this._textInput && this._textInput.blur()}
                    contentContainerStyle={styles.scrollView}>
                    <CardBottomBar
                        onRef={(component) => this._cardBottomBar = component}
                        currentColorIndex={this.props.cardColorIndex}
                        onEditTextClick={() => {
                            if (this.props.itemText == null) {
                                this.props.addItemText();
                            }
                            this._makeTextEditable(true)
                        }}
                        onAddImageClick={() => {
                            const imageWidth = ImageView.obtainImageWidth();
                            if (this.props.itemImage == null) {
                                const completion = (base64: string) => this.props.addItemImage(base64);
                                openImagePicker(imageWidth, imageWidth, completion);
                            }
                            else {
                                const itemImageId = this.props.itemImage.id;
                                const completion = (base64: string) => this.props.updateItemImage(itemImageId, base64);
                                openImagePicker(imageWidth, imageWidth, completion);
                            }
                        }}
                        onChooseColor={this.props.setColor}/>
                    <View>
                        {this._renderImage()}
                        {this._renderText()}
                    </View>
                    <CardTopBar
                        showCardPopup={() => this._cardPopup.showCardPopup()}
                        finish={this.props.finish}/>
                </KeyboardAwareScrollView>

                <CardPopup
                    onRef={(component) => this._cardPopup = component}
                    deleteCard={this.props.deleteCard}
                    deleteImage={() => {
                        const itemImage = this.props.itemImage;
                        itemImage && this.props.deleteItem(itemImage.id)
                    }}/>
            </View>
        )
    }

    componentDidMount() {
        const itemText = this.props.itemText;
        const itemImage = this.props.itemImage;

        // Delete ItemText if it is empty and ItemImage exists
        if (itemText != null && itemImage != null && itemText.text === "") {
            this.props.deleteItem(itemText.id)
        }
    }

    componentDidUpdate() {
        this._makeTextEditable(this._isTextInputEditable)
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    scrollView: {
        flex: 1,
        flexDirection: 'column-reverse',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        marginBottom: Globals.STATUS_BAR_HEIGHT()
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