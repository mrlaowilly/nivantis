import React from 'react';
import { StyleSheet, Text, View, ListView, Button,SafeAreaView, ScrollView  } from 'react-native';
import Medic from "../assets/data/medicaments.json"
import {Link} from "@react-navigation/native";

export default class DetailsScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: Medic,
        }
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
        margin: 120,
    },
});