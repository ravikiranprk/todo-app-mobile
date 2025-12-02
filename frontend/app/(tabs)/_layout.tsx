import { Tabs } from "expo-router";
import { Home, PlusCircle, User } from "lucide-react-native";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#4f46e5",
                tabBarStyle: { height: 60, paddingBottom: 8 },
            }}
        >
            <Tabs.Screen
                name="dashboard"
                options={{
                    title: "Tasks",
                    tabBarIcon: ({ color }) => <Home size={22} color={color} />,
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color }) => <User size={22} color={color} />,
                }}
            />
        </Tabs>
    );
}