import { StyleSheet, Text, View, Pressable } from 'react-native'
import colors from "../utils/global/colors.js"
import fonts from '../utils/global/fonts.js'
import InputForm from '../components/Forms/InputForm.js'
import SubmitButton from '../components/Buttons/SubmitButton.js'
import { useState, useEffect } from 'react'
import { useLoginMutation } from '../app/services/auth.js'
import { useDispatch } from 'react-redux'
import { setUser } from '../features/auth/authSlice.js'


const Login = ({ navigation }) => {

  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [triggerLogin] = useLoginMutation()

  const onSubmit = async () => {
    try {
      const { data } = await triggerLogin({ email, password })
      dispatch(setUser({ email: data.email, idToken: data.idToken, localId: data.localId }))
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  }

  const onChangeTextFunction = (t) => {
    setEmail(t)
  }

  useEffect(() => {
    console.log(email)
  }, [email])

  useEffect(() => {
    console.log(password)
  }, [password])

  return (

    <View style={styles.main}>

      <View style={styles.container}>

        <Text style={styles.titleContainer}>Introduce tus datos</Text>

        <InputForm
          label="Email"
          value={email}
          onChangeText={onChangeTextFunction}
          isSecure={false}
          error=""
        />

        <InputForm
          label="Password"
          value={password}
          onChangeText={(t) => setPassword(t)}
          isSecure={true}
          error=""
        />

        <View style={styles.submitButton}>
          <SubmitButton onPress={onSubmit} title="Iniciar Sesion" />
        </View>

        <Text style={styles.sub}>¿No tienes una cuenta?</Text>

        <Pressable onPress={() => navigation.navigate("Register")} >
          <Text style={styles.subLink}>Registrarte en Frutizia</Text>
        </Pressable>

      </View>

    </View >
  )
}

export default Login

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    width: "90%",
    backgroundColor: colors.white,
    gap: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "10%",
    paddingHorizontal: "10%",
    // Sombras para Android
    elevation: 8,
    // Sombras para iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  submitButton: {
    marginVertical: "7.5%"
  },
  titleContainer: {
    fontSize: 18,
    fontFamily: fonts.LobsterRegular,
    paddingVertical: "10%",
    fontWeight: "bold"
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.LobsterRegular
  },
  sub: {
    fontSize: 16,
    fontFamily: fonts.JosefinSansBold
  },
  subLink: {
    fontSize: 16,
    fontFamily: fonts.JosefinSansBold,
    color: colors.tertiary
  }
})