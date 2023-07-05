import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/Entypo";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

const CreatePostScreen = ({ navigation, route }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const handleUploadPost = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Доступ до галереї обов'язковий!");
      return;
    }
    if (image) {
      setImage(null);
    } else {
      const pickerResult = await ImagePicker.launchImageLibraryAsync();
      if (!pickerResult.canceled) {
        const selectedAsset = pickerResult.assets[0];
        setImage(selectedAsset.uri);
      }
    }
  };

  const handlePublishPress = () => {
    const newPost = {
      image: image,
      name: name,
      location: location,
    };

    const currentPosts =
      navigation.getState().routes.find((route) => route.name === "Posts")
        ?.params?.posts || [];

    const updatedPosts = [...currentPosts, newPost];

    navigation.navigate("Auth", {
      screen: "Posts",
      params: { posts: updatedPosts },
    });
    navigation.setParams({ posts: updatedPosts });
    setName(null);
    setImage("");
    setLocation("");
  };

  const onDeletePress = () => {
    setName(null);
    setImage("");
    setLocation("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.postContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.post} />
        ) : (
          <View style={styles.placeholder} />
        )}
        <TouchableOpacity
          style={image ? [styles.button, styles.buttonOnPost] : styles.button}
          onPress={handleUploadPost}
        >
          <Icon name="camera" size={24} color={image ? "#fff" : "#BDBDBD"} />
        </TouchableOpacity>
      </View>
      {!image ? (
        <Text style={styles.text}>Завантажте фото</Text>
      ) : (
        <Text style={styles.text}>Редагувати фото</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Назва..."
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <View style={styles.location}>
        <TextInput
          style={[styles.input, styles.inputLocation]}
          placeholder="Місцевість..."
          value={location}
          onChangeText={(text) => setLocation(text)}
        />
        <SimpleLineIcons
          style={styles.icon}
          name="location-pin"
          size={22}
          color="#BDBDBD"
        />
      </View>
      <TouchableOpacity
        style={
          image && name && location
            ? [styles.postBtn, styles.postBtnBright]
            : styles.postBtn
        }
        onPress={handlePublishPress}
      >
        <Text
          style={
            image && name && location
              ? [styles.btnText, styles.btnTextBright]
              : styles.btnText
          }
        >
          Опублікувати
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.delete} onPress={onDeletePress}>
        <Ionicons name="ios-trash-outline" size={24} color="#BDBDBD" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingVertical: 32,
    paddingHorizontal: 16,
    height: "100%",
  },
  postContainer: {
    position: "relative",
  },
  placeholder: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    width: "100%",
    height: 240,
    marginBottom: 8,
  },
  post: {
    borderRadius: 8,
    width: "100%",
    height: 240,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 50,
    width: 60,
    height: 60,
    position: "absolute",
    top: 90,
    left: 150,
    padding: 18,
  },
  buttonOnPost: {
    backgroundColor: "rgba(255, 255, 255, 0.30)",
  },
  text: {
    color: "#BDBDBD",
    fontSize: 16,
    fontFamily: "RobotoRegular",
    marginBottom: 32,
  },
  input: {
    paddingTop: 16,
    paddingBottom: 15,
    fontSize: 16,
    fontFamily: "RobotoRegular",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    marginBottom: 16,
  },
  inputLocation: {
    paddingLeft: 26,
    marginBottom: 32,
  },
  location: {
    position: "relative",
  },
  icon: {
    position: "absolute",
    top: 14,
  },
  postBtn: {
    width: "100%",
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
    paddingVertical: 16,
    alignItems: "center",
  },
  postBtnBright: {
    backgroundColor: "#FF6C00",
  },
  btnText: {
    color: "#BDBDBD",
    fontSize: 16,
    fontFamily: "RobotoRegular",
  },
  btnTextBright: {
    color: "#fff",
  },
  delete: {
    alignSelf: "center",
    marginTop: "auto",
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
    paddingHorizontal: 23,
    paddingVertical: 8,
  },
});

export default CreatePostScreen;
