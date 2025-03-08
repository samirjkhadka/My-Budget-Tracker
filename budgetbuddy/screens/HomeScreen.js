import {
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";

const HomeScreen = () => {
  const [option, setOption] = useState("Daily");
  const [currentDate, setCurrentDate] = useState(moment());
  const navigation = useNavigation();
  const [expenses, setExpenses] = useState([]);
  const date = currentDate.format("MMMM YYYY");
  const [modalVisible, setModalVisible] = useState(false);
  const [currentData, setCurrentData] = useState([null]);

  const day = moment(currentData?.item?.date).format("DD");
  const monthYear = moment(currentData?.item?.date).format("MMM YYYY");
  const dayName = moment(currentData?.item?.date).format("ddd");

  const setOpenModal = (item, dayExpenses, totalIncome, totalExpense) => {
    setCurrentData({ item, dayExpenses, totalIncome, totalExpense });
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    fetchExpenses();
  }, [currentDate]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:8000/expenses", {
        params: { date },
      });
      setExpenses(response.data);
    } catch (error) {
      console.log("Error", error);
    }
  };
  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => moment(prevDate).subtract(1, "month"));
  };
  const handleNextMonth = () => {
    setCurrentDate((prevDate) => moment(prevDate).add(1, "month"));
  };

  const totalIncome = expenses
    ?.filter((expense) => expense.type === "Income")
    .reduce((total, expense) => total + parseFloat(expense.amount), 0);
  const totalExpense = expenses
    ?.filter((expense) => expense.type === "Expense")
    .reduce((total, expense) => total + parseFloat(expense.amount), 0);
  const dayExpenses = expenses?.filter((expense) => expense.day === day);

  const groupedExpenses = expenses.reduce((acc, expense) => {
    const day = expense.day;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(expense);
    return acc;
  }, {});

  useFocusEffect(
    useCallback(() => {
      fetchExpenses();
    }, [navigation])
  );

  const screenWidth = Dimensions.get("window").width;
  const boxWidth = screenWidth / 7 - 8;

  const [selectedMonth, setSelectedMonth] = useState(moment());

  const generateDaysForMonth = (month) => {
    const startOfMonth = month.clone().startOf("month");
    const endOfMonth = month.clone().endOf("month");

    const startDate = startOfMonth.clone().startOf("week");
    const endDate = endOfMonth.clone().endOf("week");

    const days = [];
    let date = startDate.clone();

    while (date.isBefore(endDate, "day")) {
      days.push({
        date: date.clone(),
        isCurrentMonth: date.month() === selectedMonth.month(),
      });
      date.add(1, "day");
    }

    return days;
  };

  const renderDay = ({ item }) => {
    const isSunday = item?.date.day() === 0;
    const isSaturday = item?.date.day() === 6;
    const isToday = item?.date.isSame(moment(), "day");
    const dayKey = item?.date.format("DD ddd").trim();

    const dayExpenses = groupedExpenses[dayKey] || [];
    const totalIncome = dayExpenses
      ?.filter((expense) => expense.type === "Income")
      .reduce((total, expense) => total + parseFloat(expense.amount), 0);
    const totalExpense = dayExpenses
      ?.filter((expense) => expense.type === "Expense")
      .reduce((total, expense) => total + parseFloat(expense.amount), 0);
    const totalSavings = totalIncome - totalExpense;

    return (
      <Pressable
        onPress={() =>
          setOpenModal(item, dayExpenses, totalIncome, totalExpense)
        }
        style={[
          {
            width: boxWidth,
            height: 90,
            backgroundColor: "white",
            margin: 4,
            borderRadius: 4,
          },
          isToday && { backgroundColor: "#b6f0b8" },
          isSunday && { backgroundColor: "#ffe5e5" },
          isSaturday && { backgroundColor: "#e5f1ff" },
        ]}
      >
        <Text
          style={{
            fontSize: 12,
            fontWeight: "500",
            textAlign: "center",
            color: isSunday ? "#db784b" : isSaturday ? "#4e91de" : "blcak",
            marginLeft: 2,
          }}
        >
          {item?.date.date()}
        </Text>

        <View>
          {totalIncome > 0 && (
            <Text
              style={{
                fontSize: 10,
                color: "#0578eb",
                textAlign: "left",
                marginLeft: 2,
                fontWeight: "500",
              }}
            >
              {totalIncome.toFixed(2)}{" "}
              <Text style={{ color: "green" }}>(+)</Text>
            </Text>
          )}
          {totalExpense > 0 && (
            <Text
              style={{
                fontSize: 10,
                color: "#eb6105",
                textAlign: "left",
                marginLeft: 2,
                fontWeight: "500",
              }}
            >
              {totalExpense.toFixed(2)}{" "}
              <Text style={{ color: "red" }}>(-)</Text>
            </Text>
          )}
          {totalSavings > 0 && (
            <Text
              style={{
                fontSize: 10,
                color: "black",
                textAlign: "left",
                marginLeft: 2,
                fontWeight: "500",
              }}
            >
              {totalSavings.toFixed(2)}{" "}
              <Text style={{ color: "green" }}>(+)</Text>
            </Text>
          )}
        </View>
      </Pressable>
    );
  };
  const days = generateDaysForMonth(currentDate);

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
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingTop: 12,
              paddingBottom: 12,
              justifyContent: "space-around",
              backgroundColor: "white",
            }}
          >
            <View>
              <Text
                style={{
                  fontWeight: "500",
                  color: "#004953",
                  textAlign: "center",
                }}
              >
                Expense
              </Text>
              <Text>NPR {totalExpense.toFixed(2)}</Text>
            </View>
            <View>
              <Text
                style={{
                  fontWeight: "500",
                  color: "#004953",
                  textAlign: "center",
                }}
              >
                Income
              </Text>
              <Text>NPR {totalIncome.toFixed(2)}</Text>
            </View>
            <View>
              <Text
                style={{
                  fontWeight: "500",
                  color: "#004953",
                  textAlign: "center",
                }}
              >
                Total
              </Text>
              <Text>NPR {(totalIncome - totalExpense).toFixed(2)}</Text>
            </View>
          </View>
          <View style={{ backgroundColor: "#E0E0E0", borderWidth: 0.6 }}></View>

          {option === "Daily" && (
            <ScrollView>
              <View>
                {Object.keys(groupedExpenses).map((item, index) => {
                  const totalExpense = groupedExpenses[item]
                    .filter((expense) => expense.type === "Expense")
                    .reduce(
                      (sum, expense) => sum + parseFloat(expense.amount),
                      0
                    );

                  const totalIncome = groupedExpenses[item]
                    .filter((expense) => expense.type === "Income")
                    .reduce(
                      (sum, expense) => sum + parseFloat(expense.amount),
                      0
                    );

                  return (
                    <Pressable
                      style={{
                        padding: 12,
                        marginBottom: 10,
                        backgroundColor: "white",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <Text style={{ fontSize: 16, fontWeight: "500" }}>
                            {item?.split(" ")[0]}
                          </Text>
                          <Text
                            style={{
                              fontSize: 11,
                              color: "white",
                              backgroundColor: "#404040",
                              borderRadius: 4,
                              paddingHorizontal: 4,
                              paddingVertical: 2,
                            }}
                          >
                            {item?.split(" ")[1]}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            gap: 50,
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              fontWeight: "400",
                              fontSize: 15,
                              color: "#0578eb",
                            }}
                          >
                            NPR {totalIncome.toFixed(2)}
                          </Text>
                          <Text
                            style={{
                              fontWeight: "400",
                              fontSize: 15,
                              color: "#eb6105",
                            }}
                          >
                            {" "}
                            NPR {totalExpense.toFixed(2)}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          borderColor: "#E0E0E0",
                          borderWidth: 0.4,
                          marginTop: 7,
                        }}
                      />

                      {groupedExpenses[item].map((item, index) => (
                        <Pressable style={{ marginTop: 18 }} key={index}>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              gap: 30,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 13,
                                color: "gray",
                                minWidth: 70,
                              }}
                            >
                              {item?.category}
                            </Text>
                            <View style={{ flex: 1 }}>
                              <Text style={{ fontSize: 14, color: "gray" }}>
                                {item?.account}
                              </Text>
                              {item?.note && (
                                <Text
                                  style={{
                                    fontSize: 14,
                                    color: "gray",
                                    marginTop: 2,
                                  }}
                                >
                                  {item?.note}
                                </Text>
                              )}
                            </View>

                            <Text
                              style={{
                                color:
                                  item?.type == "Expense"
                                    ? "#eb6105"
                                    : "#0578eb",
                              }}
                            >
                              NPR {Number(item?.amount).toFixed(2)}
                            </Text>
                          </View>
                        </Pressable>
                      ))}
                    </Pressable>
                  );
                })}
              </View>
            </ScrollView>
          )}
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
        <Pressable onPress={() => navigation.navigate("Create")}>
          <Ionicons name="add-outline" size={32} color="white" />
        </Pressable>
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
