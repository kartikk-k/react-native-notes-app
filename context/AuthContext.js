import { createContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import supabase from '../utils/SupabaseClient'
import { Alert } from "react-native";

// authentication context
const AuthContext = createContext()
export default AuthContext

// authentication provider
export const AuthProvider = ({ children }) => {
    let [isAuthenticated, setIsAuthenticated] = useState(false)
    let [userId, setUserId] = useState()
    let navigation = useNavigation()

    useEffect(() => {
        getUser()
    }, [isAuthenticated])

    // register user
    const register = async (email, password) => {
        try {
            const response = supabase.auth.signUp({
                email: email,
                password: password
            })
            if (response.error) {
                console.log(response.error)
                Alert.alert("Registration Failed", "Please try again")
            } else {
                console.log("account created succesfully")
            }
        } catch { }
    }

    // login user
    const login = async (email, password) => {
        try {
            const userValue = await AsyncStorage.getItem("accessToken")
            try {
                let { data, error } = await supabase.auth.signInWithPassword({
                    email: email,
                    password: password
                })
                console.log("data: ", data)
                if (error) {
                    console.log("error: ", error)
                    Alert.alert("Login Failed", error)
                    return
                }
                setUserId(data.user.id)
                setIsAuthenticated(true)
                navigation.navigate("Home")
                let accessValue = await AsyncStorage.setItem("accessToken", data.session.access_token)
            } catch (error) {
                console.log("error: ", error)
            }
        } catch (error) {
            console.log("error: ", error)
        }

    }

    const logout = async () => {
        await supabase.auth.signOut()
        setIsAuthenticated(false)
        await AsyncStorage.removeItem("accessToken")
    }

    const getUser = async () => {
        try {
            const accessTokenValue = await AsyncStorage.getItem("accessToken")
            console.log("accessTokenValue", accessTokenValue)
            try {
                const { data, error } = await supabase.auth.getUser(accessTokenValue)
                console.log("user: ", data)
                if (data) {
                    console.log("access tokens", data.user.aud)
                    if (data.user.aud === "authenticated") {
                        setIsAuthenticated(true)
                        setUserId(data.user.id)
                        navigation.navigate("Home")
                    }
                } if (error) {
                    console.log("access tokens error", error)
                    navigation.navigate("Login")
                }
            } catch (error) {
                console.log("error: ", error)
            }
        } catch (error) {
            console.log(error)
        }

    }

    let contextData = {
        userId: userId,
        login: login,
        logout: logout,
        register: register,
        isAuthenticated: isAuthenticated,
        getUser: getUser
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
