import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  Image,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";

const RegistrationScreen = ({ navigation }) => {
  const [avatar, setAvatar] = useState(null);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isKeyboardOpen, setKeyboardOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardOpen(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleUploadAvatar = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Доступ до галереї обов'язковий!");
      return;
    }

    if (avatar) {
      setAvatar(null);
    } else {
      const pickerResult = await ImagePicker.launchImageLibraryAsync();
      if (!pickerResult.canceled) {
        const selectedAsset = pickerResult.assets[0];
        setAvatar(selectedAsset.uri);
      }
    }
  };

  const handleLoginPress = () => {
    navigation.navigate("Login");
  };

  const handleRegisterPress = () => {
    navigation.navigate("Auth", {
      screen: "Posts",
      params: { login: login, email: email, avatar: avatar },
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../src/images/registration.jpg")}
          style={{
            flex: 1,
            resizeMode: "cover",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={isKeyboardOpen ? styles.wrapperWithKeyboard : styles.wrapper}
          >
            <View style={styles.avatarContainer}>
              {avatar ? (
                <Image source={{ uri: avatar }} style={styles.avatar} />
              ) : (
                <View style={styles.placeholder} />
              )}
              <TouchableOpacity
                style={
                  avatar ? [styles.button, styles.buttonClose] : styles.button
                }
                onPress={handleUploadAvatar}
              >
                {avatar ? (
                  <Icon name="close" size={18} color="#BDBDBD" />
                ) : (
                  <Icon name="plus" size={18} color="#FF6C00" />
                )}
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>Реєстрація</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Логін"
                onChangeText={(text) => setLogin(text)}
                value={login}
              />
              <TextInput
                style={styles.input}
                keyboardType="email-address"
                placeholder="Адреса електронної пошти"
                onChangeText={(email) => setEmail(email)}
                value={email}
              />
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Пароль"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity
                  style={styles.showPassword}
                  onPress={togglePasswordVisibility}
                >
                  {!showPassword ? (
                    <Text style={styles.showPasswordText}>Показати</Text>
                  ) : (
                    <Text style={styles.showPasswordText}>Сховати</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={styles.btnBright}
              onPress={handleRegisterPress}
            >
              <Text style={styles.brightText}>Зареєстуватися</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={handleLoginPress}>
              <Text style={styles.text}>Вже є акаунт? Увійти</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    height: 549,
    width: "100%",
    borderRadius: 25,
    backgroundColor: "#FFF",
    bottom: 0,
    paddingTop: 92,
    paddingHorizontal: 16,
  },
  wrapperWithKeyboard: {
    height: 715,
    width: "100%",
    borderRadius: 25,
    backgroundColor: "#FFF",
    bottom: 0,
    paddingTop: 92,
    paddingHorizontal: 16,
  },
  title: {
    color: "#212121",
    textAlign: "center",
    fontSize: 30,
    fontWeight: 500,
    letterSpacing: 0.3,
    marginBottom: 33,
    fontFamily: "RobotoMedium",
  },
  inputWrapper: {
    gap: 16,
    marginBottom: 43,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#F6F6F6",
    color: "#212121",
    paddingHorizontal: 16,
    fontSize: 16,
    borderRadius: 10,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    fontFamily: "RobotoRegular",
  },
  btnBright: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    marginBottom: 16,
  },
  brightText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "RobotoRegular",
  },
  text: {
    color: "#1B4371",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "RobotoRegular",
  },
  avatarContainer: {
    position: "absolute",
    top: -60,
    alignSelf: "center",
  },
  placeholder: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  button: {
    position: "absolute",
    bottom: 12,
    right: -12,
    height: 24,
    width: 24,
    backgroundColor: "transparent",
    borderColor: "#FF6C00",
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  buttonClose: {
    borderColor: "#BDBDBD",
    backgroundColor: "#FFFFFF",
  },
  buttonText: {
    color: "white",
  },
  showPassword: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  showPasswordText: {
    color: "#1B4371",
    textAlign: "right",
    fontSize: 16,
    fontFamily: "RobotoRegular",
  },
  inputFocused: {
    borderColor: "red",
  },
});

export default RegistrationScreen;
