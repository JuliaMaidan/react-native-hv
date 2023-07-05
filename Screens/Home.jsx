import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import * as ImagePicker from "expo-image-picker";

const Home = ({ route }) => {
  const [avatar, setAvatar] = useState(null);

  // const { posts } = route.params || { posts: [] };

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
  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <ImageBackground
          source={require("../src/images/registration.jpg")}
          style={{
            flex: 1,
            resizeMode: "cover",
            justifyContent: "flex-end",
          }}
        >
          <View style={styles.wrapper}>
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
            <Text style={styles.title}>Natali Romanova</Text>
            {/* <View style={styles.postWrapper}>
              {posts.map((post, index) => (
                <View key={index}>
                  <Image source={{ uri: post.post }} style={styles.postImg} />
                  <Text style={styles.postName}>{post.name}</Text>
                  <View style={styles.postInfo}>
                    <View style={styles.commentsWrapper}>
                      <EvilIcons name="comment" size={28} color="#BDBDBD" />
                      <Text style={styles.comments}>4</Text>
                    </View>
                    <View style={styles.commentsWrapper}>
                      <SimpleLineIcons
                        style={styles.icon}
                        name="location-pin"
                        size={22}
                        color="#BDBDBD"
                      />
                      <Text style={styles.postPin}>{post.location}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View> */}
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
    height: "100%",
    top: 147,
    // width: "100%",
    // borderRadius: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFF",
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
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",

    position: "absolute",
    left: 140,
    top: -60,
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
  postWrapper: {
    flexDirection: "column",
    gap: 34,
    width: "100%",
    marginTop: 32,
  },
  postImg: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  postName: {
    color: "#212121",
    fontSize: 16,
    fontFamily: "RobotoMedium",
    marginBottom: 8,
  },
  postInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commentsWrapper: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  comments: {
    color: "#BDBDBD",
    fontSize: 16,
    fontFamily: "RobotoRegular",
  },
  location: {
    fontSize: 16,
    fontFamily: "RobotoRegular",
    color: "#212121",
    textDecorationLine: "underline",
  },
});

export default Home;
