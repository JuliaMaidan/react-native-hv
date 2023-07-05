import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

const PostsScreen = ({ route, navigation }) => {
  const { login, email, avatar } = route.params || {};
  const { posts } = route.params || { posts: [] };

  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <View style={styles.wrapper}>
          <Text style={styles.login}>{login}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
      <View style={styles.postWrapper}>
        {posts &&
          posts.map((post, index) => (
            <View key={index}>
              <Image source={{ uri: post.image }} style={styles.postImg} />
              <Text style={styles.postName}>{post.name}</Text>
              <View style={styles.postInfo}>
                <View style={styles.commentsWrapper}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Comments")}
                  >
                    <EvilIcons name="comment" size={28} color="#BDBDBD" />
                  </TouchableOpacity>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 32,
    paddingHorizontal: 16,
    height: "100%",
  },
  avatarWrapper: {
    flexDirection: "row",
    gap: 8,
    height: 60,
  },
  wrapper: {
    paddingTop: 14,
  },
  avatar: {
    width: 60,
    height: 60,
    backgroundColor: "#F6F6F6",
    borderRadius: 15,
  },
  login: {
    color: "#212121",
    fontSize: 13,
    fontFamily: "RobotoBold",
    fontWeight: 700,
  },
  email: {
    color: "rgba(33, 33, 33, 0.80)",
    fontSize: 11,
    fontFamily: "RobotoRegular",
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

export default PostsScreen;
