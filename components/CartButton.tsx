import { images } from "@/constants";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const CartButton = () => {
  const totalItems = 5; // This should be replaced with actual cart item count logic

  return (
    <View>
      <TouchableOpacity
        className="cart-btn"
        onPress={() => {
          console.log("Cart button pressed");
        }}
      >
        <Image source={images.bag} className="size-5" resizeMode="contain" />

        {totalItems > 0 && (
          <View className="cart-badge">
            <Text className="small-bold text-white">{totalItems}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CartButton;
