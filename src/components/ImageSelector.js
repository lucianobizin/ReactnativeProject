import { StyleSheet, Text, View, Image } from 'react-native'
import { useEffect, useState } from 'react'
import AddButton from './AddButton.js'
import * as ImagePicker from 'expo-image-picker'
import { useGetImageQuery, usePutImageMutation } from '../app/services/profile.js'
import { useSelector } from 'react-redux'
import colors from '../utils/global/colors.js'

const ImageSelector = ({ navigation }) => {

    const [image, setImage] = useState("")
    const [triggerImage] = usePutImageMutation()
    const localId = useSelector((state) => state.auth.localId)
    const { data, isSuccess } = useGetImageQuery(localId)

    useEffect(() => {
        if (isSuccess && data) setImage(data.image)
    }, [isSuccess, data])

    const pickImage = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync()
        if (granted) {
            let result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.3, // 1 es la mejor calidad, 0 la peor
                base64: true
            })

            if (!result.canceled) {
                setImage('data:image/jpeg;base64,' + result.assets[0].base64)
            }
        }
    }

    const confirmImage = () => {
        triggerImage({ image, localId })
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <Image
                source={image ? { uri: image } : require("../../assets/user.png")}
                style={styles.image}
                resizeMode='cover'
            />
            <AddButton title={"Tomar nueva foto"} onPress={pickImage} />
            <AddButton title={"Confirmar foto"} onPress={confirmImage} />
        </View>
    )
}

export default ImageSelector

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: colors.primary,
        alignItems: "center",
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 180,
        marginTop: 80,
    }
})