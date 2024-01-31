import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button, ImageBackground, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Add = (props) => {

    const [userid, setUserid] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [createAt, setCreateAt] = useState("");
    const [isImportant, setIsImportant] = useState("");

    var api_url_notes = "https://65a65fdd74cf4207b4efe010.mockapi.io/notes";

    const getIdUser = async () => {
        const storedObjU = await AsyncStorage.getItem("login");

        if (storedObjU) {
            const objU = await JSON.parse(storedObjU);
            // console.log(objU.id);
            setUserid(objU.id)
        } else {
            console.log("Không có giá trị trong AsyncStorage cho khóa 'login'");
        }
    }


    //Cap nhat ngay hien tai
    useEffect(() => {
        setCreateAt(new Date());
        setIsImportant("1");
        getIdUser();
    }, []);

    //Thanh Son
    const createNew = () => {
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

        fetch(api_url_notes, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        })
            .then((response) => {
                if (response.status == 201) {
                    ToastAndroid.showWithGravityAndOffset(
                        'Thêm ghi chú thành công',
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                    setContent("");
                    setTitle("");
                    props.navigation.navigate("HomeScreen")
                }
            })
            .catch((exception) => {
                console.log("Lôi khi thêm ghi chú" + exception);
            })
    }

    return (
        <ImageBackground
            source={require("./images/hinhnendt4.jpg")}
            style={styles.container}
        >
            <View style={styles.khung_dialog}>
                {/*Đây là khu vực chứa nội dung dialog */}
                <Text style={{ fontSize: 23, padding: 10, color: 'white', textAlign: 'center' }}>THÊM GHI CHÚ</Text>

                <TextInput
                    placeholder='Nhập tiêu đề'
                    style={styles.textInputContainer}
                    multiline={true} //Hiện thi chiều cao tương ứng với nội dung
                    numberOfLines={2} // Số dòng hiển thị ban đầu
                    value={title}
                    textAlignVertical='top'
                    onChangeText={(txt) => { setTitle(txt) }}
                />
                <TextInput
                    placeholder='Nhập nội dung'
                    style={styles.textInputContainer}
                    multiline={true} //Hiện thi chiều cao tương ứng với nội dung
                    numberOfLines={20} // Số dòng hiển thị ban đầu
                    value={content}
                    textAlignVertical='top'
                    onChangeText={(txt) => { setContent(txt) }}
                />
                <TouchableOpacity
                    underlayColor="#f2e3de" // Màu nền khi người dùng nhấn
                    activeOpacity={0.6}
                    style={styles.touchContainer}
                    onPress={createNew}>

                </TouchableOpacity>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        underlayColor="#f2e3de" // Màu nền khi người dùng nhấn
                        activeOpacity={0.6}
                        style={styles.touchContainer}
                        onPress={createNew}>
                        <Text style={styles.txtPost}>Lưu</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        underlayColor="#f2e3de" // Màu nền khi người dùng nhấn
                        activeOpacity={0.6}
                        style={styles.touchContainer}
                        onPress={() => props.navigation.navigate("MyInfor")}>
                        <Text style={styles.txtDone}>UserInfor, ChangePass, Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}

export default Add

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
    }
})