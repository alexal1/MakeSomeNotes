/**
 * Popup windows with options for a card / image.
 *
 * @flow
 */

import React, { PureComponent } from "react";
import PopupDialog, { SlideAnimation } from "react-native-popup-dialog";
import Globals, { scale } from "../globals";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colorDarkGrey, colorWhite } from "../resources/colors";

type Props = {
    onRef: (component: CardPopup) => {},
    deleteCard: () => void,
    deleteImage: () => void
}

export default class CardPopup extends PureComponent<Props> {

    _cardPopupDialog: PopupDialog;
    _imagePopupDialog: PopupDialog;
    _slideAnimation = new SlideAnimation({
        slideFrom: 'bottom',
        useNativeDriver: true,
    });

    showImagePopup = () => {
        this._imagePopupDialog.show()
    };

    showCardPopup = () => {
        this._cardPopupDialog.show()
    };

    render() {
        return (
            <React.Fragment>
                {/* Card popup dialog */}
                <PopupDialog
                    width={Globals.SCREEN_WIDTH - scale(16) * 2}
                    dialogStyle={styles.dialog}
                    dialogAnimation={this._slideAnimation}
                    overlayOpacity={0.1}
                    ref={(component) => this._cardPopupDialog = component}>
                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.deleteCard();
                                this._cardPopupDialog.dismiss()}
                            }>
                            <Text style={[styles.dialogButton, styles.dialogButtonTop]}>
                                Delete
                            </Text>
                        </TouchableOpacity>
                    </View>
                </PopupDialog>

                {/* Image popup dialog */}
                <PopupDialog
                    width={Globals.SCREEN_WIDTH - scale(16) * 2}
                    height={scale(88)}
                    dialogStyle={[styles.dialog, styles.imageDialog]}
                    dialogAnimation={this._slideAnimation}
                    overlayOpacity={0.1}
                    ref={(component) => this._imagePopupDialog = component}>
                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.deleteImage();
                                this._imagePopupDialog.dismiss()}
                            }>
                            <Text style={styles.dialogButton}>
                                Delete
                            </Text>
                        </TouchableOpacity>
                    </View>
                </PopupDialog>
            </React.Fragment>
        )
    }

    componentDidMount() {
        this.props.onRef(this)
    }

}

const styles = StyleSheet.create({
    dialog: {
        position: "absolute",
        backgroundColor: colorDarkGrey,
        alignItems: "stretch"
    },
    imageDialog: {
        justifyContent: "center"
    },
    dialogButton: {
        color: colorWhite,
        fontSize: 16,
        lineHeight: 24,
        marginLeft: scale(24),
        marginRight: scale(24)
    },
    dialogButtonTop: {
        marginTop: scale(32)
    }
});