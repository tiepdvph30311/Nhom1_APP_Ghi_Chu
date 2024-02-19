import { StyleSheet, Text, View, Image, Button, TouchableOpacity, Dimensions, ImageBackground, Modal, TextInput, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyInfor = (props) => {
    const [Id, setId] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");

    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [repeatNewPass, setRepeatNewPass] = useState("");

    const [showModelEditPass, setShowModelEditPass] = useState(false);
    const [showModelEditInfor, setShowModelEditInfor] = useState(false);


    useEffect(() => {
        getInfor();
    }, []);

    const getInfor = async () => {
        const storedObjU = await AsyncStorage.getItem("login");

        if (storedObjU) {
            const objU = await JSON.parse(storedObjU);
            setId(objU.id)
            setUsername(objU.username);
            setFullname(objU.fullname);
            setPassword(objU.password);
        } else {
            console.log("Không có giá trị trong AsyncStorage cho khóa 'login'");
        }
    }

    const updateUserInfoInStorage = async (newUserInfo) => {
        try {
            // Lấy dữ liệu cũ từ AsyncStorage
            const storedObjU = await AsyncStorage.getItem("login");

            if (storedObjU) {
                // Parse dữ liệu cũ thành đối tượng
                const objU = JSON.parse(storedObjU);

                // Cập nhật dữ liệu mới
                const updatedObjU = {
                    ...objU,
                    ...newUserInfo,
                };

                // Lưu dữ liệu mới vào AsyncStorage
                await AsyncStorage.setItem("login", JSON.stringify(updatedObjU));

                // Cập nhật state nếu cần
                setId(updatedObjU.id);
                setUsername(updatedObjU.username);
                setFullname(updatedObjU.fullname);
                setPassword(updatedObjU.password);
            } else {
                console.log("Không có giá trị trong AsyncStorage cho khóa 'login'");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật dữ liệu trong AsyncStorage: ", error);
        }
    }

    const Logout = async () => {
        try {
            // Xóa toàn bộ dữ liệu từ AsyncStorage
            await AsyncStorage.clear();
            console.log('Dữ liệu đã được xóa thành công');

            // Reset giá trị trong useState
            setId("");
            setFullname("");
            setUsername("");
            setPassword("");

            // Chuyển hướng đến màn hình đăng nhập
            props.navigation.navigate("Login");
        } catch (error) {
            console.error('Lỗi khi xóa dữ liệu: ', error);
        }
    }

    const EditPass = async () => {
        //Validate form
        if (oldPass.length == 0) { alert("Nhập mật khẩu cũ"); return }
        if (newPass.length == 0) { alert("Nhập mật khẩu mới"); return }
        if (repeatNewPass.length == 0) { alert("Nhắc lại mật khẩu mới"); return }
        if (oldPass != password) { alert("Mật khẩu cũ không chính xác"); return }

        if (newPass != repeatNewPass) { alert("Nhắc lại mật khẩu không chính xác"); return }
        else {
            let apiEditPass = "https://65a65fdd74cf4207b4efe010.mockapi.io/users" + "/" + Id;

            let object = {
                password: newPass,
            }
            fetch(apiEditPass, {
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
                            'Đổi mật khẩu thành công!',
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM,
                            25,
                            50
                        );
                        let newUserInfor = {
                            id: Id,
                            username: username,
                            password: newPass,
                            fullname: fullname
                        }

                        updateUserInfoInStorage(newUserInfor);
                        setShowModelEditPass(false);
                    }
                })
                .catch((ex) => {
                    console.log("Lỗi khi đổi mật khẩu: " + ex)
                })
        }
    }

    const EditInfor = async () => {
        //Validate form
        if (fullname.length == 0) { alert("Nhập họ và tên mới"); return }
        if (username.length == 0) { alert("Nhập tên đăng nhập mới"); return }

        let apiEditInfor = "https://65a65fdd74cf4207b4efe010.mockapi.io/users" + "/" + Id;
        let object = {
            fullname: fullname,
            username: username
        }
        fetch(apiEditInfor, {
            method: 'PUT', //Post và Put phải có body, Delete thì không
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        })
            .then((res) => {
                if (res.status == 200) { //Trạng trái của server trả về khi sửa thành công
                    ToastAndroid.showWithGravityAndOffset(
                        'Đổi thông tin thành công!',
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                    let newUserInfor = {
                        id: Id,
                        username: username,
                        password: newPass,
                        fullname: fullname
                    }

                    updateUserInfoInStorage(newUserInfor);
                    setShowModelEditInfor(false);
                }
            })
            .catch((ex) => {
                console.log("Lỗi khi sửa thông tin: " + ex)
            })
    }

    return (
        <ImageBackground
            source={require("./images/hinhnendt4.jpg")}
            style={styles.container}
        >
            <View style={styles.container}>

                <View style={styles.containerInfor}>
                    <Image
                        source={require('./images/imgAvatar.png')}
                        style={styles.profileImage}
                    />
                    <TouchableOpacity style={styles.btnEditPass} onPress={() => setShowModelEditInfor(true)}>
                        <Text style={styles.txtFullName}>{fullname}</Text>
                        <Image
                            source={require('./images/imgEdit.png')}
                            style={styles.editImage}
                        />
                    </TouchableOpacity>
                    {/* <Text style={styles.txtAccount}>Account: {username}</Text> */}
                    <TouchableOpacity style={styles.btnEditPass} onPress={() => setShowModelEditPass(true)}>
                        <Text style={styles.textEditPass}>Đổi mật khẩu</Text>
                        <Image
                            source={require('./images/imgEdit.png')}
                            style={styles.editImage}
                        />
                    </TouchableOpacity>
                    <View style={{ marginHorizontal: 50 }}>
                        <TouchableOpacity style={styles.signIn} onPress={Logout}>
                            <Text
                                style={{ fontSize: 17, color: "white", fontWeight: "bold" }}
                            >
                                Đăng xuất
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <Modal
                visible={showModelEditInfor}
                transparent={true}
                animationType='fade'
                onRequestClose={() => {
                    setShowModelEditInfor(false);
                }}
            >
                <View style={styles.modal}>
                    <View style={styles.khung_dialog}>

                        {/*Đây là khu vực chứa nội dung dialog */}
                        <Text style={{ fontSize: 25, padding: 10, textAlign: 'center' }}>Đổi thông tin người dùng</Text>

                        <Text style={{ marginTop: 5 }}>Tên người dùng:</Text>
                        <TextInput
                            placeholder='Nhập tên người dùng mới'
                            style={styles.textInputContainer}
                            multiline={true} //Hiện thi chiều cao tương ứng với nội dung
                            numberOfLines={1} // Số dòng hiển thị ban đầu
                            value={fullname}
                            onChangeText={(txt) => { setFullname(txt) }}
                        />
                        <Text style={{ marginTop: 5 }}>Tên đăng nhập:</Text>
                        <TextInput
                            placeholder='Nhập tên đăng nhập mới'
                            style={styles.textInputContainer}
                            multiline={true} //Hiện thi chiều cao tương ứng với nội dung
                            numberOfLines={1} // Số dòng hiển thị ban đầu
                            value={username}
                            onChangeText={(txt) => { setUsername(txt) }}
                        />

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                underlayColor="#f2e3de" // Màu nền khi người dùng nhấn
                                activeOpacity={0.6}
                                style={styles.touchContainer}
                                onPress={() => {
                                    EditInfor();
                                }}>
                                <Text style={styles.txtPost}>Sửa</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                underlayColor="#f2e3de" // Màu nền khi người dùng nhấn
                                activeOpacity={0.6}
                                style={styles.touchContainer}
                                onPress={() => setShowModelEditInfor(false)}>
                                <Text style={styles.txtDone}>Cancle</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                visible={showModelEditPass}
                transparent={true}
                animationType='fade'
                onRequestClose={() => {
                    setShowModelEditPass(false);
                }}
            >
                <View style={styles.modal}>
                    <View style={styles.khung_dialog}>

                        {/*Đây là khu vực chứa nội dung dialog */}
                        <Text style={{ fontSize: 25, padding: 10, textAlign: 'center' }}>Đổi mật khẩu</Text>

                        <TextInput
                            placeholder='Nhập mật khẩu cũ'
                            style={styles.textInputContainer}
                            multiline={true} //Hiện thi chiều cao tương ứng với nội dung
                            numberOfLines={1} // Số dòng hiển thị ban đầu
                            onChangeText={(txt) => { setOldPass(txt) }}
                        />
                        <TextInput
                            placeholder='Nhập mật khẩu mới'
                            style={styles.textInputContainer}
                            multiline={true} //Hiện thi chiều cao tương ứng với nội dung
                            numberOfLines={1} // Số dòng hiển thị ban đầu
                            onChangeText={(txt) => { setNewPass(txt) }}
                        />
                        <TextInput
                            placeholder='Nhập lại mật khẩu mới'
                            style={styles.textInputContainer}
                            multiline={true} //Hiện thi chiều cao tương ứng với nội dung
                            numberOfLines={1} // Số dòng hiển thị ban đầu
                            onChangeText={(txt) => { setRepeatNewPass(txt) }}
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                underlayColor="#f2e3de" // Màu nền khi người dùng nhấn
                                activeOpacity={0.6}
                                style={styles.touchContainer}
                                onPress={() => {
                                    EditPass();
                                }}>
                                <Text style={styles.txtPost}>Lưu</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                underlayColor="#f2e3de" // Màu nền khi người dùng nhấn
                                activeOpacity={0.6}
                                style={styles.touchContainer}
                                onPress={() => setShowModelEditPass(false)}>
                                <Text style={styles.txtDone}>Cancle</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ImageBackground>

    );
};

export default MyInfor;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    containerInfor: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    editImage: {
        width: 20,
        height: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50, // Đảm bảo hình ảnh có hình dạng hình tròn
        marginBottom: 10,
    },
    txtFullName: {
        fontSize: 24, textDecorationLine: 'underline', color: 'blue', margin: 5
    },
    txtAccount: {
        fontSize: 18,
        color: 'black',
        margin: 5,
    },
    signIn: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: "#23B4D2",
        marginTop: 30,
        padding: 15,
    },
    textEditPass: { fontSize: 16, textDecorationLine: 'underline', color: 'blue', margin: 5 },
    btnEditPass: { flexDirection: 'row', alignContent: 'center', alignItems: 'center' },
    modal: {
        // backgroundColor: 'pink',
        opacity: 1,
        width: '100%',
        height: '70%',
        marginTop: '30%',
        // flex: 1
    },
    khung_dialog: {
        backgroundColor: 'white',
        margin: 20,
        padding: 20,
        borderRadius: 30,
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
        marginTop: 70,
    },
    touchContainer: {
        width: '50%',
    },
    txtDone: {
        textAlign: 'center',
        backgroundColor: 'red',
        padding: 10,
        margin: 5,
        borderRadius: 10
    },
    txtPost: {
        textAlign: 'center',
        backgroundColor: 'green',
        padding: 10,
        margin: 5,
        borderRadius: 10
    },
});
