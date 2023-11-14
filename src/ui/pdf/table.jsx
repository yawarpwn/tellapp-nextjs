import { StyleSheet, Text, View } from '@react-pdf/renderer'
const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 24,
    fontSize: 7,
  },

  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 24,
    textAlign: 'center',
    fontStyle: 'bold',
    flexGrow: 1,
    borderBottom: '2px solid black',
    borderTop: '2px solid black',
  },
  item: {
    width: '2%',
    textAlign: 'center',
  },

  desc: {
    width: '63%',
    textAlign: 'left',
  },

  size: {
    width: '10%',
    textAlign: 'center',
  },

  amount: {
    width: '7%',
    textAlign: 'center',
  },

  price: {
    width: '7%',
    textAlign: 'right',
  },

  total: {
    width: '7%',
    textAlign: 'right',
  },
  tableItems: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    width: '100%',
    fontStyle: 'bold',
  },
})

export default function Table({ items }) {
  if (!items) {
    return null
  }

  const hasItems = items.length > 0
  return (
    <View style={styles.tableContainer}>
      <View style={styles.tableHeader}>
        <Text style={styles.item}>No</Text>
        <Text style={{ ...styles.desc, textAlign: 'center' }}>DESCRIPCIÓN</Text>
        <Text style={styles.size}>U/M</Text>
        <Text style={styles.amount}>CANT.</Text>
        <Text style={styles.price}>P. UNIT</Text>
        <Text style={styles.total}>MONTO</Text>
      </View>
      {hasItems &&
        items.map(({ id, description, price, unit_size, qty }, index) => {
          const isOdd = index % 2 !== 0
          return (
            <View
              key={id}
              style={{
                ...styles.tableItems,
                backgroundColor: isOdd ? '#EEE' : '#fff',
              }}
            >
              <Text style={styles.item}>{index + 1}</Text>
              <Text style={styles.desc}>{description}</Text>
              <Text style={styles.size}>{unit_size}</Text>
              <Text style={styles.amount}>{qty}</Text>
              <Text style={styles.price}>{(price / 1.18).toFixed(4)}</Text>
              <Text style={styles.total}>
                {((price * qty) / 1.18).toFixed(2)}
              </Text>
            </View>
          )
        })}
    </View>
  )
}
