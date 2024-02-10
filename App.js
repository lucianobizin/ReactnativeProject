import { StyleSheet, Text, View } from 'react-native'
import Home from './src/screens/Home.js'
import { useEffect, useState } from 'react'
import ProductsByCategory from "./src/screens/ProductsByCategory.js"
import { useFonts } from "expo-font"
import { fontCollection } from "./src/utils/global/fonts.js"

const App = () => {

  const [fontsLoaded] = useFonts(fontCollection)

  const [categorySelected, setCategorySelected] = useState("")

  if (!fontsLoaded) return null

  const selectedCategoryState = (category) => {
    setCategorySelected(category)
  }

  // La función del useEffect se ejecuta cuando elcomponente se renderiza y cuando cambia lo de adentro []
  // useEffect( () => {console.log(categorySelected)}, [categorySelected])

  return (

    // Por más que sean pantallas siguen siendo componentes

    <>

      {categorySelected ? <ProductsByCategory categorySelected={categorySelected} setCategorySelected={setCategorySelected}/> : <Home selectedCategoryState={selectedCategoryState} />}

    </>
  )
}

export default App

const styles = StyleSheet.create({})