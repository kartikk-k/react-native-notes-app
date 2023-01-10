import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useLayoutEffect, useState } from 'react'
import Header from '../components/Header'
import AuthContext from '../context/AuthContext'
import NotesContext from '../context/NotesContext'
import { useContext, useEffect } from 'react'


const Folder = () => {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(true)

    let { isAuthenticated } = useContext(AuthContext)
    let { getFolderNotes, folderNotes, note } = useContext(NotesContext)

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false })
    })

    const { params: {
        folderId,
        folderTitle
    } } = useRoute()

    useEffect(() => {
        getFolderNotes(folderId)
        setIsLoading(false)
    }, [note, isAuthenticated])


    return (
        <SafeAreaView className={`${Platform.OS === 'android' ? 'mt-10' : ''}`}>
            <Header headerText={"Folders"} />
            <View className="px-2 mt-5">
                <Text className="font-semibold text-lg">{folderTitle}</Text>
                {/* Folders */}
                {!isLoading ? (
                    <ScrollView className="bg-white my-2 p-2 divide-y divide-gray-300 rounded-md ">
                        {/* Folder */}
                        {folderNotes.length != 0 ? folderNotes.map((note, index) => (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('Note', {
                                noteId: note.id,
                                folderTitle: folderTitle
                            })} className="flex-row justify-between items-center py-2">
                                <Text>{note.title}</Text>
                                <Text className="text-xs">open</Text>
                            </TouchableOpacity>
                        )) : (<Text>Nothing to see here</Text>)}
                    </ScrollView>
                ) : <Text>Loading...</Text>}
            </View>
        </SafeAreaView>
    )
}

export default Folder