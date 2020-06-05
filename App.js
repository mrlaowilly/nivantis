import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import logo from './assets/logo.jpg';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


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

function DetailsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Ecran de la version</Text>
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
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
              <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Version 1' }} />
              <Stack.Screen name="Version2" component={Version2Screen} options={{ title: 'Version 2' }} />
          </Stack.Navigator>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.instructions}>
{`
Version 1: Détails médicaments
Version 2: Détails officines et formulaires
`}
          </Text>
          <TouchableOpacity onPress={() => alert('Hello, world!')} style={styles.button}>
              <Text style={styles.buttonText}>Accès version 1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('Hello, world!')} style={styles.button}>
              <Text style={styles.buttonText}>Accès version 2</Text>
          </TouchableOpacity>
          <Text style={styles.instructions}>
              A propos / Notice / Infos légales
          </Text>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
/*  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
*/
  logo: {
    width: 305,
    height: 55,
  },
  instructions: {
    textAlign: 'center',
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 25,
    marginTop: 25,
  },
  button: {
    backgroundColor: "steelblue",
    padding: 20,
    borderRadius: 5,
    marginBottom: 25,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "cover"
  },
});