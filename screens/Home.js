import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { Platform } from 'react-native'
import { AddIcon } from '../components/SvgIcons'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import NotesContext from '../context/NotesContext'

const Home = () => {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(true)

    let { userId, isAuthenticated, logout } = useContext(AuthContext)
    let { getNoteFolders, notesFolder } = useContext(NotesContext)

    useEffect(() => {
        getNoteFolders()
        setIsLoading(false)
    }, [isAuthenticated, userId])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])


    return (
        <SafeAreaView className={`flex-1 ${Platform.OS === 'android' ? 'mt-10' : ''}`}>
            <View className="flex-col flex-1">
                {/* Header */}
                <View className="p-2">
                    <View className="flex-row justify-between items-center">
                        <Text className="text-lg font-semibold">NotesPro</Text>
                        {/* <TouchableOpacity className="z-50">
                            <MenuIcon stroke="#000000" strokeWidth="2.5" />
                        </TouchableOpacity> */}
                        {isAuthenticated ? (
                            <TouchableOpacity onPress={logout} className="mt-5">
                                <Text className="text-center">Logout</Text>
                            </TouchableOpacity>
                        ) : <TouchableOpacity onPress={() => navigation.navigate("Login")} className="mt-5">
                            <Text className="text-center">Login</Text>
                        </TouchableOpacity>
                        }
                    </View>
                    <Text className="text-xs text-gray-500">For smart people</Text>
                </View>
                {/* Notes Categories */}
                <View className="px-2 mt-5 z-0">
                    <Text className="font-semibold text-lg">Folders</Text>

                    {/* Folders */}
                    {!isLoading ? (
                        <ScrollView className="bg-white my-2 p-2 divide-y divide-gray-300 rounded-md ">
                            {/* Folder */}
                            {notesFolder.length != 0 ? notesFolder.map((folder, index) => (
                                <TouchableOpacity key={index} onPress={() => navigation.navigate('Folder', {
                                    folderId: folder.id,
                                    folderTitle: folder.title
                                })} className="flex-row justify-between items-center py-2">
                                    <Text className="">{folder.title}</Text>
                                    <Text className="text-xs">open</Text>
                                </TouchableOpacity>
                            )) : <Text>Nothing to see here</Text>}
                        </ScrollView>
                    ) : <Text>Loading...</Text>}

                </View>

            </View>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('NewFolder')} className="absolute bottom-5 right-5">
                    <AddIcon fill="#000" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Home