import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
  Dimensions,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
const HomeScreen = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notes, setnotes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  var api_url_notes = "https://65a65fdd74cf4207b4efe010.mockapi.io/notes";

  const getData = async () => {
    try {
      // const value = await AsyncStorage.getItem("login");
      // if (value !== null) {
      // setobjU(JSON.parse(value));
      // let obj = JSON.parse(value);

      fetch(api_url_notes)
        .then((response) => response.json())
        .then(async (data) => {
          setnotes(data);
        })
        .catch((error) => console.error(error));
      // }
    } catch (e) {
      console.log(e);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      getData();
      onRefresh();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetch(api_url_notes)
      .then((response) => response.json())
      .then((data) => setnotes(data))
      .catch((error) => console.error(error));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

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
        <Text style={styles.noteDate}>{item.createAt}</Text>
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
          data={notes}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
