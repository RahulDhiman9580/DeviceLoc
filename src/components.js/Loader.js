import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Modal, ActivityIndicator } from 'react-native';
import LottieView from 'lottie-react-native';
import colors from '../utils/colors';
import { vh, vw } from '../utils/dimensions';

//Custom Imports



const Loader = (props) => {
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={true}
      onRequestClose={() => {
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <View style={{
            width: vw(250),
            height: vh(150)
          }}>
            <LottieView resizeMode='contain'
              source={require('../assets/animation.json')} autoPlay loop />
          </View>
          <Text style={styles.loaderText}>{'Please wait...'}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: colors.transparentBlack,
  },
  activityIndicatorWrapper: {
    // flexDirection: 'row',
    backgroundColor: colors.WHITE,
    height: vh(180),
    width: vw(280),
    borderRadius: vw(10),
    // display: 'flex',
    alignItems: 'center',
    // justifyContent: 'space-around',
    // padding: vw(20),
    marginHorizontal: vw(21),
  },
  loaderText: {
    fontSize: vw(16),
    marginBottom: vh(50),
    color: colors.black,
  },
});

export default Loader;
