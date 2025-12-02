import { useLocalSearchParams, router } from "expo-router";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    Switch,
} from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchSingleTodoApi, updateTodoApi } from "../utils/api";

export default function EditTodo() {
    const params = useLocalSearchParams();
    const id = Number(params.id);

    const [title, setTitle] = useState("");
    const [completed, setCompleted] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadTodo() {
            try {
                const data = await fetchSingleTodoApi(id);
                setTitle(data.task);
                setCompleted(data.done);
            } catch (err) {
                Alert.alert("Error", "Could not load todo");
            } finally {
                setLoading(false);
            }
        }
        loadTodo();
    }, []);

    async function handleUpdate() {
        if (!title.trim()) return Alert.alert("Error", "Title cannot be empty");

        const res = await updateTodoApi(id, title, completed);

        if (res.id) {
            Alert.alert("Success", "Todo updated");
            router.replace("/(tabs)/dashboard");
        } else {
            Alert.alert("Error", "Failed to update todo");
        }
    }

    if (loading) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center bg-white">
                <Text className="text-lg font-semibold">Loading...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 p-6 bg-white">
            <Text className="text-3xl font-bold mb-6">Edit Todo</Text>

            <TextInput
                className="bg-gray-100 px-4 py-3 rounded-xl mb-6"
                placeholder="Todo title"
                value={title}
                onChangeText={setTitle}
            />

            {/* Completed Switch */}
            <View className="flex-row items-center justify-between mb-6">
                <Text className="text-lg font-medium">Completed</Text>
                <Switch value={completed} onValueChange={setCompleted} />
            </View>

            <TouchableOpacity
                className="bg-indigo-600 py-3 rounded-xl"
                onPress={handleUpdate}
            >
                <Text className="text-center text-white text-lg font-semibold">
                    Update Todo
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}