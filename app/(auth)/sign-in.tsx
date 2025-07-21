import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { signIn } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    const { email, password } = form;

    if (!form.email || !form.password) {
      return Alert.alert("Error", "Please enter your email and password.");
    }

    setIsSubmitting(true);

    try {
      await signIn({ email, password });

      router.replace("/");
    } catch (error: any) {
      console.error("Sign In Error:", error);

      Alert.alert(
        "Error",
        error.message || "An error occurred while signing in."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5 ">
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

      <CustomButton title="Sign In" isLoading={isSubmitting} onPress={submit} />

      <View className="flex justify-center flex-row gap-2 ">
        <Text className="base-regular text-center text-gray-100">
          Don&rsquo;t have an account&#63;
        </Text>
        <Link href="/sign-up" className="base-bold text-primary">
          Sign Up
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
