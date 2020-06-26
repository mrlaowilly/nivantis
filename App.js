import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, Button, AppRegistry } from 'react-native';
import logo from './assets/logo.jpg';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Banner } from 'react-native-paper';
import ListV3 from "./component/ListV3";

import DetailsScree from "./component/DetailsScreen"
import Maps from "./component/Maps";
import Form from "./component/Form";
import Medic from "./assets/data/medicaments";


function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>
                {`
Version 1: Détails médicaments
`}
            </Text>
            <Button
                title="Accès version 1"
                onPress={() => navigation.navigate('Details')}
            />
            <Text>
                {`
Version 2: Détails officines
`}
            </Text>
            <Button
                title="Accès version 2"
                onPress={() => navigation.navigate('Version2')}
            />
            <Text>
                {`
Version 3: Formulaire
`}
            </Text>
            <Button
                title="Accès version 3"
                onPress={() => navigation.navigate('Version3')}
            />
        </View>
    );
}

function Version2Screen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Ecran de la version 2</Text>
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
        </View>
    );
}

const Stack = createStackNavigator();

export default class MyComponent extends React.Component {
    state = {
        visible: true,
    };
    render() {
        return (
            <NavigationContainer>
                <Banner
                    style={{ backgroundColor: 'wheat', marginTop: 30 }}
                    visible={this.state.visible}
                    actions={[
                        {
                            label: 'Accepter les cookies',
                            onPress: () => this.setState({ visible: false }),
                        },
                        {
                            label: 'Refuser',
                            onPress: () => this.setState({ visible: false }),
                        },
                    ]}
                    icon={({ size }) =>
                        <Image
                            source={{ uri: 'https://www.latableadessert.fr/sites/default/files/ct/corner_page_recipes_inspiration/image/ltad-picto-cookie.png' }}
                            style={{
                                width: size,
                                height: size,
                            }}
                        />
                    }
                >
                    En acceptant, vous déclarer etre consentant pour la collecte de données, blablabla, si vous refusé vous irez en enfer.
                </Banner>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Acceuil Nivantis DMO' }} />
                    <Stack.Screen name="Details" component={DetailsScree} options={{ title: 'Version 1' }} />
                    <Stack.Screen name="Version2" component={Maps} options={{ title: 'Version 2' }} />
                    <Stack.Screen name="Version3" component={ListV3} options={{ title: 'Version 3' }} />
                    <Stack.Screen name="Forms" component={Form} options={{ title: 'Forms' }} />
                </Stack.Navigator>
                <TouchableOpacity
                    onPress={() => alert(`
A propos
Texte a propos de Nivantis
Notice
Texte a propos de la notice
Infos légales
Texte a propos de l'information légales
`)}
                    style={{ backgroundColor: 'lightgrey' }}>
                    <Text style={{ fontSize: 20, color: '#fff' }}>A propos / Notice / Infos légales</Text>
                </TouchableOpacity>
                <Image source={logo} style={styles.logo} />
            </NavigationContainer>
        );    }
}

const styles = StyleSheet.create({
    logo: {
        width: 305,
        height: 55,
    },
});