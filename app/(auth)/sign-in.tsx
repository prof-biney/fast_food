import { router } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

const SignIn = () => {
  return (
    <View className="flex gap-4 ">
      <Text>SignIn</Text>
      <Button title="Sign UP" onPress={() => router.push("/sign-up")} />
      <Button title="Go to Home" onPress={() => router.push("/")} />
    </View>
  );
};

export default SignIn;
