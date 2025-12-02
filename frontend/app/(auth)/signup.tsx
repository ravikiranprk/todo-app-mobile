import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { signupApi } from "../../utils/api";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSignup() {
        const res = await signupApi(username, email, password);
        console.log(res);
    }

    return (
        <View className="flex-1 justify-center px-6 bg-white">
            <Text className="text-3xl font-bold text-center mb-8">Create Account</Text>

            <TextInput
                className="mb-3 bg-gray-100 px-4 py-3 rounded-xl"
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />

            <TextInput
                className="mb-3 bg-gray-100 px-4 py-3 rounded-xl"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                className="mb-6 bg-gray-100 px-4 py-3 rounded-xl"
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity
                className="bg-green-600 py-3 rounded-xl"
                onPress={handleSignup}
            >
                <Text className="text-center text-white font-semibold text-lg">
                    Sign Up
                </Text>
            </TouchableOpacity>

            <Text className="text-center mt-4">
                Already have an account?{" "}
                <Link href="/login" className="text-indigo-600 font-bold">
                    Login
                </Link>
            </Text>
        </View>
    );
}