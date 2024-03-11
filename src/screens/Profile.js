// Importo componentes de react & react-native
import { StyleSheet, Text, View, Image } from 'react-native'

// Importo el hook useSelector de Redux para traer estados globales, en este caso, localId
import { useSelector } from 'react-redux'

// Importo funciones de profileApi que traen la imagen de perfil y la localización del usuario (ver -> profile.js)
import { useGetImageQuery, useGetUserLocationQuery } from "../app/services/profile.js"

// Importo objetos globales de estilo de la app --> colores y fuentes
import colors from '../utils/global/colors.js'
import fonts from '../utils/global/fonts.js'

// Importo los componentes de AddButton
import AddButton from "../components/Buttons/AddButton.js"


const Profile = ({ navigation }) => {

    /* -------------------   DECLARACIÓN DE VARIABLES DE LA SCREEN  ------------------------------------------------------------------ */

    // Traigo del store el estado de la variable global "localId"
    const localId = useSelector((state) => state.auth.localId)

    // Traigo de la base de datos la localización del usuario (con su localId) y genero la variable locationFormatted
    const { data: locationFormatted } = useGetUserLocationQuery(localId)

    // Obtengo la imagen de perfil del usuario 
    const { data } = useGetImageQuery(localId)

    /* -------------------   RENDERIZACIÓN DE PROFILE -------------------------------------------------------------------------------- */

    /* 
     
      COMPONENTES / PANTALLAS
    
      Image: Muestra la imagen de perfil del usuario
      Text: Si existe la dirección del usuario se la renderiza
      AddButton: Botón para agregar imagen de perfil y botón para la geolocalización
    
      LOGICA DE PANTALLAS
     
      La app se inicializa sin foto de perfil y sin dirección de gps.
      Es el usuario quien adentrándose en cada botón, el que debe seguir los pasos y confirmar su imagen de perfil y dirección
      
    */

    return (
        <View style={styles.container}>
            <Image
                source={data ? { uri: data.image } : require("../../assets/user.png")}
                style={styles.image}
                resizeMode='cover'
            />
            {locationFormatted && <Text style={styles.textTitle}>Dirección de despacho</Text>}
            {locationFormatted && <Text style={styles.text}>{locationFormatted.address}</Text>}
            <AddButton title={"Agregar imagen de perfil"} onPress={() => navigation.navigate("ImageSelector")} />
            <AddButton title={"Dirección de despacho"} onPress={() => navigation.navigate("LocationSelector")} />
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1,
        alignItems: "center",
    },
    image: {
        width: 225,
        height: 225,
        borderRadius: 180,
        marginTop: 40,
        marginBottom: 35
    },
    text: {

    },
    textTitle: {
        fontSize: 18,
        fontFamily: fonts.joseginSansBold
    },
    text: {
        fontSize: 16,
        marginVertical: 10,
        fontFamily: fonts.lobsterRegular
    }
})