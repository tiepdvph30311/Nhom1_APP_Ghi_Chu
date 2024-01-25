import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React from "react";

const ChitietScreen = ({ route, navigation }) => {
  // Lấy dữ liệu từ navigation params
  const { title, content } = route.params;

  // Xử lý khi nút Sửa được nhấn
  const handleEditPress = () => {
    // Chuyển hướng đến màn hình sửa ghi chú và truyền dữ liệu cần sửa
    navigation.navigate("EditNote", { title, content });
  };

  // Xử lý khi nút Xóa được nhấn
  const handleDeletePress = () => {
    // Hiển thị cảnh báo xác nhận xóa
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc muốn xóa ghi chú này?",
      [
        { text: "Hủy bỏ", style: "cancel" },
        {
          text: "Xóa",
          onPress: () => {
            // Thực hiện xóa ghi chú ở đây (bạn cần thêm logic xóa dữ liệu)
            // Sau khi xóa xong, bạn có thể chuyển hướng về màn hình danh sách ghi chú hoặc thực hiện các thao tác khác
            navigation.goBack(); // Ví dụ chuyển về màn hình trước đó
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
          <Text style={styles.buttonText}>Sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeletePress}
        >
          <Text style={styles.buttonText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChitietScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    padding: 10,
    marginRight: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#f44336",
    padding: 10,
    marginLeft: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
