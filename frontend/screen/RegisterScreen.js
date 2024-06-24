import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import axios from 'axios'

const SERVER_URL='http://10.0.2.2:3000'

const RegisterScreen = ({navigation}) => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const otp=Math.floor(Math.random()*1000000)

    const handleRegister=async()=>{
        try {
            await axios.post(`${SERVER_URL}/register`,{email,password,otp})
            Alert.alert('Success','User created')
        } catch (err) {
            Alert.alert('Error',err.response.data.message)
        }
    }
  return (
    <View>
      <TextInput placeholder='Username' onChangeText={setEmail} />
      <TextInput placeholder='Password' onChangeText={setPassword} secureTextEntry />
      <Button title='Register' onPress={handleRegister} />
      <View>
        <Text>Already have an account?</Text>
        <TouchableOpacity>
            <Text onPress={()=>navigation.navigate('login')}>Login Here</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default RegisterScreen