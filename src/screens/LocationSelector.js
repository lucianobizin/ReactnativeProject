import { StyleSheet, Text, View } from 'react-native'
import {useState, useEffect} from 'react'
import AddButton from '../components/Buttons/AddButton.js'
import MapPreview from '../components/Maps/MapPreview.js'
import * as Location from 'expo-location'
import { useSelector } from 'react-redux'
import { usePutUserLocationMutation } from '../app/services/profile.js'
import fonts from '../utils/global/fonts.js'


const LocationSelector = ({navigation}) => {

  const [location, setLocation] = useState({latitude:null, longitude: null})
  const [errroMsg, setErrorMsg] = useState(null)
  const [address, setAddress] = useState("")
  const localId = useSelector( (state) => state.auth.localId)
  const [triggerUserLocation] = usePutUserLocationMutation()

  // Para funciones asincrónicas en useEffect defino la función y lo que se le pasa a la función (ej. "Hola")
  useEffect( () => {

    ( async () => {
        let {status} = await Location.requestForegroundPermissionsAsync()
        if(status !== "granted"){
            setErrorMsg("Permisos denegados")
            return
        }

        let location = await Location.getCurrentPositionAsync()

        setLocation({
          latitude: location.coords.latitude, 
          longitude: location.coords.longitude
        })

    })()

  }, [])

  useEffect( () => {
    (async () => {
        if(location.latitude){
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=AIzaSyCg5Q3BTNhlbD7_gwUC767Ig8H-eLYOyLo`)
            const data = await response.json()
            setAddress(data.results[0].formatted_address)
        }
    })()
  }, [location])

  onConfirmAddress = async () => {

    const locationFormatted = {
        address,
        location
    }

    await triggerUserLocation({localId, locationFormatted})
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      {address && <Text style={styles.textTitle}>Dirección encontrada (GPS)</Text>}
      {address && <Text style={styles.text}>{address}</Text>}
      <MapPreview latitude={location.latitude} longitude={location.longitude}/>
       <AddButton title="Confirmar geolocalización" onPress={onConfirmAddress}/>
    </View>
  )
}

export default LocationSelector

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginTop: 50,
        gap: 20
    },
    textTitle: {
      fontSize: 22,
      fontFamily: fonts.joseginSansBold
    },
    text:{
        fontSize: 16,
        fontFamily: fonts.lobsterRegular
    }
})