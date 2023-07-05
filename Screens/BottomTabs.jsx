import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "./PostsScreen";
import CreatePostScreen from "./CreatePostsScreen";
import Home from "./Home";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native";
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            paddingBottom: 10,
            paddingHorizontal: 64,
          },
        ],
      }}
    >
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => alert("This is a button!")}>
              <Feather
                name="log-out"
                size={24}
                color="#BDBDBD"
                style={{ marginRight: 16 }}
              />
            </TouchableOpacity>
          ),
          title: "Публікації",
          tabBarIcon: ({ focused }) => (
            <View
              style={
                focused
                  ? [styles.navigation, styles.navigationActive]
                  : styles.navigation
              }
            >
              <Ionicons
                name="grid-outline"
                size={24}
                color={focused ? "#fff" : "#212121CC"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={({ navigation }) => ({
          title: "Створити публікацію",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign
                name="arrowleft"
                size={24}
                color="#BDBDBD"
                style={{ marginLeft: 16 }}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused }) => (
            <View
              style={
                focused
                  ? [styles.navigation, styles.navigationActive]
                  : styles.navigation
              }
            >
              <AntDesign
                name="plus"
                size={24}
                color={focused ? "#fff" : "#212121CC"}
              />
            </View>
          ),
          tabBarStyle: { display: navigation.isFocused() ? "none" : "flex" },
        })}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <View
              style={
                focused
                  ? [styles.navigation, styles.navigationActive]
                  : styles.navigation
              }
            >
              <Feather
                name="user"
                size={24}
                color={focused ? "#fff" : "#212121CC"}
              />
            </View>
          ),
          tabBarVisible: false,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  navigation: {
    backgroundColor: "transparent",
    paddingHorizontal: 23,
    paddingVertical: 8,
    borderRadius: 100,
  },
  navigationActive: {
    backgroundColor: "#FF6C00",
  },
});

export default BottomTabs;
