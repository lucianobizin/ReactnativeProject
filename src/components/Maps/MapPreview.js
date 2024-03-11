// Importo variables de entorno
import config from '../../app/config/config.js'

// Importo los componentes básicos de react native
import { StyleSheet, Image } from 'react-native'

const MapPreview = ({ latitude, longitude }) => {

    // Instancio la variable principal con el servicio de geolocalización de google
    const mapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}
        &zoom=13
        &size=600x300
        &maptype=roadmap
        &markers=color:blue%7Clabel:S%7C${latitude},${longitude}
        &key=${config.Google.GOOGLE_GEOLOCALIZATION}`

    return (

        // Renderizo el mapPreviwUrl si existe la latitud y si no un mapa por defecto
        <Image source={latitude ? { uri: mapPreviewUrl } : require("./map.jpeg")} style={styles.image} />
    )
}

export default MapPreview

const styles = StyleSheet.create({
    image: {
        width: 250,
        height: 250,
        borderRadius: 180
    }
})