import { ActivityIndicator, Alert, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { memo, useEffect, useState } from 'react';
import DeviceInfo, { getDeviceId } from 'react-native-device-info';

//util imports
import colors from '../../../utils/colors'
import Header from '../../../components.js/Header';
import localImages from '../../../utils/localImages';
import { screenHeight, screenWidth, vw } from '../../../utils/dimensions';
import common from '../../../utils/common';
import RNFetchBlob from 'rn-fetch-blob';
import { useDispatch } from 'react-redux';
import Loader from '../../../components.js/Loader';
import { addInfoLocally } from '../action';
import screenNames from '../../../utils/screenNames';

export const GetInfoScreen = (props) => {
    const { navigation } = props;
    const dispatch = useDispatch();
    const [imagePath, setImagePath] = useState('');
    const [deviceId, setDeviceId] = useState('');
    const [cords, setcords] = useState({
        long: '',
        lat: ''
    });
    const [imageObj, setImageObj] = useState({
        name: '',
        fileName: '',
        data: '',
        type: ''
    });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        getDeviceId();
        common.getLocation(geoLocationSuccess, geoLocationError)
    }, []);

    const getDeviceId = async () => {
        const uniqueId = await DeviceInfo?.getUniqueId();
        console.log('IDDDD ====> ', uniqueId)
        setDeviceId(uniqueId);
    };

    const geoLocationSuccess = (response) => {
        console.log('response of geolocation : ', response);
        setcords({
            lat: response?.lat,
            long: response?.long
        })
    };

    const geoLocationError = (error) => {
        Alert.alert('Error fetching lat long.')
        console.log('error of geolocation', error);
    };

    const uploadImage = () => {
        console.log('pressed:');
        common.launchPhoneCamera(
            (response) => {
                console.log('response of camera click : ', response);
                let imageObjTemp = {
                    fileName: response?.assets?.[0]?.fileName,
                    name: response?.assets?.[0]?.fileName,
                    type: 'image/png',
                    data: response?.assets?.[0]?.uri
                };

                setImagePath(response?.assets?.[0]?.uri);
                setImageObj(imageObjTemp)
            }
        );
    };

    const onPressSubmit = () => {
        setUploading(true);
        // RNFetchBlob.
        RNFetchBlob.fetch('POST', 'https://httpbin.org/post', {
            'Content-Type': 'multipart/form-data',
        }, [
            { name: 'deviceid', data: deviceId },
            { name: 'lat', data: cords?.lat },
            { name: 'log', data: cords?.long },
            imageObj
        ]).then((resp) => {
            // ...
            console.log('response on rnfetch : ', resp);
            setUploading(false);
            if (resp?.respInfo?.status == 200) {
                dispatch(addInfoLocally({
                    profileImage: imagePath,
                    deviceId: deviceId,
                    lat: cords?.lat,
                    long: cords.long
                }));
                setImageObj({});
                setImagePath('');
                setcords({
                lat:0,
                long:0
                })
                navigation?.navigate(screenNames.DISPLAY_INFO_SCREEN)
            } else {
                Alert.alert('Error uploading information.', 'Please Try Again!')
            }

        }).catch((err) => {
            // ...
            setUploading(false);
            Alert.alert('Error uploading information.', 'Please Try Again!')
            console?.log('error on rnfetch : ', err)
        })
    };

    return (
        <SafeAreaView style={styles.mainView} >
            {/* <Header
                title={'User Information'}
            /> */}
            <Text style={styles.userInfoTxt} >{'User Information'}</Text>
            <View>
                <TouchableOpacity onPress={uploadImage} style={styles.ImageHolder} >
                    <Image style={styles.imageStyle} source={imagePath?.length ? { uri: imagePath } : localImages?.PLACE_HOLDER_IMG} />
                    <Image style={styles.cameraIcon} source={localImages?.CAMERA_ICON} />
                </TouchableOpacity>
                {/* {
                !imagePath?.length ? <Text style={styles.mandateTxt} >{`*Please add your image, its mandatory.`}</Text> : <></>
            } */}
                <View style={styles.listHolder} >
                    <RenderRow title={'Device ID : '} value={deviceId} />
                    <RenderRow title={'Longitude : '} value={cords?.long} />
                    <RenderRow title={'Latitude : '} value={cords?.lat} />
                </View>
            </View>

            {
               cords?.lat > 0 && cords?.long > 0 && <TouchableOpacity activeOpacity={1} onPress={onPressSubmit} style={styles.submitBtn} >
                    <Text style={styles.submitBtnTxt} >{'Submit'}</Text>
                </TouchableOpacity>
            }
            {
              uploading &&  <View style={{flex:1, backgroundColor: colors?.transparentBlack, position: 'absolute', top:0, bottom: 0, left: 0, right:0}} > 
                    <ActivityIndicator size={100} style={{ position:'absolute', alignSelf: 'center', top: screenHeight/3 }} />
                </View>
            }
        </SafeAreaView>
    )
};

const RenderRow = memo(({ title, value }) => {
    return (
        <View style={styles.rowHolder} >
            <Text style={styles.rowTitle} >{title}</Text>
            <Text style={styles.rowValue} >{value}</Text>
        </View>
    );
})
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: colors?.BLACK_90,
    },
    userInfoTxt: {
        fontSize: vw(20),
        fontWeight: '600',
        letterSpacing: vw(0.6),
        alignSelf: 'center',
        color: colors.WHITE
    },
    ImageHolder: {
        width: vw(100),
        height: vw(100),
        alignSelf: 'center',
        marginTop: vw(screenHeight / 15),
        borderRadius: vw(50),
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 4,
        top: vw(60),
        borderWidth: 2
    },
    imageStyle: {
        width: vw(100),
        height: vw(100),
        borderRadius: vw(50),
        zIndex: -1
    },
    cameraIcon: {
        position: 'absolute',
        right: vw(-5),
        bottom: vw(-2)
    },
    mandateTxt: {
        alignSelf: 'center',
        marginTop: vw(10),
        fontSize: vw(12),
        color: colors.RED
    },
    rowHolder: {
        flexDirection: 'row',
        alignItems: 'center',
        width: vw(350),
        alignSelf: 'center',
    },
    rowTitle: {
        fontSize: vw(14),
        fontStyle: 'italic',
        fontWeight: '500',
        paddingHorizontal: vw(30),
        marginTop: vw(30),
    },
    rowValue: {
        fontSize: vw(14),
        marginTop: vw(30),
        width: vw(170)
    },
    listHolder: {
        backgroundColor: colors?.DUST_YELLOW,
        borderRadius: vw(30),
        width: vw(screenWidth / 1.2),
        alignSelf: 'center',
        paddingTop: vw(100),
        paddingBottom: vw(50),
        paddingHorizontal: vw(20),
        marginTop: vw(screenHeight / 5)
    },
    submitBtn: {
        width: vw(100),
        height: vw(50),
        marginTop: vw(50),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: vw(100),
        backgroundColor: colors.WHITE
    },
    submitBtnTxt: {
        fontSize: vw(16),
        fontWeight: '500'
    }
})