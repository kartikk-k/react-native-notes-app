import { View, Text, SafeAreaView, Platform, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useState, useContext, useLayoutEffect } from 'react'
import AuthContext from '../context/AuthContext'
import NotesContext from '../context/NotesContext'
import Header from '../components/Header'
import supabase from '../utils/SupabaseClient'

const Note = () => {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(true)
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()

    let { getNote, note } = useContext(NotesContext)

    // receiving parameters
    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false })
    })

    const { params: {
        noteId,
        folderTitle
    } } = useRoute()

    useEffect(() => {
        getNote(noteId)

        // to prevent rendering of previous data
        if (note.id === noteId) {
            setIsLoading(false)
        }
    }, [note])

    const saveNote = async () => {
        console.log("saving")
        console.log(title, description)
        try {
            const { data, error } = await supabase.from("Notes").update({
                title: title,
                description: description
            }).eq("id", noteId)
        } catch { }
    }


    return (
        <SafeAreaView className={`${Platform.OS === 'android' ? 'mt-10' : ''}`}>
            <View className="flex-row justify-between items-center">
                <Header headerText={folderTitle} />
                <TouchableOpacity onPress={saveNote} className="px-4 py-1 mx-2 bg-black rounded-md">
                    <Text className="text-white text-base">Save</Text>
                </TouchableOpacity>
            </View>
            {!isLoading ? (
                <ScrollView className="p-2 flex-col divide-y divide-gray-300">
                    <View className="mb-5">
                        <Text className="text-xs text-gray-500">Title</Text>
                        <TextInput onChangeText={value => setTitle(value)} multiline={true} className="text-2xl font-bold tracking-wide">{note.title}</TextInput>
                    </View>
                    <View className="pt-5">
                        <Text className="text-xs text-gray-500">Description</Text>
                        <TextInput onChangeText={value => setDescription(value)} multiline={true} className="text-lg">{note.description}</TextInput>
                    </View>
                </ScrollView>
            ) : <Text>Loading...</Text>}
        </SafeAreaView>
    )
}

export default Note