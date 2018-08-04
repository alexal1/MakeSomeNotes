/**
 * Top bar with controls for CardView.
 *
 * @flow
 */

import React, { PureComponent } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { scale } from "../globals";
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
import Globals from "../globals";
import { colorDarkGrey, colorWhite } from "../resources/colors";

type Props = {
    onRef: (component: CardTopBar) => {},
    deleteCard: () => void,
    deleteImage: () => void
}

export default class CardTopBar extends PureComponent<Props> {

    _cardPopupDialog: PopupDialog;
    _imagePopupDialog: PopupDialog;
    _slideAnimation = new SlideAnimation({
        slideFrom: 'bottom',
        useNativeDriver: true,
    });

    showImagePopup = () => {
        this._imagePopupDialog.show()
    };

    render () {
        return (
            <View>
                <View style={styles.bar}>
                    <Text style={styles.text}>
                        Notes
                    </Text>
                    <TouchableOpacity onPress={() => this._cardPopupDialog.show()}>
                        <Text style={styles.button}>
                            •••
                        </Text>
                    </TouchableOpacity>
                </View>

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
            </View>
        )
    }

    componentDidMount() {
        this.props.onRef(this)
    }
}

const styles = StyleSheet.create({
    bar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: scale(24),
        marginRight: scale(24),
        marginTop: Globals.STATUS_BAR_HEIGHT() + scale(26),
    },
    text: {
        fontSize: 13,
        lineHeight: 20,
        opacity: 0.4
    },
    button: {
        fontSize: 11,
        opacity: 0.4
    },
    dialog: {
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