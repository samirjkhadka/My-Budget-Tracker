import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const AccountsScreen = () => {
  const [expenses, setExpenses] = useState([]);
  const [bankAccountBalance, setBankAccountBalance] = useState(0);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:8000/allExpenses");
      setExpenses(response.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const totalIncome = expenses
    ?.filter((expense) => expense.type == "Income")
    .reduce((total, expense) => total + parseFloat(expense.amount), 0);

  const totalExpense = expenses
    .filter((expense) => expense.type == "Expense")
    .reduce((total, expense) => total + parseFloat(expense.amount), 0);

  const totalSpentCash = expenses
    .filter((expense) => expense.type == "Expense" && expense.account == "Cash")
    .reduce((total, expense) => total + parseFloat(expense.amount), 0);

  const calculateTotal = () => {
    let BankBalance = 0;

    expenses?.forEach((expense) => {
      const { account, amount, type } = expense;
      const numericAmount = parseFloat(amount);
      if (account == "Bank Accounts") {
        if (type == "Expense") {
          BankBalance -= parseFloat(numericAmount);
        } else {
          BankBalance += parseFloat(numericAmount);
        }
      }
    });
    setBankAccountBalance(BankBalance);
  };

  useEffect(() => {
    calculateTotal();
  }, [expenses]);
  return (
    <SafeAreaView>
      <View style={{ backgroundColor: "white", padding: 10 }}>
        <Text style={{ textAlign: "center", fontSize: 15, fontWeight: "500" }}>
          AccountsScreen
        </Text>
      </View>
      <View style={{ borderColor: "#E0E0E0", borderWidth: 0.4 }} />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          paddingTop: 12,
          paddingBottom: 12,
          backgroundColor: "white",
        }}
      >
        <View>
          <Text
            style={{ fontWeight: "500", color: "#004953", textAlign: "center" }}
          >
            Assets
          </Text>
          <Text
            style={{
              textAlign: "center",
              marginTop: 5,
              color: "#0578eb",
              fontSize: 15,
              fontWeight: "500",
            }}
          >
            NPR {totalIncome.toFixed(2)}
          </Text>
        </View>

        <View>
          <Text style={{ fontWeight: "500", color: "#004953" }}>
            Liabilities
          </Text>
          <Text
            style={{
              marginTop: 5,
              textAlign: "center",
              color: "#0578eb",
              fontSize: 15,
              fontWeight: "500",
            }}
          >
            NPR {totalExpense.toFixed(2)}
          </Text>
        </View>

        <View>
          <Text
            style={{ fontWeight: "500", color: "#004953", textAlign: "center" }}
          >
            Total
          </Text>
          <Text
            style={{
              marginTop: 5,
              textAlign: "center",
              fontSize: 15,
              fontWeight: "500",
            }}
          >
            NPR {Number(totalIncome - totalExpense).toFixed(2)}
          </Text>
        </View>
      </View>
      <View style={{ borderColor: "#E0E0E0", borderWidth: 0.8 }} />
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 12,
            alignItems: "center",
          }}
        >
          <Text>Cash</Text>
          <Text style={{ color: "#eb6105" }}>
            NPR {totalSpentCash.toFixed(2)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 12,
            alignItems: "center",
          }}
        >
          <Text>Cash</Text>
          <Text style={{ color: "#eb6105" }}>
            NPR {totalSpentCash.toFixed(2)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 12,
            alignItems: "center",
          }}
        >
          <Text>Accounts</Text>
          <Text style={{ color: "#0578eb" }}>
            NPR {bankAccountBalance.toFixed(2)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 12,
            alignItems: "center",
          }}
        >
          <Text>Bank Accounts</Text>
          <Text style={{ color: "#0578eb" }}>
            NPR {bankAccountBalance.toFixed(2)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 12,
            alignItems: "center",
          }}
        >
          <Text>Cards</Text>
          <Text>NPR {bankAccountBalance.toFixed(2)}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 12,
            alignItems: "center",
          }}
        >
          <Text>Cards</Text>
          <Text>NPR {bankAccountBalance.toFixed(2)}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AccountsScreen;

const styles = StyleSheet.create({});
