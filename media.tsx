/* 
expo-router
Link => cria links de navegação
Stack => manipula opções da tela (não utilizado diretamente)
useLocalSearchParams => pega parâmetros passados pela rota (exemplo => ?media...&type...)
useRouter => permite navegação programática (voltar, avançar...)
*/
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";

/*
react-native
Alert => exibe uma caixa de diálogo (pop-up)
Image => renderizar imagens
StyleSheet => criar e renderizar estilos
*/
import { Alert, Image, StyleSheet } from "react-native";

// Componentes do suporte de temas
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

// Botão customizado
// import ObscuraButton from "@/components/ObscuraButton";

// Função da Expo Media Library para salvar arquivos (fotos/vídeos) na galeria do dispositivo
import { saveToLibraryAsync } from "expo-media-library";