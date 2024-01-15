import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native'
import React, { useState } from 'react'

const Login = ({ navigation }) => {
    //useState account
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    ///

    //Hàm xử lý đăng nhập
    // const doLogin = () => {
    //     //Validate form
    //     if (userName.length == 0) {
    //         alert("Hãy nhập tên đăng nhập"); return;
    //     }
    //     if (password.length == 0) {
    //         alert("Hãy nhập mật khẩu"); return;
    //     }

    //     // let url_check_login = "http://192.168.0.105:3000/account?userName=" + userName;
    //     let url_check_login = "http://10.24.13.45:3000/account?userName=" + userName;

    //     //Thực hiện fetch để kiểm lấy dữ liệu về và kiểm tra đăng nhập
    //     fetch(url_check_login, {
    //         method: 'GET',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         }
    //     })
    //         .then((res) => {
    //             return res.json();
    //         })
    //         .then(async (data_json) => {
    //             if (data_json.length != 1) { //Sai username
    //                 alert("Sai tên đăng nhập hoặc lỗi trùng lặp userName"); return;
    //             } else {
    //                 let objUser = data_json[0];
    //                 if (objUser.password != password) {
    //                     alert("Sai mật khẩu"); return;
    //                 } else {
    //                     //Đúng pass
    //                     try {
    //                         await AsyncStorage.setItem('loginInfor', JSON.stringify(objUser)) //Lưu thông tin Account vào Storage                            
    //                         //Phân quyền Admin
    //                         console.log("Type account: " + objUser.typeAccount);
    //                         if(objUser.typeAccount == 0){
    //                             navigation.navigate("Admin")
    //                         }else if(objUser.typeAccount == 1){
    //                             navigation.navigate("News")
    //                         }else{
    //                             console.log("Lỗi đăng nhập, không xác định được loại tài khoản");
    //                         }
    //                     } catch (ex) {
    //                         //Ném lỗi 
    //                         console.log("Lỗi khi lưu account vào Storage: " + ex)
    //                     }
    //                 }
    //             }
    //         })
    //         .catch((ex) => {
    //             alert("Lỗi đăng nhập: " + ex)
    //         })
    // }

    //Chuyển màn SignUp
    const handleScreenSignUp = () => {
        navigation.navigate('SignUp');
    }

    return (
        <View style={styles.container}>
            <Image
                source={require('./images/imgLogo.png')}
                style={styles.image} />
            <Text style={styles.textTitle}>Sign In</Text>
            <Text style={styles.textAccess}>Access to your account</Text>

            {/**Input */}
            <TextInput style={styles.input} placeholder='Your user name'
                onChangeText={(txt) => { setUserName(txt) }} />
            <TextInput style={styles.input} placeholder='Your password'
                onChangeText={(txt) => { setPassword(txt) }}
                secureTextEntry={true} />

            {/* <View style={styles.viewCheckBox}>
                <BouncyCheckbox
                    size={25}
                    fillColor="red"
                    unfillColor="#FFFFFF"
                    text="Remember password"
                    onPress={() => {
                        alert("Lưu mật khẩu");
                    }}
                />
            </View> */}

            {/*Btn sign in */}
            <View style={styles.viewButton}>
                <Button title='Sign In' color={'pink'}
                    // onPress={doLogin} 
                    />
            </View>
            <Text style={styles.textForgot}>Forgot password</Text>
            <Text style={styles.textOrSignIn}>--------------------------- or sign in with ---------------------------</Text>
            <View style={{ flexDirection: 'row' }}>
                <Image
                    source={require('./images/imgFb.png')}
                    style={styles.imageSignIn} />
                <Image
                    source={require('./images/imgTwit.png')}
                    style={styles.imageSignIn} />
                <Image
                    source={require('./images/imgEmail.png')}
                    style={styles.imageSignIn} />
            </View>

            {/**Handle SignUp Screen */}
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ marginTop: 2 }}>Don't have a account?</Text>
                <Text onPress={handleScreenSignUp} style={styles.textSignUp}>Sign Up</Text>
            </View>
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
    },
    image: {
        marginTop: 50,
        width: 100,
        height: 100
    },
    textTitle: {
        fontSize: 45,
        fontWeight: 'bold',
        color: '#000000'
    },
    textAccess: {
        color: '#FFC100',
        fontSize: 20
    },
    input: {
        height: 45,
        width: '80%',
        borderWidth: 2,
        borderColor: '#ccc',
        padding: 8,
        marginTop: 20,
        backgroundColor: 'white',
        borderRadius: 5
    },
    viewCheckBox: {
        flexDirection: 'row',
        marginTop: 20,
    },
    textCheckBox: {
        color: '#000000'
    },
    viewButton: {
        width: 200,
        marginTop: 20,
        width: '70%',
    },
    textForgot: {
        marginTop: 20,
        color: '#2454F8',
        fontSize: 15,
        fontStyle: 'normal'
    },
    textOrSignIn: {
        marginTop: 10,
        fontSize: 15,
        fontStyle: 'normal'
    },
    imageSignIn: {
        margin: 15,
        width: 50,
        height: 50
    },
    textSignUp: {
        marginLeft: 5,
        color: '#2454F8',
        fontSize: 16,
        fontStyle: 'normal',
    },
})

