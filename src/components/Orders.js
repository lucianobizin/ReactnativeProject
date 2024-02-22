// Importo componentes de react & react-native
import { FlatList } from 'react-native'

// Importo el archivo con los datos de las órdenes de compra (por ahora ficticio)
import orders from "../utils/data/orders.json"

// Importo el componente de las tarjetas de órdenes de compra
import OrderItem from './OrderItem.js'

const Orders = () => {

    /* -------------------   RENDERIZACIÓN DE LISTA DE ORDENES DE COMPRA --------------------------------------------------------------------- */

    /* 
    
      COMPONENTES / PANTALLAS
   
      FlatList: Renderiza la lista de órdenes de compra definidas en el componente OrderItem
   
      LOGICA DE PANTALLAS
   
      Administra la lista de las distintas órdenes de compra mostradas en tarjetas 
   
    */

    return (

        <FlatList
            data={orders.items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <OrderItem total={orders.total} createdAt={orders.createdAt} item={item} />}
        />
 
    )

}

export default Orders