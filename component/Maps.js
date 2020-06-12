import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet,TouchableOpacity, Button,Alert } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Pharmacie from '../assets/data/carte-des-pharmacies-de-paris'
import Form from "./Form.js";

import * as  firebase from 'firebase';
import 'firebase/firestore';

export default function Maps() {

    const FirebaseConfig = {
        apiKey: "AIzaSyDZCGCUnST8S9PI1HIonxY6wWCJ0MacASU",
        authDomain: "vivantis-ea16a.firebaseapp.com",
        databaseURL: "https://vivantis-ea16a.firebaseio.com",
        projectId: "vivantis-ea16a",
        storageBucket: "vivantis-ea16a.appspot.com",
        messagingSenderId: "410708130758",
        appId: "1:410708130758:web:ec7cbcbf245dd5055150c7",
        measurementId: "G-WS916B3L2V"
    };

    let data = Pharmacie;
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)
    let db;
    setTimeout(() => {
        if (!firebase.apps.length) {
            try {
                firebase.initializeApp(FirebaseConfig)
            } catch (err) {
                console.log(err)
            }
        }
        db = firebase.firestore();
    }, 1000)



    useEffect(() => {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            setErrorMsg(
                'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
            );
            if (this.marker) {
                this.marker._component.animateMarkerToCoordinate(
                    nextProps.coordinate,
                    duration
                );
            }
        } else {
            (async () => {
                let { status } = await Location.requestPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                }
                let location = await Location.getCurrentPositionAsync({});
                setLocation(location);
            })();
        }
    });

    function form(name){
        console.log(firebase.database().ref('/test/').push('kilianaizen'))
    }

    let text = 'Waiting..';
    let mylat = '';
    let mylong ='';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location)
        const coordinate = JSON.parse(text)
        mylat = coordinate.coords.latitude
        mylong = coordinate.coords.longitude
    }

    function pharma() {
        let latt = null;
        let long = null;
        let map= null;
        return data.map( i => {
            latt = i.geometry.coordinates[1];
            long = i.geometry.coordinates[0];

            if(i.fields.complrs === undefined) {

                return (
                    map = <Marker coordinate={{latitude: 0, longitude: 0}}>
                        <Callout>
                            <Text></Text>
                        </Callout>
                    </Marker>
                )
            }
            else{
                return (
                    map = <Marker coordinate={{latitude: latt, longitude: long}}>
                        <Callout onPress={() => form(i.fields.complrs)}>
                                <Text style={styles.paragraph}>{i.fields.complrs}</Text>
                                <Text style={styles.paragraph}>telephone : +331{i.fields.telephone}</Text>
                                <Text style={styles.paragraph}>Adresse : {i.fields.numvoie} {i.fields.typvoie} {i.fields.voie} {i.fields.cp}</Text>
                                <Button variant="primary" title={i.fields.complrs} onPress={() => form(i.fields.complrs)}>
                                </Button>
                        </Callout>
                    </Marker>
                )
            }
        })
    }



    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={{
                    latitude: mylat,
                    longitude: mylong,
                    latitudeDelta:0.09,
                    longitudeDelta: 0.035,
                }}
            >
                {pharma()}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        textAlign: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    }
});
