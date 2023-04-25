import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

//util imports.
import { screenHeight, screenWidth, vw } from '../utils/dimensions';
import colors from '../utils/colors';

const Header = (props) => {
    const {
        title,
        leftImage,
        rightImage,
        onPressLeft,
        onPressRight
    } = props;
    return (
        <View style={styles.headerContainer} >
            <TouchableOpacity  onPress={onPressLeft} style={styles.leftImage} >
                <Image source={leftImage} style={styles.leftImageStyle} />
            </TouchableOpacity>
            <Text style={styles.headerText} >{title}</Text>
            <TouchableOpacity  onPress={onPressRight} style={styles.leftImage} >
                <Image source={rightImage} style={styles.leftImageStyle} />
            </TouchableOpacity>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    headerContainer: {
        height: vw(screenHeight / 18),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: vw(15),
        borderBottomWidth: vw(1),
    },
    leftImage: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: vw(2),
    },
    leftImageStyle: {
        width: vw(32),
        height: vw(32),
    },
    headerText: {
        fontSize: vw(18),
        fontWeight: '500',
        textAlign: 'center',
        width: vw(200)
    }
})