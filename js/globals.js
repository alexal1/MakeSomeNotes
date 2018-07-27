/**
 * Global constants.
 *
 * @flow
 */

import { Dimensions, Platform, StatusBar } from "react-native";
import { ifIphoneX } from 'react-native-iphone-x-helper';

const { width, height } = Dimensions.get('window');

export default {
    SCREEN_WIDTH: width,
    SCREEN_HEIGHT: height,
    STATUS_BAR_HEIGHT: () => {
        if (Platform.OS === 'ios') {
            return ifIphoneX(44, 20);
        }
        else {
            return StatusBar.currentHeight;
        }
    }
}

//Guideline sizes are based on iPhone 5, 5s, 5c, SE screen
const guidelineBaseWidth = 320;
const guidelineBaseHeight = 568;

const scale = (size: number) => width / guidelineBaseWidth * size;
const verticalScale = (size: number) => height / guidelineBaseHeight * size;
const moderateScale = (size: number, factor: number = 0.5) => size + (scale(size) - size) * factor;

export {scale, verticalScale, moderateScale};