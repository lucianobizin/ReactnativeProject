// Importo los hooks básicos de react
import { useState, useEffect } from 'react'

// Importo componentes de react & react-native
import { StyleSheet, Text, View } from 'react-native'

// Importo los componentes generales de esta screen
import AddButton from '../components/Buttons/AddButton.js'
import MapPreview from '../components/Maps/MapPreview.js'

// Importo componentes de localización de expo-location
import * as Location from 'expo-location'

// Importo el useSelector de redux que maneja el estado actualizado del localId
import { useSelector } from 'react-redux'

// Importo las funciones que desencadena el método PUT para actualizar la localización
import { usePutUserLocationMutation } from '../app/services/profile.js'

// Importo las fuentes y los colores
import fonts from '../utils/global/fonts.js'
import config from '../app/config/config.js'


const LocationSelector = ({ navigation }) => {

  /* -------------------   DECLARACIÓN DE USESTATE  ------------------------------------------------------------------ */

  // Variable y setter de latitude y longitude
  const [location, setLocation] = useState({ latitude: null, longitude: null })

  // Variable y setter de error
  const [errroMsg, setErrorMsg] = useState(null)

  // Variable y setter de address
  const [address, setAddress] = useState("")


  /* -------------------   DECLARACIÓN DE VARIABLE  ------------------------------------------------------------------ */

  // Variable de localId traída del estado global de la app
  const localId = useSelector((state) => state.auth.localId)

  // Declaro el trigger del PUT de localización
  const [triggerUserLocation] = usePutUserLocationMutation()

  /* -------------------   DECLARACIÓN DE USEFFECT  ------------------------------------------------------------------ */

  // Para funciones asincrónicas en useEffect defino la función y lo que se le pasa a la función (ej. "Hola")
  useEffect(() => {

    (async () => {

      // Se solicita los permisos de la localización
      let { status } = await Location.requestForegroundPermissionsAsync()

      // Si no son concedidos se settea un error
      if (status !== "granted") {
        setErrorMsg("Permisos denegados")
        return
      }

      // Si son concedidos, se obtiene la localización actual
      let location = await Location.getCurrentPositionAsync()

      // Se setea la nueva localización
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      })

    })()

  }, [])

  // En caso de tener la latitude y la longitude se busca la dirección
  useEffect(() => {

    (async () => {

      // Si existe la latitude se hace un fetch a la api de google maps
      if (location.latitude) {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${config.Google.GOOGLE_GEOLOCALIZATION}`)

        // La respuesta se settea en address
        const data = await response.json()
        setAddress(data.results[0].formatted_address)
      }

    })()

  }, [location])

  /* -------------------   DECLARACIÓN DE FUNCIONES  --------------------------------------------------------------------- */

  // Funcion por la que el usuario confirma la address
  onConfirmAddress = async () => {

    const locationFormatted = {
      address,
      location
    }

    // Una vez confirmada, se actualiza en base de datos
    await triggerUserLocation({ localId, locationFormatted })

    // Se vuelve a la vista anterior
    navigation.goBack()

  }

  /* -------------------   RENDERIZACIÓN DE LOCATIONSELECTOR ------------------------------------------------------------------ */

  /* 
   
    COMPONENTES / PANTALLAS
  
    Text: Si existe, la dirección encontrada
    MapPreview: Renderizo el mapPreviwUrl si existe la latitud y si no un mapa por defecto
    AddButton: Confirma la geolocalización nueva
  
    LOGICA DE PANTALLAS
   
    La app se inicializa sin geolocalización.
    Es el usuario quien adentrándose en cada botón, el que debe seguir los pasos y confirmar su dirección
    
  */

  return (

    <View style={styles.container}>

      {address && <Text style={styles.textTitle}>Dirección encontrada (GPS)</Text>}
      {address && <Text style={styles.text}>{address}</Text>}

      <MapPreview latitude={location.latitude} longitude={location.longitude} />

      <AddButton title="Confirmar geolocalización" onPress={onConfirmAddress} />

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
  text: {
    fontSize: 16,
    fontFamily: fonts.lobsterRegular
  }
})