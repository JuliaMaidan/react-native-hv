import {
  Image,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

const CommentsScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: "/" }} style={styles.post} />
      <View style={styles.inputWrapper}>
        <TextInput placeholder="Коментувати..." style={styles.input} />
        <TouchableOpacity style={styles.btn}>
          <AntDesign name="arrowup" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  post: {
    width: "100%",
    height: 240,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 8,
    marginBottom: 32,
  },
  inputWrapper: {
    marginTop: "auto",
    position: "relative",
  },
  input: {
    width: "100%",
    padding: 16,
    fontSize: 16,
    fontFamily: "RobotoRegular",
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    color: "#212121",
  },
  btn: {
    position: "absolute",
    right: 8,
    top: 8,
    padding: 9,
    backgroundColor: "#FF6C00",
    borderRadius: 50,
  },
});

export default CommentsScreen;
