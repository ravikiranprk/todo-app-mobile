// app/index.tsx
import { View, Text, ActivityIndicator } from "react-native";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { router } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { token } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (token) {
        router.replace("/(tabs)/dashboard");
      } else {
        router.replace("/(auth)/login");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [token]);

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-3xl font-bold text-gray-900 mb-4">Todo App</Text>
        <ActivityIndicator size="large" />
        <Text className="text-gray-600 mt-3">Loading...</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}