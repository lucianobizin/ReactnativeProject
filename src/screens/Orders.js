// Importo componentes de react & react-native
import { FlatList } from 'react-native'

// Importo el componente de las tarjetas de órdenes de compra
import OrderItem from '../components/Orders/OrderItem.js'

// Importo el useSelector que permite traer estados generales de la app
import { useSelector } from 'react-redux'

// Importo la función que desencadena la petición GET de las órdenes de un usuario (ver -> localId)
import { useGetOrdersQuery } from '../app/services/orders.js'
import { useEffect } from 'react'


const Orders = () => {

    // Traemos del estado general de la app la constante localId
    const localId = useSelector( (state) => state.auth.localId)

    // // Creo el trigger de la petición de órdenes
    // const [triggerGetOrders] = useGetOrdersQuery()

    // Traigo las órdenes de un usuario
    const {data:orders} = useGetOrdersQuery(localId)

    useEffect(() => {
        console.log(orders)
    }, [orders])

    /* -------------------   RENDERIZACIÓN DE LISTA DE ORDENES DE COMPRA --------------------------------------------------------------------- */

    /* 
    
      COMPONENTES / PANTALLAS
   
      FlatList: Renderiza la lista de órdenes de compra definidas en el componente OrderItem
   
      LOGICA DE PANTALLAS
   
      Administra la lista de las distintas órdenes de compra mostradas en tarjetas 
   
    */

    return (

        <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <OrderItem order={item} />}
        />
 
    )

}

export default Orders