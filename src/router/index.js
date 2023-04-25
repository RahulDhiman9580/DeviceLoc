import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

//screen imports.
import { DisplayInfoScreen, GetInfoScreen } from '../modules/deviceInfoModule';
import screenNames from '../utils/screenNames';
import { NavigationContainer } from '@react-navigation/native';


const MainRouter = createStackNavigator();

const MainRouterFile = () => {
    return (
        <NavigationContainer>
            <MainRouter.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <MainRouter.Screen
                    component={GetInfoScreen}
                    name={screenNames?.GET_INFO_SCREEN}
                />
                <MainRouter.Screen
                    component={DisplayInfoScreen}
                    name={screenNames?.DISPLAY_INFO_SCREEN}
                />
            </MainRouter.Navigator>
        </NavigationContainer>
    )
}

export default MainRouterFile

const styles = StyleSheet.create({})