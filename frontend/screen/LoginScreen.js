import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { updateUser } from '../action/action'

const SERVER_URL='http://10.0.2.2:3000'

const LoginScreen = ({navigation}) => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const dispatch=useDispatch()

    const handleLogin=async()=>{
        try {
            const response=await axios.post(`${SERVER_URL}/login`,{email,password})
            const token=response.data.token
            await AsyncStorage.setItem('token',token)
            dispatch(updateUser(email))
            setEmail('')
            navigation.navigate('home')
        } catch (err) {
            Alert.alert('Error',err.response.data.message)
        }
    }
  return (
    <View>
      <TextInput placeholder='Email' onChangeText={setEmail} />
      <TextInput placeholder='Password' onChangeText={setPassword} secureTextEntry />
      <Button title='login' onPress={handleLogin} />
      <View>
        <Text>don't have an account?</Text>
        <TouchableOpacity>
            <Text onPress={()=>navigation.navigate('register')} >Register here</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginScreen