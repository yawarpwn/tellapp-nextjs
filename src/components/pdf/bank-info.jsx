import { StyleSheet, Text, View } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  footer: {
    marginTop: 20,
    fontSize: 8,
  },
  title: {
    padding: 5,
    borderTop: '2px solid black',
    borderBottom: '2px solid black',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    height: 24,
    alignItems: 'center',
  },
  bank: {
    width: '35%',
    textAlign: 'center',
  },
  coin: {
    textAlign: 'center',
    width: '15%',
  },
  acount: {
    textAlign: 'center',
    width: '25%',
  },
  cci: {
    textAlign: 'center',
    width: '25%',
  },
})

export default function QuoBAnkInfo() {
  return (
    <View style={styles.footer}>
      <View style={styles.title}>
        <Text>
          &quot;SIRVASE A ABONAR EN NUESTRAS CUENTAS: TELL SENALES SOCIENDAD
          ANONIMA CERRADA&quot;
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.bank}>BANCO</Text>
        <Text style={styles.coin}>MONEDA</Text>
        <Text style={styles.acount}>CUENTA</Text>
        <Text style={styles.cci}>CCI</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.bank}>Banco de Crédito del Perú (BCP)</Text>
        <Text style={styles.coin}>Soles</Text>
        <Text style={styles.acount}>19276743336019</Text>
        <Text style={styles.cci}>00219217674333601938</Text>
      </View>
    </View>
  )
}
