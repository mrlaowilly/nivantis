import React from 'react';
import {StyleSheet, Text, View, ListView, Button, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import Medic from "../assets/data/medicaments.json"
import {Link, NavigationContainer} from "@react-navigation/native";

export default class DetailsScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: Medic,
        }
    }

    renderMedic(){
        return this.state.data.map(y => {
            var nameMedic = y.title
            return (
                <TouchableOpacity
                    onPress={() => alert({nameMedic})}
                    style={{ backgroundColor: 'lightblue' }}>
                    <Text style={{ fontSize: 14, color: 'black', marginBottom: 20 }}>{nameMedic}</Text>
                </TouchableOpacity>
            )
        })
    }

    renderList() {
        return this.state.data.map(i => {
            var bru = i.price-(i.price * 23)/100
            var brut = bru.toFixed(2)
            var remis = (1- i.price/ brut) * 100
            var remise = remis.toFixed(2)
            var coef = i.price / 0.2;
            var coeff = coef.toFixed(2)
            var vent = i.price * 0.2
            var vente = vent.toFixed(2)
            return (
                <Link key={i.id} style={styles.welcome}>
                    {i.title} prix = {i.price} €
                    brut = {brut} remise = {remise}  €
                    coef = {coeff} €
                    Vente net = {vente} €
                </Link>
            )
        })
    }

    render() {
        return (
            <ScrollView style={styles.scrollView}>
                {this.renderMedic()}
                {this.renderList()}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#794BFF",
    },
    welcome: {
        fontSize: 15,
        textAlign: "center",
        margin: 20,
    },
});