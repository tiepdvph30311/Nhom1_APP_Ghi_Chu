import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./resource/Login";
import SignUp from "./resource/SignUp";
import HomeScreen from "./resource/HomeScreen";
import Add from "./resource/Add";
import ChitietScreen from "./resource/ChitietScreen";
import MyInfor from "./resource/MyInfor";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Add"
          component={Add}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChitietScreen"
          component={ChitietScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
        name="MyInfor"
        component={MyInfor}
        options={{headerShown: false}}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
