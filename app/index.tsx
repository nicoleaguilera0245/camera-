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
import { FontAwesome5 } from "@expo/vector-icons";
// import ZoomControls from '@/components/ZoomControls';
import { BlurView } from "expo-blur";
// import { ExposureControls } from "@/components/ExposureControls";

// Componente principal da tela inicial
export default function HomeScreen() {
    // Hook que verifica se a permissão da câmera foi concedida
    const { hasPermission } = useCameraPermission();

    // Obtém o status de permissão do microfone
    const microphonePermission = Camera.getMicrophonePermissionStatus();

    // Estados para controlar a visibilidade dos controles de zoom e exposição
    /*
    const [showZoomControls, setShowZoomControls] = React.useState(false);
    const [showExposureControls, setShowExposureControls] = React.useState(false);
    */

    // Referência para o componente Camera, permitindo interações como tirar fotos
    const camera = React.useRef<Camera>(null);

    // Hook que obtém a lista de câmeras disponíveis no dispositivo
    const devices = useCameraDevices();

    // Estado para armazenar o nível de zoom, inicializando com o zoom neutro do dispositivo
    // const [zoom, setZoom] = React.useState(device?.neutralZoom);

    // Estado para armazenar o nível de exposição
    const [exposure, setExposure] = React.useState(0);

    // Estado para controlar o flash ('on' ou 'off')
    const [flash, setFlash] = React.useState<"off" | "on">("off");

    // Estado para controlar a lanterna ('on' ou 'off')
    const [torch, setTorch] = React.useState<"off" | "on">("off");
    
    // Redireciona para a tela de permissões se a permissão da câmera ou do microfone não estiver garantida
    const redirectToPermissions =
        !hasPermission || microphonePermission === "not-determined";

    const router = useRouter();

    if (redirectToPermissions) return <Redirect href="/permissions" />; // Condicional para redirecionar o usuário às permissões
    if (devices) return (
        <ThemedText>Olá</ThemedText>
    )
}