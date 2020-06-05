import React from 'react';
import { Image, StyleSheet, Text, View, Button } from 'react-native';
import logo from './assets/logo.jpg';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DetailsScree from "./component/DetailsScreen"

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>DMO x Nivantis App
                {`
Version 1: Détails médicaments
Version 2: Détails officines et formulaires
`}
            </Text>
            <Button
                title="Accès version 1"
                onPress={() => navigation.navigate('Details')}
            />
            <Button
                title="Accès version 2"
                onPress={() => navigation.navigate('Version2')}
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

export default function App() {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Acceuil Nivantis DMO' }} />
                <Stack.Screen name="Details" component={DetailsScree} options={{ title: 'Version 1' }} />
                <Stack.Screen name="Version2" component={Version2Screen} options={{ title: 'Version 2' }} />
            </Stack.Navigator>
            <Image source={logo} style={styles.logo} />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 305,
        height: 55,
    },
});