import { StyleSheet, Text, View } from '@react-pdf/renderer'
import SvgLogo from './svg-logo'
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    fontSize: 8,
  },
  logoContainer: {
    width: '65%',
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  logoText: {
    fontSize: 30,
    fontWeight: 'extrabold',
  },
  info: {
    width: '35%',
    borderTop: 2,
    borderBottom: 2,
    padding: 5,
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },

  left: {
    width: '10%',
  },
  center: {
    width: '2%',
  },
  right: {
    width: '88%',
    textAlign: 'right',
  },
})
export default function QuoHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <View>
          <SvgLogo />
        </View>
        <View>
          <Text style={{ textAlign: 'left', marginLeft: 50 }}>
            Av. Argentina 538 - Lima - Lima
          </Text>
        </View>
      </View>
      <View style={styles.info}>
        <View style={styles.row}>
          <Text style={styles.left}>Ruc</Text>
          <Text style={styles.center}>:</Text>
          <Text style={styles.right}>20610555536</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.left}>Email</Text>
          <Text style={styles.center}>:</Text>
          <Text style={styles.right}>ventas@tellsenales.com</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.left}>Web</Text>
          <Text style={styles.center}>:</Text>
          <Text style={styles.right}>tellsenales.com</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.left}>Tel</Text>
          <Text style={styles.center}>:</Text>
          <Text style={styles.right}>971 531 018</Text>
        </View>
      </View>
    </View>
  )
}
