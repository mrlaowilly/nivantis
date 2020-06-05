import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Pharmacie from '../assets/data/carte-des-pharmacies-de-paris'

export default function Maps() {

    let data = Pharmacie;
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

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
        return data.map( i => {
            latt = i.geometry.coordinates[1]
            long = i.geometry.coordinates[0]

            let map;
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
                        <Callout>
                            <Text style={styles.paragraph}>{i.fields.complrs}</Text>
                            <Text style={styles.paragraph}>telephone:0{i.fields.telephone}</Text>
                            <Text style={styles.paragraph}>Adresse : {i.fields.numvoie} {i.fields.typvoie} {i.fields.voie} {i.fields.cp}</Text>
                            <Text>Plus d'information</Text>
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
                    latitude: 48.866667,
                    longitude: 2.333333,
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
