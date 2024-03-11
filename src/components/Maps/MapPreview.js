import { StyleSheet, Text, View, Image } from 'react-native'

const MapPreview = ({ latitude, longitude }) => {

    const mapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}
        &zoom=13
        &size=600x300
        &maptype=roadmap
        &markers=color:blue%7Clabel:S%7C${latitude},${longitude}
        &key=AIzaSyCg5Q3BTNhlbD7_gwUC767Ig8H-eLYOyLo`

    return (
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