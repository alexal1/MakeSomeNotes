/**
 * Global constants.
 *
 * @flow
 */

import { Dimensions, Platform, StatusBar } from "react-native";
import { ifIphoneX } from 'react-native-iphone-x-helper';

export default {
    SCREEN_WIDTH: Dimensions.get('window').width,
    SCREEN_HEIGHT: Dimensions.get('window').height,
    STATUS_BAR_HEIGHT: () => {
        if (Platform.OS === 'ios') {
            return ifIphoneX(44, 20);
        }
        else {
            return StatusBar.currentHeight;
        }
    }
}