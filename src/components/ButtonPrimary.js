import { Pressable, StyleSheet, Text } from 'react-native'

const ButtonPrimary = ({ title, onPress, buttonColor, textColor }) => {

    const styles = StyleSheet.create({
        container: {
            height: 35,
            alignItems: "center",
            backgroundColor: buttonColor,
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingVertical: 5,
            marginBottom: 15,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        text: {
            color: textColor
        }
    })

    return (
        <Pressable style={styles.container} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    )

}

export default ButtonPrimary

