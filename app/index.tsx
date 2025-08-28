import * as React from 'react';
import {
    StyleSheet,
    Platform,
    View,
    SafeAreaView,
    StatusBar, 
    TouchableHighlight,
    Linking,
    Text
} from "react-native";
import {
    Camera,
    useCameraDevice,
    useCameraDevices,
    useCameraPermission,
} from "react-native-vision-camera";
import { Redirect, useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
// import { ObscuraButton } from "@/components/ObscuraButton";
import { FontAwesome } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
// import { ExposureControls } from "@/components/ExposureControls";

export default function HomeScreen() {
    const {hasPermission} = useCameraPermission();
    const microphonePermission = useCameraPermission();
    const redirectToPermissions = !hasPermission || microphonePermission === "not-determined";
    const devices = useCameraDevices("back");
    const router = useRouter();

    if (redirectToPermissions) return <Redirect href="/permissions" />; // Condicional para redirecionar o usuário às permissões
    if (devices) return (
        <ThemedText>Olá</ThemedText>
    )
}