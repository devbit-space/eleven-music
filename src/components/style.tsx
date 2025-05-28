import React from 'react';
import {  StyleSheet } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Platform, Dimensions, StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const { width, height } = Dimensions.get('screen');

const objectiveScreenHeight = (number = 0, space = 2) => {
    if (height >= 812) {
        return number;
    } else {
        return number - space;
    }
}

const statusBarHeight = () => {
    if (Platform.OS === 'android') {
        return StatusBar.currentHeight || 0;
    } else {
        if (getStatusBarHeight() === 20) {
            if (height > 851) {
                return getStatusBarHeight() * 2.08;
            }
        }
        return getStatusBarHeight() || 0;
    }
}

export const w = (w: number) => wp(w + '%')
export const h = (h: number) => hp(h + '%')

export const colors = {
	border: "#EBE9E8",
	purple:"#714CB4",
	blue: "#2c6fd4", 
	gray: "#aaa",
	darkGray: "#666",
	white: "#FFF", 
	danger: "#FF3E24",
	warning: "#FFC000",	
	dangerSecond: "rgba(255, 0, 0, 0.8)",
	success: "#3EEA3A",
	successSecond: "rgba(16, 174, 58, 0.6);	",
	black: "#000000", 
}

export const textColor = {
	white: { color: colors.white },
	danger: { color: colors.dangerSecond },
	warning: { color: colors.warning },
	success: { color: colors.successSecond },
	blue: { color: colors.blue }
}

export const gFont = {
	t1: { fontSize: hp('5%')}, 
	t2: { fontSize: hp('3.5%')},
	t3: { fontSize: hp('2.5%')},
	t4: { fontSize: hp('2.2%')},
	t5: { fontSize: hp('2%')},
	t6: { fontSize: hp('1.9%')},
	t7: { fontSize: hp('1.5%')},
}

export const font = StyleSheet.create({
	t: {
		fontFamily: "Poppins"
	}
})