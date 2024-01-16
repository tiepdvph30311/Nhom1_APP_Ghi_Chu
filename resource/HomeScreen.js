import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
const HomeScreen = () => {
  const [darkMode, setDarkMode] = useState(false);
  const data = [
    {
      id: "1",
      title: "WorkShop3",
      date: "16/1/2024",
      content: "Làm bài tập workshop3 hạn đến 23:59 ngày 16/1/2024",
    },
    // Thêm các mục dữ liệu khác nếu cần
  ];
  const handleAddNote = () => {
    // Xử lý sự kiện thêm ghi chú
    console.log("Add Note button pressed");
  };

  const toggleDarkMode = () => {
    // Xử lý sự kiện chọn chế độ sáng/tối
    setDarkMode(!darkMode);
  };
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.noteContainer}>
        <Text style={styles.noteTitle}>{item.title}</Text>
        <Text style={styles.noteDate}>{item.date}</Text>
        <Text style={styles.noteContent} numberOfLines={1}>
          {item.content}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity onPress={toggleDarkMode}>
          {darkMode ? (
            <Entypo
              name="light-down"
              size={28}
              color="black"
              style={styles.darkModeIcon}
            />
          ) : (
            <Entypo
              name="light-up"
              size={28}
              color="black"
              style={styles.darkModeIcon}
            />
          )}
        </TouchableOpacity>

        <Text style={styles.header}>Ghi Chú</Text>

        <FlatList
          style={styles.flastlist}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <TouchableOpacity>
          <Image
            source={require("./images/new.png")}
            style={{ width: 40, height: 40, marginLeft: 340 }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    marginTop: 15,
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  noteContainer: {
    backgroundColor: "#e0e0e0",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  noteDate: {
    color: "#555",
    marginBottom: 5,
  },
  noteContent: {
    fontSize: 16,
  },
  darkModeIcon: {
    marginTop: 15,
    marginLeft: 340,
  },
  flastlist: {
    height: Dimensions.get("window").height / 1.4,
  },
  imgadd: {
    width: 20,
    height: 20,
  },
});
