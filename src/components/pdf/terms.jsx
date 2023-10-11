import { Image, StyleSheet, Text, View } from '@react-pdf/renderer'
const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 20,
    fontSize: 7,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  left: {
    width: '25%',
  },
  right: {
    width: '75%',
  },
})
export default function QuoTerms({ deadline }) {
  return (
    <View style={styles.container}>
      <View style={{ width: '70%' }}>
        <Text style={{ fontWeight: '600', fontSize: 9 }}>
          TÉRMINOS Y CONDICIONES
        </Text>
        <View style={styles.row}>
          <Text style={styles.left}>TIEMPO DE ENTREGA</Text>
          <Text style={styles.right}>
            : {deadline} día(s) útil, una vez recepcionada la Orden de Compra
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.left}>FORMA DE PAGO</Text>
          <Text style={styles.right}>: 50% adelanto , 50% contraentrega</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.left}>VALIDEZ</Text>
          <Text style={styles.right}>: 15 días</Text>
        </View>
      </View>
      <View style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <View>
          <Image
            src="/sign.png"
            style={{ width: 70, height: 35 }}
          />
          <Text style={{ fontWeight: 'bold' }}>Raquel Maldonado R.</Text>
          <Text
            style={{ fontSize: 6, fontStyle: 'italic', textAlign: 'center' }}
          >
            Gerente de Ventas
          </Text>
        </View>
      </View>
    </View>
  )
}
