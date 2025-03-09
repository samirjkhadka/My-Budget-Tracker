import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import StatsScreen from "../screens/StatsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AccountsScreen from "../screens/AccountsScreen";
// import createExpense from "../screens/CreateExpense";
import CreateExpense from "../screens/CreateExpense";



const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  function BottomTabs() {
    return (
      <Tab.Navigator
        screenOptions={() => ({
          tabBarShowLabel: false,
          tabBarStyle: { height: 90 },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons
                  style={{ paddingTop: 3 }}
                  name="shuffle-outline"
                  size={30}
                  color={"#E97451"}
                />
              ) : (
                <Ionicons
                  style={{ paddingTop: 3 }}
                  name="shuffle-outline"
                  size={30}
                  color={"#A0A0A0"}
                />
              ),
          }}
        />
        <Tab.Screen
          name="Accounts"
          component={AccountsScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons
                  style={{ paddingTop: 3 }}
                  name="card-outline"
                  size={30}
                  color={"#E97451"}
                />
              ) : (
                <Ionicons
                  style={{ paddingTop: 3 }}
                  name="card-outline"
                  size={30}
                  color={"#A0A0A0"}
                />
              ),
          }}
        />
        <Tab.Screen
          name="Stats"
          component={StatsScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons
                  style={{ paddingTop: 3 }}
                  name="bar-chart-outline"
                  size={30}
                  color={"#E97451"}
                />
              ) : (
                <Ionicons
                  style={{ paddingTop: 3 }}
                  name="bar-chart-outline"
                  size={30}
                  color={"#A0A0A0"}
                />
              ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons
                  style={{ paddingTop: 3 }}
                  name="person-circle-outline"
                  size={30}
                  color={"#E97451"}
                />
              ) : (
                <Ionicons
                  style={{ paddingTop: 3 }}
                  name="person-circle-outline"
                  size={30}
                  color={"#A0A0A0"}
                />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }

  function MainStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Create"
          component={CreateExpense}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};

export default StackNavigator;
