import { View, Text, TextInput, SafeAreaView, TouchableOpacity, Platform, KeyboardAvoidingView, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect, useState } from 'react'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'


const Register = () => {
    const navigation = useNavigation()
    const { register } = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [])


    const handleRegister = () => {
        if (password.length < 6) {
            Alert.alert("Atleast 6 characters required")
        } else {
            register(email, password)
        }
    }

    return (
        <SafeAreaView className={`${Platform.OS === 'android' ? 'mt-10' : ''} flex-1 justify-center items-center`}>
            <KeyboardAvoidingView behavior='position'>
                <View className="flex-col space-y-8 p-8 border border-gray-300 rounded-md">
                    <Text className="text-2xl font-bold">Register with email</Text>

                    {/* Input fields */}
                    <View className="flex-col space-y-4">
                        <View className="flex-col space-y-2">
                            <Text>Email Id</Text>
                            <TextInput onChangeText={value => setEmail(value)} value={email} keyboardType='email-address' enablesReturnKeyAutomatically={true} autoCorrect={false} returnKeyType="next" placeholder='youremail@example.com' className="border-b border-b-gray-300 focus:border-b-black" />
                        </View>
                        <View className="flex-col space-y-2">
                            <Text>Password</Text>
                            <TextInput onChangeText={value => setPassword(value)} value={password} secureTextEntry={true} enablesReturnKeyAutomatically={true} autoCorrect={false} placeholder="enter password" className="border-b border-b-gray-300 focus:border-b-black" />
                        </View>

                        {/* buttons */}
                        <TouchableOpacity onPress={handleRegister} className="bg-black py-3 rounded-md">
                            <Text className="text-white text-center">Register</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text className="text-xs text-gray-500 text-center">Already have an account? <Text className="text-blue-700">Login</Text></Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Register