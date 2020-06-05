import React from 'react';
import { StyleSheet, Text, View, ListView, Button,TouchableOpacity, ScrollView, Alert  } from 'react-native';
import Medic from "../assets/data/medicaments.json"
import {Link} from "@react-navigation/native";



export default class DetailsScreen extends React.Component{
    //props pour recuprer les variables
    constructor(props) {
        super(props);
        this.state = {
            data: Medic,
        }
    }

    renderById(id){
        return this.state.data.map(i => {
            var bru = i.price-(i.price * 22)/100
            var brut = bru.toFixed(2)
            var remis = (1- i.price/ brut) * 100
            var remise = remis.toFixed(2)
            var coef = i.price / 0.2;
            var coeff = coef.toFixed(2)
            var vent = i.price * 0.2
            var vente = vent.toFixed(2)
            if (id === i.id){
                Alert.alert(
                    'Information complementaire: ',
                    'Coeff = '+ coeff +'€, Remise = ' +remise+ 'Vente Net ='+vente+'€',

                )
            }

        })
    }

    renderList() {
        //map pour parcourir un objet i 
        return this.state.data.map(i => {
            var bru = i.price-(i.price * 22)/100
            var brut = bru.toFixed(2)
            var remis = (1- i.price/ brut) * 100
            var remise = remis.toFixed(2)
            var coef = i.price / 0.2;
            var coeff = coef.toFixed(2)
            var vent = i.price * 0.2
            var vente = vent.toFixed(2)
            return (

                <TouchableOpacity key={i} style={styles.welcome} onPress={() => this.renderById(i.id)} >
                    <Text>{i.title}</Text>
                </TouchableOpacity>

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