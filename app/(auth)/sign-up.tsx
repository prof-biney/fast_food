import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (!form.name || !form.email || !form.password) {
      return Alert.alert("Error", "Please enter your email and password.");
    }

    setIsSubmitting(true);

    try {
      // Call Appwrite Sign Up Function here

      Alert.alert("Success", "You have signed up successfully!");

      router.replace("/");
    } catch (error: any) {
      console.error("Sign Up Error:", error);

      Alert.alert(
        "Error",
        error.message || "An error occurred while signing up."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-9 bg-white rounded-lg p-5 mt-5 ">
      <CustomInput
        placeholder="Enter your full name"
        value={form.name}
        label="Full Name"
        onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
      />

      <CustomInput
        placeholder="Enter your email"
        value={form.email}
        label="Email"
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        keyboardType="email-address"
      />

      <CustomInput
        placeholder="Enter your password"
        value={form.password}
        label="Password"
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, password: text }))
        }
        secureTextEntry={true}
      />

      <CustomButton title="Sign Up" isLoading={isSubmitting} onPress={submit} />

      <View className="flex  justify-center flex-row gap-2 ">
        <Text className="base-regular text-center text-gray-100">
          Already have an account?
        </Text>
        <Link href="/sign-in" className="base-bold text-primary">
          Sign In
        </Link>
      </View>
    </View>
  );
};

export default SignUp;
