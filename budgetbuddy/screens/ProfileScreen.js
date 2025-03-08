import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ProfileScreen = () => {
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 35 : 0,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScrollView>
        <View style={{ padding: 12, flexDirection: "column", gap: 15 }}>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Ionicons name="calculator-outline" size={24} color="#282828" />
            <Text style={{ fontSize: 15 }}>Calc Box</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Ionicons name="laptop-outline" size={24} color="#282828" />
            <Text style={{ fontSize: 15 }}>PC Manager</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Ionicons name="help-circle-outline" size={24} color="#282828" />
            <Text style={{ fontSize: 15 }}>Help</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Ionicons name="document-text-outline" size={24} color="#282828" />
            <Text style={{ fontSize: 15 }}>Feedback</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Ionicons name="heart-outline" size={24} color="#282828" />
            <Text style={{ fontSize: 15 }}>Rate It </Text>
          </View>
        </View>

        <View
          style={{
            padding: 12,
            backgroundColor: "#E0E0E0",
            flexDirection: "column",
            gap: 15,
          }}
        >
          <Text style={{ color: "#282828" }}>Category/Accounts</Text>
        </View>
        <View style={{ padding: 12, flexDirection: "column", gap: 15 }}>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <MaterialCommunityIcons
              name="cash-multiple"
              size={24}
              color="#282828"
            />
            <Text style={{ fontSize: 15 }}>Income Category Settings</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <MaterialCommunityIcons
              name="cash-multiple"
              size={24}
              color="#282828"
            />
            <Text style={{ fontSize: 15 }}>Expense Category Settings</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <MaterialCommunityIcons
              name="cog-refresh-outline"
              size={24}
              color="#282828"
            />
            <Text style={{ fontSize: 15 }}>Account Settings</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <MaterialCommunityIcons
              name="note-multiple-outline"
              size={24}
              color="#282828"
            />
            <Text style={{ fontSize: 15 }}>Budget Settings</Text>
          </View>
        </View>
        <View
          style={{
            padding: 12,
            backgroundColor: "#E0E0E0",
            marginVertical: 10,
          }}
        >
          <Text style={{ color: "#282828" }}>Settings</Text>
        </View>
        <View style={{ padding: 12, flexDirection: "column", gap: 15 }}>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <MaterialCommunityIcons name="reload" size={24} color="#282828" />
            <Text style={{ fontSize: 15 }}>Backup</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <MaterialCommunityIcons
              name="lock-outline"
              size={24}
              color="#282828"
            />
            <Text style={{ fontSize: 15 }}>Passcode</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <MaterialCommunityIcons
              name="bell-oultline"
              size={24}
              color="#282828"
            />
            <Text style={{ fontSize: 15 }}>Alarm Settings</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <MaterialCommunityIcons
              name="palette-outline"
              size={24}
              color="#282828"
            />
            <Text style={{ fontSize: 15 }}>Style</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
