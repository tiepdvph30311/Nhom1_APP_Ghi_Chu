import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button, ImageBackground } from 'react-native'
import React, { useEffect, useState } from "react";

const Add = (props) => {

    const [userid, setUserid] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [createAt, setCreateAt] = useState("");
    const [isImportant, setIsImportant] = useState("");

    var api_url_notes = "https://65a65fdd74cf4207b4efe010.mockapi.io/notes";

    //Cap nhat ngay hien tai
    useEffect(() => {
        setCreateAt(new Date());
        setIsImportant("1");
    }, []);

    //Thanh Son
    const createNew = () => {
        let object = {
            userid: this.userid,
            title: this.title,
            content: this.content,
            createAt: this.createAt,
            isImportant: this.isImportant
        }

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
                    alert("Thêm ghi chú thành công");
                    setUserid = null;
                    setTitle = null;
                    setContent = null;
                    setCreateAt = null;
                    setIsImportant = null;
                    props.navigation.navigate("HomeScreen");
                }
            })
            .catch((exception) => {
                console.log("Lôi khi thêm ghi chú" + exception);
            })
    }

    return (
        <ImageBackground
            source={require("./images/imgDoiChe.jpg")}
            style={styles.container}
        >
            <View style={styles.khung_dialog}>
                {/*Đây là khu vực chứa nội dung dialog */}
                <Text style={{ fontSize: 23, padding: 10, color:'white', textAlign: 'center' }}>Bạn đang thêm ghi chú</Text>

                <TextInput
                    placeholder='Nhập userId'
                    style={styles.textInputContainer}
                    multiline={true} //Hiện thi chiều cao tương ứng với nội dung
                    numberOfLines={1} // Số dòng hiển thị ban đầu
                    onChangeText={(txt) => { setUserid(txt) }}
                />
                <TextInput
                    placeholder='Nhập tiêu đề'
                    style={styles.textInputContainer}
                    multiline={true} //Hiện thi chiều cao tương ứng với nội dung
                    numberOfLines={1} // Số dòng hiển thị ban đầu
                    onChangeText={(txt) => { setTitle(txt) }}
                />
                <TextInput
                    placeholder='Nhập nội dung'
                    style={styles.textInputContainer}
                    multiline={true} //Hiện thi chiều cao tương ứng với nội dung
                    numberOfLines={1} // Số dòng hiển thị ban đầu
                    onChangeText={(txt) => { setContent(txt) }}
                />
                <TextInput
                    placeholder='Ngày hiện tại'
                    style={styles.textInputContainer}
                    multiline={true} //Hiện thi chiều cao tương ứng với nội dung
                    numberOfLines={1} // Số dòng hiển thị ban đầu
                    editable={false}
                    value={createAt.toString()}
                />
                <View style={styles.buttonContainer}>
                    <Button title='Thêm' color='green' onPress={() => {
                        // Xử lý khi nhấn nút Thêm
                        createNew();
                    }} />

                    <Button title='Đóng' color='red' onPress={() => {
                        // Xử lý khi nhấn nút Đóng
                        props.navigation.navigate("HomeScreen");
                    }} />
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
        height: 40,
        padding: 5
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around', // Căn giữa và tạo khoảng cách giữa các nút
        marginTop: 20,

    },
})