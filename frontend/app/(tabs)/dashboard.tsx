import { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { fetchTodos, deleteTodoApi, toggleCompleteApi } from "../../utils/api";
import { CheckCircle, Circle, Trash2, Pencil } from "lucide-react-native";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import Animated, { FadeInRight } from "react-native-reanimated";
import { router } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Dashboard() {
    const [todos, setTodos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTodos();
    }, []);

    async function loadTodos() {
        const data = await fetchTodos();
        setTodos(data || []);
        setLoading(false);
    }

    async function handleComplete(id: number) {
        await toggleCompleteApi(id);
        loadTodos();
    }

    async function handleDelete(id: number) {
        await deleteTodoApi(id);
        loadTodos();
    }

    const renderRightActions = (id: number) => (
        <View className="justify-center">
            <TouchableOpacity
                className="bg-red-600 px-6 py-4 rounded-xl"
                onPress={() => handleDelete(id)}
            >
                <Trash2 size={22} color="white" />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1 p-6 bg-white dark:bg-black">
                <GestureHandlerRootView className="flex-1">
                    <Text className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">My Todos</Text>

                    {loading ? (
                        <ActivityIndicator size="large" />
                    ) : (
                        <FlatList
                            data={todos}
                            keyExtractor={(item) => String(item.id)}
                            renderItem={({ item, index }) => (
                                <Animated.View entering={FadeInRight.delay(index * 60)}>
                                    <Swipeable
                                        overshootRight={false}
                                        renderRightActions={() => renderRightActions(item.id)}
                                    >
                                        <View
                                            className="mb-3 p-4 flex-row items-center bg-gray-100 dark:bg-gray-800 rounded-xl"
                                        >
                                            {/* Completion check */}
                                            <TouchableOpacity
                                                className="mr-4"
                                                onPress={() => handleComplete(item.id)}
                                            >
                                                {item.done ? (
                                                    <CheckCircle size={28} color="#4f46e5" />
                                                ) : (
                                                    <Circle size={28} color="#777" />
                                                )}
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                className="flex-1"
                                                onPress={() =>
                                                    router.push(`/edit-todo?id=${item.id}&title=${item.title}`)
                                                }
                                            >
                                                <Text
                                                    className={`text-xl font-semibold dark:text-white ${item.done ? "line-through text-gray-600" : "text-gray-900"
                                                        }`}
                                                >
                                                    {item.task}
                                                </Text>
                                            </TouchableOpacity>

                                            {/* Edit */}
                                            <TouchableOpacity
                                                onPress={() =>
                                                    router.push(`/edit-todo?id=${item.id}&title=${item.title}`)
                                                }
                                            >
                                                <Pencil size={20} color="#4f46e5" />
                                            </TouchableOpacity>
                                        </View>
                                    </Swipeable>
                                </Animated.View>
                            )}
                        />
                    )}
                </GestureHandlerRootView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
