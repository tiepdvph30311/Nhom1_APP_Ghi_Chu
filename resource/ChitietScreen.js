import { View, Text, StyleSheet, TouchableOpacity, Alert, ImageBackground, TextInput, ToastAndroid } from "react-native";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button, ImageBackground } from 'react-native'

import React, { useEffect, useState } from "react";

const ChitietScreen = ({route, navigation }) => {

  var api_url_notes = "https://65a65fdd74cf4207b4efe010.mockapi.io/notes";


  const [userid, setUserid] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createAt, setCreateAt] = useState("");
  const [isImportant, setIsImportant] = useState("");
  const idDelete = route.params.id;

  // Lấy dữ liệu từ navigation params
  // const { userid, title, content, createAt, isImportant } = route.params;
  //Cap nhat ngay hien tai
  useEffect(() => {
    setCreateAt(route.params.createAt);
    setIsImportant(route.params.isImportant);
    setUserid(route.params.userid);
    setTitle(route.params.title);
    setContent(route.params.content);
  }, []);

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
            DeleteNote();
            navigation.goBack(); // Ví dụ chuyển về màn hình trước đó
          },
        },
      ],
      { cancelable: true }
    );
  };

  const EditNote = () => {

    let apiUpdate = api_url_notes + "/" + idDelete;

    let object = {
      userid: userid,
      title: title,
      content: content,
      createAt: createAt,
      isImportant: isImportant
    }

    //Validate form
    if (title.length == 0) { alert("Hãy nhập tiêu đề"); return }
    if (content.length == 0) { alert("Hãy nhập nội dung"); return }

    fetch(apiUpdate, {
      method: 'PUT', //Post và Put phải có body, Delete thì không
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(object)
    })
      .then((res) => {
        if (res.status == 200) { //Trạng trái của server trả về khi thêm thành công
          ToastAndroid.showWithGravityAndOffset(
            'Sửa ghi chú thành công',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
          );

          //Xóa dữ liệu trong useState
          setContent(null);
          setTitle(null);
          navigation.navigate("HomeScreen")
        }
      })
      .catch((ex) => {
        console.log("Lỗi khi sửa sản phẩm: " + ex)
      })
  }

  const DeleteNote = () => {
    let apiDelete = api_url_notes + "/" + idDelete;
    fetch(apiDelete, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.status == 200) {
          ToastAndroid.showWithGravityAndOffset(
            'Đã xóa',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
          );
          navigation.navigate("HomeScreen")
        }
      })
  }

  return (
    <ImageBackground
      source={require("./images/hinhnendt4.jpg")}
      style={styles.container}
    >
      <View style={styles.khung_dialog}>
        {/*Đây là khu vực chứa nội dung dialog */}
        <Text style={{ fontSize: 25, padding: 10, color: 'white', textAlign: 'center' }}>CHI TIẾT GHI CHÚ</Text>
        <Text
         style= {styles.textContainer}>Ngày tạo: {createAt}</Text>
        <TextInput
          placeholder='Nhập tiêu đề mới'
          style={styles.textInputContainer}
          multiline={true} //Hiện thi chiều cao tương ứng với nội dung
          numberOfLines={2} // Số dòng hiển thị ban đầu
          value={title}
          textAlignVertical='top'
          onChangeText={(txt) => { setTitle(txt) }}
        />
        {/* <Text>{idDelete}</Text> */}
        <TextInput
          placeholder='Nhập nội dung mới'
          style={styles.textInputContainer}
          multiline={true} //Hiện thi chiều cao tương ứng với nội dung
          numberOfLines={20} // Số dòng hiển thị ban đầu
          value={content}
          textAlignVertical='top'
          onChangeText={(txt) => { setContent(txt) }}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            underlayColor="#f2e3de" // Màu nền khi người dùng nhấn
            activeOpacity={0.6}
            style={styles.touchContainer}
            onPress={EditNote}
          >
            <Text style={styles.txtPost}>Sửa</Text>
          </TouchableOpacity>

          <TouchableOpacity
            underlayColor="#f2e3de" // Màu nền khi người dùng nhấn
            activeOpacity={0.6}
            style={styles.touchContainer}
            onPress={handleDeletePress}>
            <Text style={styles.txtDone}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  )
};

export default ChitietScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover', // Stretches the image to cover the entire background
  },
  modal: {
    flex: 1,
    backgroundColor: '#efface',
    opacity: 0.9,
    padding: 20,
    marginTop: 50
  },
  khung_dialog: {
    backgroundColor: null,
    margin: 20,
    padding: 20,
    flex: 1,
  },
  textInputContainer: {
    width: '100%',
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 5,
    backgroundColor: '#efface',
    // height: 40,
    padding: 5,
    fontSize: 15
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Căn giữa và tạo khoảng cách giữa các nút
    marginTop: 10,
  },
  touchContainer: {
    width: '50%',
  },
  txtPost: {
    textAlign: 'center',
    backgroundColor: 'green',
    padding: 10,
    margin: 5,
    borderRadius: 10
  },
  txtDone: {
    textAlign: 'center',
    backgroundColor: 'red',
    padding: 10,
    margin: 5,
    borderRadius: 10
  },
  textContainer: {
    width: '100%',
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 5,
    backgroundColor: '#f2e3de',
    // height: 40,
    padding: 5,
    fontSize: 15
  },
})
