import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

type UserType = {
    id: number;
    username: string;
    email: string;
};

type AuthContextType = {
    token: string | null;
    user: UserType | null;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
    token: null,
    user: null,
    login: async () => {},
    logout: async () => {},
    refreshUser: async () => {},
});

export const AuthProvider = ({ children }: any) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserType | null>(null);

    // Fetch user from API
    const refreshUser = async () => {
        if (!token) return;

        try {
            const res = await fetch("http://10.144.105.202:8000/api/users/6", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) throw new Error("Failed to fetch user");

            const userData = await res.json();
            setUser(userData);

            await AsyncStorage.setItem("user", JSON.stringify(userData));
        } catch (err) {
            console.log("User fetch failed:", err);
            logout();
        }
    };

    // Load token/user from storage on startup
    useEffect(() => {
        const loadSession = async () => {
            const savedToken = await AsyncStorage.getItem("token");
            if (savedToken) {
                setToken(savedToken);
                await refreshUser(); // Fetch user from backend
                router.replace("/(tabs)/dashboard");
            }
        };
        loadSession();
    }, []);

    // Login
    const login = async (token: string) => {
        await AsyncStorage.setItem("token", token);
        setToken(token);

        await refreshUser(); // Fetch updated user

        router.replace("/(tabs)/dashboard");
    };

    // Logout
    const logout = async () => {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");

        setToken(null);
        setUser(null);

        router.replace("/(auth)/login");
    };

    return (
        <AuthContext.Provider
            value={{ token, user, login, logout, refreshUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);