import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isKeyboardOpen, setKeyboardOpen] = useState(false);

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

  const handleLoginPress = () => {
    navigation.navigate("Posts");
    const user = {
      email: email,
      password: password,
    };
    console.log(user);
  };

  const handleRegisterPress = () => {
    navigation.navigate("Registration");
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
            <Text style={styles.title}>Увійти</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                keyboardType="email-address"
                placeholder="Адреса електронної пошти"
                onChangeText={(text) => setEmail(text)}
                value={email}
              />
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Пароль"
                  secureTextEntry={!showPassword}
                  onChangeText={(text) => setPassword(text)}
                  value={password}
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
              onPress={handleLoginPress}
            >
              <Text style={styles.brightText}>Увійти</Text>
            </TouchableOpacity>
            <View style={styles.registerWrapper}>
              <Text style={styles.registerText}>Немає акаунту? </Text>
              <TouchableOpacity
                style={styles.registerBtn}
                onPress={handleRegisterPress}
              >
                <Text style={styles.registerLink}>Зареєструватися</Text>
              </TouchableOpacity>
            </View>
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
    height: 489,
    width: "100%",
    borderRadius: 25,
    backgroundColor: "#FFF",
    bottom: 0,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  wrapperWithKeyboard: {
    height: 585,
    width: "100%",
    borderRadius: 25,
    backgroundColor: "#FFF",
    bottom: 0,
    paddingTop: 32,
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
  registerWrapper: {
    flexDirection: "row",
    alignSelf: "center",
  },
  registerText: {
    color: "#1B4371",
    fontSize: 16,
    fontFamily: "RobotoRegular",
  },
  registerLink: {
    textDecorationLine: "underline",
    color: "#1B4371",
    fontSize: 16,
    fontFamily: "RobotoRegular",
  },
});

export default LoginScreen;
