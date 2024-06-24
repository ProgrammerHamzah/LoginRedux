import { View, Text, TouchableWithoutFeedback, Image } from 'react-native'
import React from 'react'
import * as Icon from "react-native-feather"
import { themeColor } from '../theme'

const RestaurantCard = ({item}) => {
  return (
    <TouchableWithoutFeedback>
      <View
      style={{
        shadowColor:themeColor.bgColor(0.2),
        shadowRadius:7
      }} 
      className="mr-6 bg-white rounded-xl shadow-lg" >
        <Image
        className="rounded-t-3xl"
        source={require('../assets/images/pizzaDish.png')}
        />
        <View
        className="px-3 pb-4 space-y-2"
        >
            <Text className="text-lg font-bold pt-2" >{item.name} </Text>
            <View className="flex-row items-center space-x-1" >
                <Image source={require('../assets/images/fullStar.png')} className="h-4 w-4" />
                <Text className="text-xs" >
                    <Text className="text-green-700" >{item.stars} </Text>
                    <Text className="text-gray-700" >({item.reviews} reviews) . <Text className="font-semibold">{item.category} </Text>
                    </Text>
                </Text>
            </View>
            <View className="flex-row items-center space-x-1" >
                <Icon.MapPin color="gray" width="11" height="15" />
                <Text className="text-gray-700 text-xs" >Nearby. {item.address} </Text>
            </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default RestaurantCard