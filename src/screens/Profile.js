import { StyleSheet, Text, View, Image } from 'react-native'
import AddButton from "../components/Buttons/AddButton.js"
import { useSelector } from 'react-redux'
import { useGetImageQuery } from "../app/services/profile.js"
import colors from '../utils/global/colors.js'

const Profile = ({ navigation }) => {

    const localId = useSelector((state) => state.auth.localId)
    const { data } = useGetImageQuery(localId)


    return (
        <View style={styles.container}>
            <Image
                source={data ? { uri: data.image } : require("../../assets/user.png")}
                style={styles.image}
                resizeMode='cover'
            />
            <AddButton title={"Agregar imagen de perfil"} onPress={() => navigation.navigate("ImageSelector")}/>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        flex: 1,
        alignItems: "center",
    },
    image: {
        width: 225,
        height: 225,
        borderRadius: 180,
        marginTop: 125,
    }
})