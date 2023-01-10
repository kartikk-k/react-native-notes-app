import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { BackIcon } from './SvgIcons'

const Header = ({ headerText }) => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity onPress={() => navigation.goBack()} className="flex-row items-center space-x-2 p-2">
            <BackIcon stroke="#000000" strokeWidth="2.5" />
            <Text className="text-lg font-bold">{headerText}</Text>
        </TouchableOpacity>
    )
}

export default Header