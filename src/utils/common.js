import {Alert} from 'react-native'
import axios, { AxiosInstance } from 'axios';
import { check, openSettings, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import { launchCamera } from 'react-native-image-picker';


const FINAL_API_URL = 'https://httpbin.org/';
const $http = axios.create({
  baseURL: FINAL_API_URL,
  timeout: 30000,
  headers: {
    'content-type': 'application/json; charset=utf-8',
  },
});

const getLocation = (successCallback, errorCallback) => {
  let locationPermission = Platform.OS === 'ios' ? (PERMISSIONS.IOS.LOCATION_WHEN_IN_USE || PERMISSIONS.IOS.LOCATION_ALWAYS) : (PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION || PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)
  check(locationPermission).then(res => {
    switch (res) {
      case RESULTS.GRANTED: getGeoLocation(successCallback, errorCallback); break;
      default: request(locationPermission)?.then(resp => {
        if (resp === RESULTS.GRANTED) {
          getGeoLocation(successCallback, errorCallback);
        } else {
          Alert.alert('Please provide location access.', '', [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel"
            },
            { text: "Allow", onPress: () => openSettings() }
          ]);
        }
      })
    }
  })
};

const getGeoLocation = (successCallback, errorCallback) => {
  Geolocation.getCurrentPosition(loc => {
      successCallback({
        lat: loc?.coords?.latitude,
        long: loc?.coords?.longitude
      })
  }, (err) => {
    errorCallback(err)
  }, {
    enableHighAccuracy: false,
    timeout: 20000,
    maximumAge: 1000,
    showLocationDialog: true,
    forceRequestLocation: true
  })
};

const launchPhoneCamera = (callbackSuccess) => {
  let options = {
    mediaType: 'photo',
    selectionLimit: 1
  }
  launchCamera(options, callbackSuccess);
};

export default {
  $http,
  getLocation,
  launchPhoneCamera
};