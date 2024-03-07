// Importo componentes de react & react-native
import { useState } from 'react'
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native'

// Importo el dispatch de Redux para poder actualizar el estado de user (constante global en el store)
import { useDispatch } from 'react-redux'

// Importo la función del endpoint Register que envía los datos del formulario hacia la base de datos (ver -> auth.js)
import { useRegisterMutation } from '../app/services/auth.js'

// Importo el reducer que modificará el estado de la porción authSlice del store
import { setUser } from '../features/auth/authSlice.js'

// Importo objetos globales de estilo de la app --> colores y fuentes
import colors from '../utils/global/colors.js'
import fonts from '../utils/global/fonts.js'

// Importo los componentes de InputForm y SubmitButton
import InputForm from '../components/Forms/InputForm.js'
import SubmitButton from '../components/Buttons/SubmitButton.js'




const Register = ({ navigation }) => {

    /* -------------------   DECLARACIÓN DE USESTATE PARA LAS SCREENS  ------------------------------------------------------------------------ */

    // Guardo los datos que ingresa el usuario que se quiere registrar (nombre, apellido, email, tel, dni, dirección, provincia, contraseña y confirmación de contraseña)
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [idNumber, setIdNumber] = useState("")
    const [address, setAddress] = useState("")
    const [province, setProvince] = useState("")
    const [password, setPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")
    const [triggerRegister] = useRegisterMutation()
    const [error, setError] = useState("")

    // Defino el estado de nuevos errores antes de enviar los datos del formulario
    const [newErrors, setNewErrors] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
        idNumber: "",
        address: "",
        province: "",
        password: "",
        confirmedPassword: ""
    })

    /* -------------------   DECLARACIÓN DE DISPATCH PARA REDUX  ------------------------------------------------------------------------------ */


    /* -------------------   DECLARACIÓN DE FUNCION DE VALIDACIÓN DEL FORMULARIO  ------------------------------------------------------------- */
    const dispatch = useDispatch()

    // Declaro función de validación que se dispará antes de que la app envíe los datos a la base de datos (Firebase)
    const validateFields = () => {

        // Defino un diccionario con los errores
        let newErrors = {};

        // Validaciones para el campo de nombre
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name.trim())) {
            newErrors.name = "El nombre no puede estar vacío ni contener caracteres especiales ni números"
        }

        // Validaciones para el campo de apellido
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(surname.trim())) {
            newErrors.surname = "El apellido no puede estar vacío ni contener caracteres especiales ni números";
        }

        // Validaciones para el campo de correo electrónico
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "El email debe ser válido";
        }

        // Validaciones para el campo de teléfono
        if (!/^\d{10}$/.test(phone.replace(/-/g, ''))) {
            newErrors.phone = "El teléfono debe contener exactamente 10 dígitos numéricos";
        }

        // Validaciones para el campo de número de identificación
        if (!/^\d+$/.test(idNumber.replace(/./g, ''))) {
            newErrors.idNumber = "El número de identificación debe contener solo números";
        }

        // Validaciones para el campo de dirección
        if (!/^[a-zA-Z0-9\s]*[a-zA-Z][a-zA-Z0-9\s]*$/.test(address.trim())) {
            newErrors.address = "La dirección no debe contener caracteres especiales ni estar vacía";
        }
        // Validaciones para el campo de provincia
        if (!/^[a-zA-Z0-9\s]*[a-zA-Z][a-zA-Z0-9\s]*$/.test(province.trim())) {
            newErrors.province = "La provincia no debe contener caracteres especiales ni estar vacía";
        }
        // Validaciones para la contraseña
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{6,}/.test(password)) {
            newErrors.password = "La contraseña debe contener al menos una mayúscula, una minúscula, un caracter especial y un número, y tener al menos 6 caracteres";
        }
        // Validación de que confirmedPassword sea igual a password
        if (password !== confirmedPassword) {
            newErrors.password = "Las contraseñas no coinciden";
        }

        // Retorno el diccionario con los errores
        setNewErrors(newErrors)

    }

    // Declaro la función que dispara el registro del usuario con los datos del formulario
    const onSubmit = async () => {


        try {
            
            validateFields()

            // Ejecuta la función que envía los datos del usuario que se quiere registrar a la base de datos
            // Recibe data como respuesta, la cual posee el token de autenticación que se debe actualizar en el estado de authSlice
            // phone, idNumber, address, province,
            const { data } = await triggerRegister({ name, surname, email, phone, idNumber, address, province, password, confirmedPassword })

            // La respuesta recibida de parte del servidor es data y actualizaremos con data.email y data.idToken el estado de authSlice
            // En caso de que la respuesta posea un idToken, MainNavigation redirija al usuario a TabNavigator (ver -> MainNavigator.js -> const user)
            dispatch(setUser({
                email: data.email,
                idToken: data.idToken,
                localId: data.localId
            }))
        } catch (error) {
            setError("Error al registrar. Por favor, intenta de nuevo.") // Actualiza el estado de error
        }

    }


    return (

        <ScrollView contentContainerStyle={styles.scrollViewContent}>

            <View style={styles.container}>

                <Text style={styles.titleContainer}>Introduce tus datos</Text>

                <InputForm
                    label="Nombre"
                    value={name}
                    onChangeText={(t) => setName(t)}
                    isSecure={false}
                    error={newErrors.name}
                />

                <InputForm
                    label="Apellido"
                    value={surname}
                    onChangeText={(t) => setSurname(t)}
                    isSecure={false}
                    error={newErrors.surname}
                />

                <InputForm
                    label="Email"
                    value={email}
                    onChangeText={(t) => setEmail(t)}
                    isSecure={false}
                    error={newErrors.email}
                />

                <InputForm
                    label="Móvil"
                    value={phone}
                    onChangeText={(t) => setPhone(t)}
                    isSecure={false}
                    error={newErrors.phone}
                />

                <InputForm
                    label="DNI / Pasaporte"
                    value={idNumber}
                    onChangeText={(t) => setIdNumber(t)}
                    isSecure={false}
                    error={newErrors.idNumber}
                />

                <InputForm
                    label="Dirección"
                    value={address}
                    onChangeText={(t) => setAddress(t)}
                    isSecure={false}
                    error={newErrors.address}
                />

                <InputForm
                    label="Provincia"
                    value={province}
                    onChangeText={(t) => setProvince(t)}
                    isSecure={false}
                    error={newErrors.province}
                />

                <InputForm
                    label="Contraseña"
                    value={password}
                    onChangeText={(t) => setPassword(t)}
                    isSecure={true}
                    error={newErrors.password}
                />

                <InputForm
                    label="Confirmación de contraseña"
                    value={confirmedPassword}
                    onChangeText={(t) => setConfirmedPassword(t)}
                    isSecure={true}
                    error={newErrors.confirmedPassword}
                />

                <View style={styles.submitButton}>
                    <SubmitButton onPress={onSubmit} title="Registrarme" />
                </View>

                {error && <Text style={styles.errorText}>{error}</Text>}

                <Text style={styles.sub}>¿Ya tienes una cuenta en Frutizia?</Text>

                <Pressable onPress={() => navigation.navigate("Login")} >
                    <Text style={styles.subLink}>Iniciar sesion</Text>
                </Pressable>

            </View>

            <View style={styles.footerContainer}>
                <Text style={styles.footerText}>¡Gracias por visitarnos!</Text>
            </View>

        </ScrollView>

    )

}

export default Register

const styles = StyleSheet.create({

    scrollViewContent: {
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: "5%",
        gap: 100,
    },
    container: {
        width: "90%",
        backgroundColor: colors.white,
        gap: 5,
        borderRadius: 10,
        paddingVertical: "10%",
        paddingHorizontal: "2%",
        justifyContent: "center",
        alignItems: "center",
        top: "5%",
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
        position: "relative",
        top: "3.5%"
    },
    titleContainer: {
        fontSize: 18,
        fontFamily: fonts.LobsterRegular,
        paddingVertical: "5%",
        marginBottom: "10%",
        fontWeight: "bold"
    },
    submitButton: {
        marginVertical: "5%"
    },
    sub: {
        fontSize: 16,
        fontFamily: fonts.lobsterRegular,
    },
    subLink: {
        fontSize: 16,
        fontFamily: fonts.joseginSansBold,
        color: colors.secondary
    },
    footerContainer: {
        backgroundColor: colors.primary, // Color de fondo deseado
        width: '100%',
        paddingVertical: 20,
        alignItems: 'center',
    },
    footerText: {
        color: colors.tertiary,
        fontSize: 16,
        fontFamily: fonts.josefinSansBold,
        fontWeight: "bold"
    },
    errorText: {
        fontSize: 14,
        color: colors.tertiary,
        marginBottom: 15
    }

})