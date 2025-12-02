import AsyncStorage from "@react-native-async-storage/async-storage";

export const BASE_URL = "http://10.144.105.202:8000";

async function authHeaders() {
    const token = await AsyncStorage.getItem("access_token");
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function loginApi(username: string, password: string) {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    return res.json();
}

export async function signupApi(username: string, email: string, password: string) {
    const res = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
    });
    return res.json();
}

export async function fetchTodos() {
    const res = await fetch(`${BASE_URL}/api/todos`, {
        headers: {
            "Content-Type": "application/json",
            ...(await authHeaders()),
        },
    });
    return res.json();
}

export async function createTodoApi(title: string) {
    const res = await fetch(`${BASE_URL}/api/todos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(await authHeaders()),
        },
        body: JSON.stringify({ title }),
    });
    return res.json();
}

export async function updateTodoApi(id: number, title: string, done: boolean) {
    const res = await fetch(`${BASE_URL}/api/todos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...(await authHeaders()),
        },
        body: JSON.stringify({ title, done }),
    });

    return res.json();
}

export async function deleteTodoApi(id: number) {
    const res = await fetch(`${BASE_URL}/api/todos/${id}`, {
        method: "DELETE",
        headers: {
            ...(await authHeaders()),
        },
    });
    return res.json();
}

export async function toggleCompleteApi(id: number) {
    const res = await fetch(`${BASE_URL}/api/todos/${id}/toggle`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...(await authHeaders()),
        },
    });
    return res.json();
}

export async function fetchSingleTodoApi(id: number) {
    const res = await fetch(`${BASE_URL}/api/todos/${id}`, {
        headers: {
            "Content-Type": "application/json",
            ...(await authHeaders()),
        },
    });
    return res.json();
}