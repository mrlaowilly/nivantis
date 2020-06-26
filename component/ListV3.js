import React from 'react';
import { StyleSheet, Text, View, ListView, Button,TouchableOpacity, ScrollView, Alert  } from 'react-native';
import Pharmacie from '../assets/data/carte-des-pharmacies-de-paris'
import Forms from "../Form";
let data = Pharmacie;

export default class ListV3 extends React.Component{

    state = {
        modalVisible: false
    };

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    phama(){
        return data.map( i => {
            if (i.fields.complrs !== undefined) {
                return (
                    map = <TouchableOpacity key={i} style={styles.welcome} onPress={() => this.props.navigation.navigate('Forms', {id: i.recordid})}>
                        <Text>{i.fields.complrs}</Text>
                    </TouchableOpacity>
                )
            }
        })

    }

    render() {
        return (
            <ScrollView style={styles.scrollView}>
                {this.phama()}
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
        margin: 30,
    },
});