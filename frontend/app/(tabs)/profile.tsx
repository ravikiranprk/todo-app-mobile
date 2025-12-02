import { View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { LogOut, User, Mail, Lock } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
    const { user, logout } = useAuth(); 

    return (
        <SafeAreaView className="flex-1 bg-white p-6">
            <Text className="text-3xl font-bold mb-8 text-center">
                Profile
            </Text>

            {/* PROFILE CARD */}
            <View className="bg-gray-100 p-6 rounded-xl mb-8">
                {/* Username */}
                <View className="flex-row items-center mb-4">
                    <User color="#4f46e5" size={22} />
                    <View className="ml-3">
                        <Text className="text-gray-500 text-sm">Username</Text>
                        <Text className="text-lg font-semibold">
                            {user?.username || "Unknown"}
                        </Text>
                    </View>
                </View>

                {/* Email */}
                <View className="flex-row items-center mb-4">
                    <Mail color="#4f46e5" size={22} />
                    <View className="ml-3">
                        <Text className="text-gray-500 text-sm">Email</Text>
                        <Text className="text-lg font-semibold">
                            {user?.email || "Not provided"}
                        </Text>
                    </View>
                </View>

                {/* Password (hidden for security) */}
                <View className="flex-row items-center mb-2">
                    <Lock color="#4f46e5" size={22} />
                    <View className="ml-3">
                        <Text className="text-gray-500 text-sm">Password</Text>
                        <Text className="text-lg font-semibold">••••••••</Text>
                    </View>
                </View>
            </View>

            {/* CHANGE PASSWORD BUTTON */}
            <TouchableOpacity className="bg-indigo-600 py-3 rounded-xl mb-4 w-full">
                <Text className="text-center text-white text-lg font-semibold">
                    Change Password
                </Text>
            </TouchableOpacity>

            {/* LOGOUT BUTTON */}
            <TouchableOpacity
                className="flex-row items-center justify-center bg-red-600 py-3 px-6 rounded-xl w-full"
                onPress={logout}
            >
                <LogOut color="white" size={20} />
                <Text className="text-white text-lg font-semibold ml-2">
                    Logout
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}