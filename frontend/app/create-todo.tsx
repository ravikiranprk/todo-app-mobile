import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { createTodoApi } from "../utils/api";
import { router } from "expo-router";

export default function CreateTodo() {
    const [title, setTitle] = useState("");

    async function handleCreate() {
        if (!title.trim()) return;
        await createTodoApi(title);
        router.replace("/(tabs)/dashboard");
    }

    return (
        <View className="flex-1 p-6 bg-white">
            <Text className="text-3xl font-bold mb-6">Create Todo</Text>

            <TextInput
                className="bg-gray-100 px-4 py-3 rounded-xl mb-4"
                placeholder="Todo title"
                value={title}
                onChangeText={setTitle}
            />

            <TouchableOpacity
                className="bg-indigo-600 py-3 rounded-xl"
                onPress={handleCreate}
            >
                <Text className="text-center text-white text-lg font-semibold">
                    Add Todo
                </Text>
            </TouchableOpacity>
        </View>
    );
}