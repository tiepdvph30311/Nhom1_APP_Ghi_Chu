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
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = (props) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notes, setnotes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [objU, setobjU] = useState({});

  // Khai báo state mới để lưu trữ màu nền
  const [backgroundColor, setBackgroundColor] = useState("#fff");

  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    if (searchText.trim() === "") {
      fetchData();
    } else {
      const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setnotes(filteredNotes);
    }
  };

  var api_url_notes = "https://65a65fdd74cf4207b4efe010.mockapi.io/notes";

  const fetchData = async () => {
    try {
      const value = await AsyncStorage.getItem("login");
      if (value !== null) {
        setobjU(JSON.parse(value));
        const iduser = JSON.parse(value).id;

        fetch(api_url_notes)
          .then((response) => response.json())
          .then(async (data) => {
            const filteredNotes = data.filter((note) => note.userid === iduser);
            setnotes(filteredNotes);
          })
          .catch((error) => console.error(error));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // Cập nhật màu nền tùy thuộc vào trạng thái darkMode
    if (darkMode) {
      setBackgroundColor("#333");
    } else {
      setBackgroundColor("#fff");
    }
    fetchData();
  }, [darkMode]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData1 = async () => {
        try {
          const value = await AsyncStorage.getItem("login");
          if (value !== null) {
            setobjU(JSON.parse(value));
            const iduser = JSON.parse(value).id;

            fetch(api_url_notes)
              .then((response) => response.json())
              .then(async (data) => {
                const filteredNotes = data.filter(
                  (note) => note.userid === iduser
                );
                setnotes(filteredNotes);
              })
              .catch((error) => console.error(error));
          }
        } catch (e) {
          console.log(e);
        }
      };

      fetchData1();
    }, [])
  );

  const toggleDarkMode = () => {
    // Xử lý sự kiện chọn chế độ sáng/tối
    setDarkMode(!darkMode);
  };
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.noteContainer}
        onPress={() => {
          props.navigation.navigate("ChitietScreen", item);
        }}
      >
        <Text style={styles.noteTitle}>{item.title}</Text>
        <Text style={styles.noteDate}>{item.createAt}</Text>
        <Text style={styles.noteContent} numberOfLines={1}>
          {item.content}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("MyInfor");
            }}
          >
            <Ionicons
              name="person-circle-outline"
              size={33}
              color="black"
              style={styles.personIcon}
            />
          </TouchableOpacity>
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
        </View>

        <Text style={styles.header}>Ghi Chú</Text>

        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <TextInput
            style={styles.input}
            placeholder="Tìm kiếm theo tiêu đề..."
            onChangeText={(text) => setSearchText(text)}
            value={searchText}
          />
          <TouchableOpacity style={styles.btnSearch} onPress={handleSearch}>
            <Text>Tìm Kiếm</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          style={styles.flastlist}
          data={notes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Add");
          }}
        >
          <Image
            source={require("./images/new.png")}
            style={{
              width: 40,
              height: 40,
              marginLeft: Dimensions.get("window").width / 1.3,
            }}
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
    marginTop: 5,
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  noteContainer: {
    backgroundColor: "#e0e0e0",
    padding: 15,
    marginTop: 10,
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
    marginLeft: Dimensions.get("window").width / 1.35,
  },
  personIcon: {
    marginTop: 15,
  },
  flastlist: {
    height: Dimensions.get("window").height / 1.5,
  },
  imgadd: {
    width: 20,
    height: 20,
  },
  input: {
    padding: 5,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "black",
    width: 200,
    borderRadius: 10,
  },

  btnSearch: {
    marginLeft: 5,
    width: 80,
    padding: 5,
    backgroundColor: "#55acee",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});
