import { View, Text, TouchableOpacity } from 'react-native'

const HeaderAdvance = ({ headerText }) => {
    return (
        <View>
            <TouchableOpacity>
                <Text>Cancel</Text>
            </TouchableOpacity>
            <Text>{headerText}</Text>
            <TouchableOpacity>
                <Text>Done</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HeaderAdvance