import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import { useFonts } from "expo-font";
import React from "react";
import BottomTabs from "./Screens/BottomTabs";
import CommentsScreen from "./Screens/CommentsScreen";
import AntDesign from "react-native-vector-icons/AntDesign";
import { TouchableOpacity } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    RobotoRegular: require("./src/assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("./src/assets/fonts/Roboto-Medium.ttf"),
    RobotoBold: require("./src/assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Registration">
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Auth"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Comments"
          component={CommentsScreen}
          options={({ navigation }) => ({
            title: "Коментарі",
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
