import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";


const HomeScreen = () => {
  const [option, setOption] = useState("Daily");
  const [currentDate, setCurrentDate] = useState(moment());
  const navigation = useNavigation();
  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => moment(prevDate).subtract(1, "month"));
  };
  const handleNextMonth = () => {
    setCurrentDate((prevDate) => moment(prevDate).add(1, "month"));
  };
  return (
    <>
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

        <View
          style={{
            paddingTop: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            marginHorizontal: 12,
            backgroundColor: "white",
          }}
        >
          <Pressable onPress={() => setOption("Daily")}>
            <Text
              style={{
                color: option === "Daily" ? "black" : "gray",
                fontSize: 14,
                fontWeight: "500",
              }}
            >
              Daily
            </Text>
          </Pressable>
          <Pressable onPress={() => setOption("Calendar")}>
            <Text
              style={{
                color: option === "Calendar" ? "black" : "gray",
                fontSize: 14,
                fontWeight: "500",
              }}
            >
              Calendar
            </Text>
          </Pressable>
          <Pressable onPress={() => setOption("Monthly")}>
            <Text
              style={{
                color: option === "Monthly" ? "black" : "gray",
                fontSize: 14,
                fontWeight: "500",
              }}
            >
              Monthly
            </Text>
          </Pressable>
          <Pressable onPress={() => setOption("Summary")}>
            <Text
              style={{
                color: option === "Summary" ? "black" : "gray",
                fontSize: 14,
                fontWeight: "500",
              }}
            >
              Summary
            </Text>
          </Pressable>
          <Pressable onPress={() => setOption("Description")}>
            <Text
              style={{
                color: option === "Description" ? "black" : "gray",
                fontSize: 14,
                fontWeight: "500",
              }}
            >
              Description
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
      <View
        style={{
          backgroundColor: "#FF7F50",
          width: 46,
          height: 46,
          borderRadius: 23,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: 20,
          right: 15,
        }}
      >
        <Pressable onPress={() => navigation.navigate('Create')}>
          <Ionicons name="add-outline" size={32} color="white" />
        </Pressable>
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
