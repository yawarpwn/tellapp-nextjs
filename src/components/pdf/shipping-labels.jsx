import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import SvgLogo from './SvgLogo'
import ShippingIcons from './ShippingIcons'

const data = {
  destination: 'Piura - Paracas',
  recipient: 'Juan Perez Solorzano',
  ruc: '20610555536',
  dni: '4622642910',
  phone: '999 999 999',
  address: 'AV. jiron de algo some body',
}

export function Label({ label = data }) {
  const { destination, recipient, ruc, dni, phone, address } = label
  const styles = StyleSheet.create({
    label: {
      width: '50%',
      border: '1px dashed #aaa',
      borderTop: 'none',
      borderRight: 'none',
      padding: '20px',
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      gap: '5px',
      height: '20px',
      marginBottom: '5px',
    },
    iconsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginTop: '5px',
      gap: '10px',
    },
    borderDashed: {
      borderBottom: '1px  dashed orange',
    },
    textDashed: {
      fontStyle: 'italic',
      fontWeight: 'thin',
      borderBottom: '1px dashed #aaa',
      width: '100%',
    },
  })
  return (
    <View style={styles.label}>
      <View>
        <Text
          style={{
            fontSize: '12px',
            fontWeight: 'extrabold',
            textTransform: 'uppercase',
          }}
        >
          Destino:{' '}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textDashed}>{destination}</Text>
      </View>
      <View>
        <Text
          style={{
            fontSize: '12px',
            fontWeight: 'extrabold',
            textTransform: 'uppercase',
          }}
        >
          Destinatario:{' '}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textDashed}>{recipient}</Text>
      </View>
      <View style={styles.row}>
        <View style={{ ...styles.row, width: '50%' }}>
          <Text>DNI:</Text>
          <Text style={styles.textDashed}>{dni && dni}</Text>
        </View>
        <View style={{ ...styles.row, width: '50%' }}>
          <Text>RUC:</Text>
          <Text style={styles.textDashed}>{ruc && ruc}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text>Cel:</Text>
        <Text style={styles.textDashed}>{phone && phone}</Text>
      </View>

      <View>
        <Text>ENTREGA A DOMICILIO:</Text>
        <Text style={styles.textDashed}>{address && address}</Text>
      </View>
      <View style={styles.iconsContainer}>
        <SvgLogo />
        <ShippingIcons />
      </View>
    </View>
  )
}

export default function ShippingLabels({ currentLabel }) {
  const styles = StyleSheet.create({
    page: {
      fontFamily: 'Helvetica',
      fontSize: 11,
      paddingTop: 20,
      paddingLeft: 20,
      paddingRight: 20,
      lineHeight: 1.5,
      flexDirection: 'column',
    },

    labelContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  })
  return (
    <Document title={`Rotulos`}>
      <Page
        size="a4"
        style={styles.page}
        orientation="landscape"
      >
        <View style={styles.labelContainer}>
          <Label label={currentLabel} />
          <Label label={currentLabel} />
          <Label label={currentLabel} />
          <Label label={currentLabel} />
        </View>
      </Page>
    </Document>
  )
}
