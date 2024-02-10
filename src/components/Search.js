import { Pressable, StyleSheet, TextInput, View, Keyboard, Text } from 'react-native'
import { AntDesign } from "@expo/vector-icons"
import colors from '../utils/global/colors.js'
import { useState } from 'react'

const Search = ({ handlerKeyword }) => {

    const [input, setInput] = useState("")

    const [error, setError] = useState("")

    const handlerInput = (t) => setInput(t)

    const search = () => {

        const expression = /[\(\)@#$%^&*!]+/

        if (expression.test(input)) {
            setError("Error por caracteres incorrectos")
            return
        }
        setError("")
        handlerKeyword(input)
        Keyboard.dismiss()
    }

    const resetSearch = () => {
        handlerKeyword("")
        handlerInput("")
        setError("")
        Keyboard.dismiss()
    }

    return (
        <View>
            <View style={styles.container}>
                <TextInput
                    placeholder='Buscar'
                    style={styles.input}
                    value={input}
                    onChangeText={handlerInput} />
                <Pressable onPress={search}>
                    <AntDesign name="search1" size={35} color={"black"} />
                </Pressable>
                <Pressable onPress={resetSearch}>
                    <AntDesign name="closecircle" size={35} color={"black"} />
                </Pressable>
            </View>
            {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.secondary,
        flexDirection: "row",
        padding: 10,
        alignItems: "center"
    },
    input: {
        flex: 1,
        borderWidth: 2,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5
    },
    errorMessage:{
        fontSize: 16,
        color: colors.tertiary,
        alignItems: "center",
        paddingHorizontal: 10

    }
})