import {
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import Animated, {BounceIn} from "react-native-reanimated";

// Definição dos limites de zoom
const MIN_ZOOM = 1;
const MAX_ZOOM = 128;
const NEUTRAL_ZOOM = 1;

// Opções fixas de zoom que serão exibidas na tela
const zoomOptions = [1, 2, 3, 4, 5];

export default function zoomControls({
    setZoom, // Função para atualizar o nível de zoom no componente pai
    setShowZoomControls, // Função para mostrar/ocultar os controles de zoom
    zoom // Valor atual do zoom (controlado externamente)
}: {
    setZoom: (zoom: number) => void;
    setShowZoomControls: (show: boolean) => void;
    zoom: number;
}) {
    // Hook que retorna as dimensões da tela (largura e altura)
    const { width, height } = useWindowDimensions();

    // Define o raio de um círculo invisível no qual os botoões de zoom serão posicionados
    const radius = Math.min(width, height - 100) * 0.35;

    // Funções para lidar com clique nos botões de zoom
    const handleZoomPress = (zoomFactor: number) => {
        if (zoomFactor === -1) {
            // Caso especial: reseta para o zoom neutro
            setZoom(NEUTRAL_ZOOM);
        } else {
            // Garante que o novo zoom esteja dentro dos limites
            const newZoom = Math.min(Math.max(zoomFactor, MIN_ZOOM), MAX_ZOOM);
            setZoom(newZoom);
        }
    };

    return (
        <View style={{flex: 1, padding: 10}}>
            {/*Renderiza os botões de zoom dinamicamente*/}
            {zoomOptions.map((z, i) => {
                // Calcula a posição angular de cada botão em volta de um círculo
                const angle = (i / zoomOptions.length / 3) * 2 * Math.PI - Math.PI / 2;
                const x = Math.cos(angle) * radius + 40; // Posição x
                const y = Math.sin(angle) * radius + height / 4; // Posição y

                return (
                    <Animated.View
                        key = {i}
                        // Animação de entrada com atraso recente
                        style={{
                            position: "absolute",
                            left: x,
                            top: y
                        }}
                    >
                        {/*Botão circular para selecionar o zoom*/}
                        <TouchableHighlight
                            onPress={() => handleZoomPress(z)}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                                backgroundColor: zoom === z ? "#ffffff" : "#ffffff30", // Destaque se for o zoom ativo
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Text
                                style={{
                                    color: zoom === z ? "black" : "white",
                                    fontWeight: "600"
                                }}
                            >
                                {z}x
                            </Text>
                        </TouchableHighlight>
                    </Animated.View>
                );
            })}

            {/*Botão para fechar os controles de zoom*/}
            <TouchableOpacity
                onPress={() => setShowZoomControls(false)}
                style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: "#ffffff30",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    left: 30,
                    top: height / 4
                }}
            >
                <Text style={{ color: "white", fontWeight: "600" }}>x</Text>
            </TouchableOpacity>
        </View>
    );
}