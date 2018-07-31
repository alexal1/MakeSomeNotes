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

type Props = {}

export default class CardTopBar extends PureComponent<Props> {

    _popupDialog: PopupDialog;
    _slideAnimation = new SlideAnimation({
        slideFrom: 'bottom',
        useNativeDriver: true,
    });

    render () {
        return (
            <View>
                <View style={styles.bar}>
                    <Text style={styles.text}>
                        Notes
                    </Text>
                    <TouchableOpacity onPress={() => this._popupDialog.show()}>
                        <Text style={styles.button}>
                            •••
                        </Text>
                    </TouchableOpacity>
                </View>

                <PopupDialog
                    width={Globals.SCREEN_WIDTH - scale(16) * 2}
                    dialogStyle={styles.dialogStyle}
                    dialogAnimation={this._slideAnimation}
                    ref={(component) => this._popupDialog = component}>
                    <View>
                        <Text>Hello</Text>
                    </View>
                </PopupDialog>
            </View>
        )
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
    dialogStyle: {
        // TODO: add some style
    }
});