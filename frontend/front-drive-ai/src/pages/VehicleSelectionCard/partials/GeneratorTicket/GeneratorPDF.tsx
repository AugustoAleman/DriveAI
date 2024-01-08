import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { GeneratorPDFProp } from './types';
import QRCode from 'qrcode.react';

// Create styles
const styles = StyleSheet.create({
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#ffffff',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  divTicket: {
    display: "flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    height: "70%",
    width: "45%",
    borderRadius: "7px",
    border: '1px solid black',
    boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.9)',
  },
  contentHeader: {
    backgroundColor: "red"
  },
  ticketTitle: {
    fontFamily: 'Helvetica-Bold',
    marginTop:5,
    marginBottom:5,
    width: "80%"
  },
  ticketSectionText: {
    fontSize: 10,
    marginTop:10,
    marginBottom:10,
    width: "80%",
    textAlign: "justify",
  },
  ticketHeader:{
    fontFamily: 'Helvetica-Bold',
    marginTop:5,
    marginBottom:5,
    width: "40%"
  },
  resultText:{
    marginTop:5,
    marginBottom:5,
    width: "40%"
  },
  ticketImage:{
    width:"80%"
  },
  qrCode: {
    width: '80%',
    marginBottom: 10,
  },
  textRow: {
    display: "flex",
    flexDirection: "row",
  }
});

// Create Document Component
const GeneratorPDF: React.FC<GeneratorPDFProp> = ({
  dealershipvehicleId,
  image,
  fecha,
  marca,
  submarca,
  modelo,
}) => {

  const domainRoute = window.location.protocol + '//' + window.location.host + '/'; 
  const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${domainRoute}vehicle-selection/${dealershipvehicleId}`;


    return(
  <Document >
    <Page size="A4" style={styles.page} >
      <View style={styles.divTicket}>
            <Text style={styles.ticketTitle}>Confirmacion de prueba de manejo </Text>
            <Text style={styles.ticketSectionText}>Consulta tu vehículo seleccionado: </Text>
          <Image src={qrCodeImageUrl} style={styles.qrCode} />
          <View style={styles.textRow}>
            <Text style={styles.ticketHeader}>Fecha: </Text>
            <Text style={styles.resultText} >{fecha}</Text>
          </View>
          <View style={styles.textRow}>
            <Text style={styles.ticketHeader}>Marca: </Text>
            <Text style={styles.resultText}>{marca}</Text>
          </View>
          <View style={styles.textRow}>
            <Text style={styles.ticketHeader}>Submarca: </Text>
            <Text style={styles.resultText}>{submarca}</Text>
          </View>
          <View style={styles.textRow}>
            <Text style={styles.ticketHeader}>Modelo: </Text>
            <Text style={styles.resultText}>{modelo}</Text>
          </View>
          <Text style={styles.ticketTitle}>Nota</Text>
          <Text style={styles.ticketSectionText}>Le pedimos que llegue puntualmente a la dirección especificada en el horario establecido. 
                Además, le facilitamos acceder a la información completa de su reserva a través de nuestro sitio web. 
                Simplemente escanee el código QR adjunto en este mensaje utilizando la cámara de su dispositivo móvil. 
                Le recomendamos revisar esta información antes de su cita para estar completamente preparado.
          </Text>
      </View>
    </Page>
  </Document>

    );
};



export default GeneratorPDF;