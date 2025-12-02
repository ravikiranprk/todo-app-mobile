import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { loginApi } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {
        const res = await loginApi(username, password);
        if (res?.access_token) login(res.access_token);
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1 justify-center items-center px-6 bg-white">
                <View className="bg-zinc-100 p-10 rounded-xl shadow-md shadow-zinc-500">
                    <Text className="text-3xl font-bold text-center mb-8">Login</Text>

                    <TextInput
                        className="mb-3 bg-gray-100 px-4 py-3 rounded-xl border border-gray-700"
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                    />

                    <TextInput
                        className="mb-6 bg-gray-100 px-4 py-3 rounded-xl border border-gray-700"
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TouchableOpacity
                        className="bg-indigo-600 py-3 rounded-xl"
                        onPress={handleLogin}
                    >
                        <Text className="text-center text-white font-semibold text-lg">
                            Login
                        </Text>
                    </TouchableOpacity>

                    <Text className="text-center mt-4">
                        Don't have an account?{" "}
                        <Link href="/signup" className="text-indigo-600 font-bold">
                            Sign Up
                        </Link>
                    </Text>
                </View>
            </SafeAreaView>

        </SafeAreaProvider>
    );
}
