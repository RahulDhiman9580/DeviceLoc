import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../../../components.js/Header';
import localImages from '../../../utils/localImages';
import { vw } from '../../../utils/dimensions';
import colors from '../../../utils/colors';

export const DisplayInfoScreen = (props) => {
  const { navigation } = props;
  const { info } = useSelector((state) => state?.generalInfoReducer);

  return (
    <>
      <Header
        title={'Users List'}
        leftImage={localImages?.BACK_ICON}
        onPressLeft={() => navigation?.goBack()}
      />
      <FlatList
        data={info}
        renderItem={({ item }) => item?.lat > 0 ? <RenderItem item={item} /> : <></>}
        contentContainerStyle={styles.flatliatContainer}
      />
    </>
  )
};

const RenderItem = ({ item }) => {
  return (
    <View>
    <View style={styles.renderItemStyle} >
      <Image style={styles.image} source={item?.profileImage?.length ? { uri: item?.profileImage } : localImages?.PLACE_HOLDER_IMG} />
      <View>
        <Text>{`DeviceId: ${item.deviceId}`}</Text>
        <Text>{`Lat: ${item.lat}`}</Text>
        <Text>{`Long: ${item.long}`}</Text>
      </View>
    </View>
    <View style={styles.seperator} />
    </View>
  );
}


const styles = StyleSheet.create({
  image:{
    width: vw(50),
    height:vw(50),
    borderRadius: vw(25), marginRight: vw(10)
  },
  renderItemStyle:{ 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: vw(20), 
    paddingHorizontal: vw(20) 
  },
  seperator: {
    borderWidth: vw(0.5), 
    width: vw(335), 
    alignSelf: 'center', 
    marginTop: vw(10), 
    borderColor: colors.transparentBlack
  },
  flatliatContainer:{
    paddingBottom: vw(200)
  }
})