import { View, Text, TextInput, ScrollView } from 'react-native'
import React from 'react'
import {useSelector} from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import * as Icon from "react-native-feather"
import { themeColor } from '../theme'
import Categories from '../components/Categories'
import { featured } from '../constants'
import FeaturedRow from '../components/FeaturedRow'

const HomeScreen = () => {
  const username=useSelector((state)=>state.user.name)
  return (
    <SafeAreaView className="bg-white">
      <StatusBar barStyle="dark-content"/>
      <Text style={{fontWeight:'bold', fontSize:25}} >Welcome {username} </Text>
      {/* searchbar */}
      <View className="flex-row items-center space-x-0 px-4 pb-2" >
        <View className="flex-row flex-1 items-center p-3 rounded-full border-gray-300">
            <Icon.Search height="25" width="25" stroke="gray"/>
            <TextInput placeholder='Restaurant' className="ml-2 flex-1" />
            <View className="flex-row items-center space-x-1 border-l-2 pl-2 border-l-gray-300" >
                <Icon.MapPin height="20" width="20" stroke="gray"/>
                <Text className="text-gray-600" >New York,NYC</Text>
            </View>
        </View>
        <View style={{backgroundColor:themeColor.bgColor(1)}} className="p-3 rounded-full bg-gray-300" >
            <Icon.Sliders height="20" width="20" strokeWidth={2.5} stroke="white" />
        </View>
      </View>
      {/* main */}
      <ScrollView showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom:20
      }}
       >
        {/* categories */}
        <Categories/>
        {/* features */}
        <View className="mt-5" >
            {
                [featured, featured, featured].map((item,index)=>{
                    return(
                        <FeaturedRow
                        key={index}
                        title={item.title}
                        restaurants={item.restaurants}
                        description={item.description}
                        />
                    )
                })
            }
        </View>
       </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen