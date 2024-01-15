import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native'
import React, { useState } from 'react'

const SignUp = (props) => {
    const [name, setName] = useState("");
    const [email, setEmai] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [lastId, setLastId] = useState(0);

    // const getLastId = async () =>{
    //     // let url_api_list_account = 'http://192.168.0.105:3000/account';
    //     let url_api_list_account = 'http://10.24.13.45:3000/account';

    //     fetch(url_api_list_account, {
    //         method: 'GET',
    //         headers: {
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json',
    //             }
    //         }
    //     })
    //     .then((res) =>{
    //         return res.json();
    //     })
    //     .then( async(data_json) =>{
    //         if(data_json.length > 0){
    //             const lastAccount = data_json[data_json.length -1];
    //             console.log("Last account id: " + lastAccount.id);
    //             setLastId(lastAccount.id);
    //         }
    //     })
    //     .catch((ex) =>{
    //         console.log("Lỗi xảy ra khi lấy danh sách account: " + ex)
    //     })
    // }

    // React.useEffect(() =>{
    //     const unsubscribe = props.navigation.addListener('focus', () =>{
    //         getLastId();
    //     })
    //     return unsubscribe;
    // },[props.navigation]);

    // const registAccount = async () => {
    //     await getLastId();
    //     // let url_api_regist = 'http://192.168.0.105:3000/account';
    //     let url_api_regist = 'http://10.24.13.45:3000/account';
    //     let objUser = {
    //         id: lastId + 1,
    //         name: name,
    //         email: email,
    //         userName: userName,
    //         password: password,
    //         typeAccount: 1,
    //         isLogin: 0,
    //         isFollow: 0
    //     }
    //     //Validate form
    //     if(userName.length == 0){alert("Hãy nhập tài khoản"); return}
    //     if(password.length == 0){alert("Hãy nhập mật khẩu");return}
    //     if(confirmPass.length == 0){alert("Hãy nhập lại mật khẩu"); return}
    //     if(confirmPass!=password){alert("Nhập lại mật khẩu không chính xác"); return}

    //     fetch(url_api_regist, {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(objUser)
    //     })
    //         .then((res) => {
    //             if (res.status == 201) {
    //                 alert("Đăng ký thành công")
    //                 props.navigation.navigate('Login')
    //             }
    //         })
    //         .catch((ex) => {
    //             console.log("Đăng ký thất bại, lỗi: " + ex)
    //         })
    // }
    return (
        <View style={styles.container}>
            {/**Logo */}
            <Image
                source={require('./images/imgLogo.png')}
                style={styles.image} />
            <Text style={styles.textTitle}>Sign Up</Text>
            <Text style={styles.textAccess}>Register New Account</Text>

            {/**Input regist account */}
            <TextInput style={styles.input} placeholder='Your full name?'
                onChangeText={(txt) => { setName(txt) }} />
                <TextInput style={styles.input} placeholder='Your Email'
                onChangeText={(txt) => { setEmai(txt) }} />
            <TextInput style={styles.input} placeholder='Your user name'
                onChangeText={(txt) => { setUserName(txt) }} />
            <TextInput style={styles.input} placeholder='Your password'
                onChangeText={(txt) => { setPassword(txt) }} secureTextEntry={true}/>
            <TextInput style={styles.input} placeholder='Confirm password'
                onChangeText={(txt) => { setConfirmPass(txt) }} secureTextEntry={true}/>

            {/**Check box agree...*/}
            {/* <View style={styles.viewCheckBox}>
                <BouncyCheckbox />
                <Text>I agree with Teams Of Service {'\n'} and Policy Privacy.</Text>
            </View> */}

            {/**Button Registing */}
            <View style={styles.viewButton}>
                <Button title='Sign Up' color={'pink'} 
                onPress={() =>{
                    registAccount();
                }}/>
            </View>

            {/**Other */}
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <Text style={{ marginTop: 2 }}>You have a problem?</Text>
                <Text style={styles.textSignUp}>Help</Text>
            </View>
        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
    },
    image: {
        marginTop: 20,
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
    textSignUp: {
        marginLeft: 5,
        color: '#2454F8',
        fontSize: 16,
        fontStyle: 'normal',
    },
})