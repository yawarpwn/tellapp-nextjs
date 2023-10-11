import { Document, Page, StyleSheet } from '@react-pdf/renderer'
import React from 'react'
import QuoBAnkInfo from './bank-info'
import QuoCustomer from './customer'
import QuoHeader from './header'
import QuoTable from './table'
import QuoTerms from './terms'
import QuoTotal from './total'

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 9,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    lineHeight: 1.5,
    flexDirection: 'column',
  },
})

const PDFGenerator = ({ quotation }) => {
  return (
    <Document title={`Cotización-${quotation.number}`}>
      <Page
        size="a4"
        style={styles.page}
      >
        <QuoHeader />
        <QuoCustomer quotation={quotation} />
        <QuoTable items={quotation.items} />
        <QuoTotal items={quotation.items} />
        <QuoTerms deadline={quotation.deadline} />
        <QuoBAnkInfo />
      </Page>
    </Document>
  )
}

export default PDFGenerator
