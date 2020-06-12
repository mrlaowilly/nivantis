import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';

import t from 'tcomb-form-native';
import * as  firebase from 'firebase';
import 'firebase/firestore';

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
firebase.initializeApp(FirebaseConfig);

const Form = t.form.Form;

const User = t.struct({
    champ1: t.String,
    champ2: t.maybe(t.String),
    champ3: t.String,
    terms: t.Boolean
});

const formStyles = {
    ...Form.stylesheet,
    formGroup: {
        normal: {
            marginBottom: 10
        },
    },
    controlLabel: {
        normal: {
            color: 'blue',
            fontSize: 18,
            marginBottom: 7,
            fontWeight: '600'
        },
        // the style applied when a validation error occours
        error: {
            color: 'red',
            fontSize: 18,
            marginBottom: 7,
            fontWeight: '600'
        }
    }
}

const options = {
    fields: {
        champ1: {
            label: 'Horaire',
            error: 'Veuillez rentrer des horaires'
        },
        champ2: {
            label: 'Jour de garde',
        },
        champ3: {
            label: 'Nombre de pharmacien présent',
            error: 'Veuillez rentrer un nombre de pharmacien'
        },
        terms: {
            label: 'Etre rappelé par un conseillé Nivantis',
        },
    },
    stylesheet: formStyles,
};

export default class App extends Component {

    handleSubmit = () => {
        const value = this._form.getValue();
        console.log(firebase.database().ref('/test/').push(value));
        console.log(value);
        if (value !== null){
            this.props.navigation.navigate('Home');
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Form
                    ref={c => this._form = c}
                    type={User}
                    options={options}
                />
                <Button
                    title="Envoyer les informations"
                    onPress={this.handleSubmit}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
    },
});
