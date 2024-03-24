// Importo los hooks básicos de react
import { useEffect, useState } from 'react'

// Importo componentes de react & react-native
import { StyleSheet, View, Image } from 'react-native'

// Importo el manejador de permisos y de acceso a la cámara
import * as ImagePicker from 'expo-image-picker'

// Importo los componentes generales de esta screen
import AddButton from '../components/Buttons/AddButton.js'

// Importo las funciones que desencadena el método GET y PUT para traer y actualizar imágenes
import { useGetImageQuery, usePatchImageMutation } from '../app/services/profile.js'

// Importo el useSelector de redux que maneja el estado actualizado del localId
import { useSelector } from 'react-redux'

// Importo los colores
import colors from '../utils/global/colors.js'

const ImageSelector = ({ navigation }) => {

    /* -------------------   DECLARACIÓN DE USESTATE  ------------------------------------------------------------------ */

    // Imágenes
    const [image, setImage] = useState("")

    /* -------------------   DECLARACIÓN DE VARIABLE  ------------------------------------------------------------------ */

    // Traigo de la base de datos el localId del usuario
    const localId = useSelector((state) => state.auth.localId)

    // Instancio el trigger que actualizará imágenes
    const [triggerImage] = usePatchImageMutation()

    // Instancio el trigger que traerá imágen
    const { data, isSuccess } = useGetImageQuery(localId)

    /* -------------------   DECLARACIÓN DE USEFFECT  ------------------------------------------------------------------ */

    useEffect(() => {
        // Seteo de la imagen

        if (isSuccess && data) setImage(data.image)

    }, [isSuccess, data])

    /* -------------------   DECLARACIÓN DE FUNCIONES  ----------------------------------------------------------------- */
    const pickImage = async () => {

        // Solicito permiso a la cámara
        const { granted } = await ImagePicker.requestCameraPermissionsAsync()

        // Si el permiso existe... se accede
        if (granted) {
            let result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.3, // 1 es la mejor calidad, 0 la peor
                base64: true
            })

            // Si el resultado no fue cancelado, entonces se guarda la imagen en base64
            if (!result.canceled) {
                setImage('data:image/jpeg;base64,' + result.assets[0].base64)
            }
        }
    }

    // Defino función que confirma imagen y actualiza
    const confirmImage = () => {
        triggerImage({ image, localId })
        navigation.goBack()
    }

    /* -------------------   RENDERIZACIÓN DE IMAGESELECTOR ------------------------------------------------------------------ */

    /* 
     
      COMPONENTES / PANTALLAS
    
      Image: Muestra la imagen del usuario
      AddButton: Botón para agregar imagen y botón para la geolocalización
    
      LOGICA DE PANTALLAS
     
      La app se inicializa sin foto de perfil y sin dirección de gps.
      Es el usuario quien adentrándose en cada botón, el que debe seguir los pasos y confirmar su imagen de perfil y dirección
      
    */

    return (
        <View style={styles.container}>
            <Image
                source={image ? { uri: image } : require("../public/img/user.png")}
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