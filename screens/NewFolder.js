import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Platform } from 'react-native'
import HeaderAdvance from '../components/HeaderAdvance'
import supabase from '../utils/SupabaseClient'
import { useNavigation } from '@react-navigation/native'

const NewFolder = () => {
    const [input, setInput] = useState()
    const navigation = useNavigation()

    const createFolder = async () => {
        if (input && input != ' ') {
            try {
                let { data, error } = await supabase.from("NotesFolder").insert({
                    title: input
                }).single()

                navigation.navigate("Home")
            } catch { }
        }
    }

    return (
        <SafeAreaView className={`flex-1 ${Platform.OS === 'android' ? 'mt-10' : ''}`}>
            <View>
                <View className="flex-row justify-between items-center m-2">
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <Text className="text-gray-500 text-lg">Cancel</Text>
                    </TouchableOpacity>
                    <Text className="text-lg font-bold">New Folder</Text>
                    <TouchableOpacity onPress={createFolder}>
                        <Text className="text-lg">Done</Text>
                    </TouchableOpacity>
                </View>
                <TextInput onChangeText={value => setInput(value)} placeholder='Folder Name' className="border border-gray-300 p-2 bg-white text-lg rounded-md m-2" />
            </View>
        </SafeAreaView>
    )
}

export default NewFolder