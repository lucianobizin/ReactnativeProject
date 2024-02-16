// Importo componentes de react & react-native
import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'

// Importo los componentes de las pantallas principales de la app: Home, Productos por categoría y Detalle de producto
import HeaderProductsByCategory from '../components/HeaderProductsByCategory.js'
import products from "../utils/data/products_market.json"

// Importo librerías externas
import { AntDesign } from "@expo/vector-icons"

// Importo objetos globales de estilo de la app --> fuentes y colores
import colors from '../utils/global/colors.js'
import fonts from '../utils/global/fonts.js'


// El componente ProductDetail recibe productId (para mostrar el producto elegido en ProductsByCateogory), portrait (handle windows) y setCategorySelected (goBack)
const ProductDetail = ({ productId, portrait, selectedCategoryState, selectProductId }) => {

  /* -------------------   DECLARACIÓN DE USESTATE PARA LA SCREEN  ------------------------------------------------------- */

  // Guardo el producto elegido
  const [product, setProduct] = useState({})

  /* -------------------   DECLARACIÓN DE USEEFECT PARA LAS SCREENS  ------------------------------------------------------------------------ */

  // Declaración de useEffect que escuchando productId busca en la base de productos aquel que tiene el mismo id del producto elegido
  useEffect(() => {
    const productFound = Object.values(products).find(product => String(product.id) === String(productId))
    setProduct(productFound)
  }, [productId])

  /* -------------------   DECLARACIÓN DE FUNCIONES ------------------------------------------------------------------------------------- */

  // Vacío la categoría de productos seleccionada al volver a Home para poder renderizar "Home"
  const goBack = () => {
    selectProductId("")
    selectedCategoryState("")

  }

  /* -------------------   RENDERIZACIÓN DE PRODUCTSDETAIL -------------------------------------------------------------------------------- */

  /* 
   
    COMPONENTES / PANTALLAS
  
    Header: Define el Header de la pantalla (se le debe pasar style -estilo del texto a mostrar- y title -texto a mostrar-)
    Image: Muestra la imagen del producto si existe la imagen
    Views: Lista la información básica del producto
    Pressable: Botón de comprar (sin funcionalidad -al momento-) 
  
    LOGICA DE PANTALLAS
   
    La app se inicializa en Home pero al clickearse sobre una categoría de producto se mapean y renderizan todos los productos de esa categoria
    Al clickearse sobre un producto de la categoría elegida también se renderiza una nueva página (ProductDetail.js)
    Con el botón de las dos flechas para atrás se vuelve a la pantalla inicial
    
  */

  return (
    
    <View style={styles.container}>

      <View style={styles.headerContainer}>
        <Pressable style={styles.goBackRowContainer} onPress={goBack}>
          <AntDesign style={styles.goBackRowButton} name="doubleleft" size={35} color={colors.secondary} />
        </Pressable>
        <HeaderProductsByCategory title={"Detalle del producto"} headerProductsByCategoryStyle={[styles.headerProductsByCategoryStyle, styles.text]} />
        <View style={styles.emptyView}></View>
      </View>

      <View style={[styles.content, !portrait && { flexDirection: "row", gap: 20, padding: 10 }]} >

        <Image
          style={[styles.image, !portrait && { width: "40%", height: 100 }]}
          source={{ uri: product.thumbnail ? product.thumbnail : null }}
          resizeMode='cover'
        />

        <View style={[styles.containerText, !portrait && { width: "30%" }]}>
          <Text style={styles.title}>{product.name}</Text>
        </View>

        <View style={[styles.containerPrice, !portrait && { width: "15%", flexDirection: "column" }]}>
          <Text style={styles.priceText}>Precio de bulto: {product.bulk_price} €/{product.reference_format}</Text>
          <Text style={styles.priceText}>Precio de unidad: {product.unit_price} € / {product.unit_size} {product.size_format}</Text>
          <Pressable style={styles.buyNow}>
            <Text style={styles.buyNowText}>Buy</Text>
          </Pressable>
        </View>

      </View>

    </View>

  )
}

export default ProductDetail

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white
  },
  headerContainer:{
    backgroundColor: colors.white,
    height: "15%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  goBackRowContainer: {
    flex: 1,
    justifyContent: "left",
    padding: 5
  },
  goBackRowButton: {
    paddingVertical: 10,
    transform: [{ scale: 0.50 }] // Ajusta el tamaño del ícono (menos de 1 para hacerlo más pequeño)
  },
  headerProductsByCategoryStyle: {
    backgroundColor: colors.white,
    borderTopColor: "white",
    borderBottomColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    flex: 3
  },
  text: {
    fontFamily: fonts.joseginSansBold,
    fontSize: 22
  },
  emptyView: {
    flex: 1,
    color: "white"
  },
  content: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: "70%",
    height: 350,
    objectFit: "contain"
  },
  containerText: {
    backgroundColor: colors.primary,
    width: "100%",
    alignItems: "center",
    gap: 25,
    paddingHorizontal: 5,
    paddingVertical: 25
  },
  containerPrice: {
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 30,
    gap: 15
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold"
  },
  buyNow: {
    width: 75,
    height: 35, 
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.tertiary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10
  },
  buyNowText: {
    color: "white"
  }
})