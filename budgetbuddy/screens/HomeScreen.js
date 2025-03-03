import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import moment from "moment";

const HomeScreen = () => {
  const [currentDate, setCurrentDate] = useState(moment());
  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => moment(prevDate).subtract(1, "month"));
  };
  const handleNextMonth = () => {
    setCurrentDate((prevDate) => moment(prevDate).add(1, "month"));
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F8F8" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 12,
          backgroundColor: "white",
        }}
      >
        <Ionicons name="search-outline" size={23} color="black" />
        <Text>Money Manager</Text>
        <Ionicons name="filter-outline" size={23} color="black" />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 15,
          marginHorizontal: 10,
          justifyContent: "space-between",
          backgroundColor: "white",
        }}
      >
        <MaterialIcons
          onPress={handlePrevMonth}
          name="chevron-left"
          size={24}
          color="black"
        />
        <Text>{currentDate.format("MMMM YYYY")}</Text>
        <MaterialIcons
          onPress={handleNextMonth}
          name="chevron-right"
          size={24}
          color="black"
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
