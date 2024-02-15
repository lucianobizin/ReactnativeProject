import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { useState, useEffect } from 'react'
import Header from '../components/HeaderHome.js'
import products from "../utils/data/products_market.json"
import colors from "../utils/global/colors.js"

const ProductDetail = ({ productId, portrait }) => {

  const [product, setProduct] = useState({})

  useEffect(() => {
    const productFound = Object.values(products).find(product => String(product.id) === String(productId))
    setProduct(productFound)
  }, [productId])

  return (
    <View style={styles.container}>
      <Header title={"Detalle del producto"} />
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
          <Text>{product.bulk_price} €/{product.reference_format}</Text>
          <Text>{product.unit_price} € / {product.unit_size} {product.size_format}</Text>
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
    width: "100%",
    flex: 1,
    justifyContent: "start",
    alignItems: "center",
  },
  content: {
    width: "100%"
  },
  contentLandscape: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginVertical: 15
  },
  image: {
    width: "100%",
    height: 300
  },
  goBack: {
    width: "100%",
    backgroundColor: colors.tertiary,
    padding: 10,
    paddingStart: 40
  },
  containerText: {
    gap: 25,
    paddingHorizontal: 5,
    paddingVertical: 25
  },
  containerPrice: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 10
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  price: {
    fontSize: 30
  },
  buyNow: {
    backgroundColor: colors.tertiary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  buyNowText: {
    color: "white"
  }
})