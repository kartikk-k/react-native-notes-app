import { View, TouchableOpacity, Text } from 'react-native'
import { AddIcon } from './SvgIcons'

const AddBtn = () => {
    return (
        <View className=" border flex-row">
            <AddIcon fill="#000" />
        </View>
    )
}

export default AddBtn