/* 
expo-router
Link => cria links de navegação
Stack => manipula opções da tela (não utilizado diretamente)
useLocalSearchParams => pega parâmetros passados pela rota (ex.: ?media...&type...)
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
import ObscuraButton from "@/components/ObscuraButton";

// Função da Expo Media Library para salvar arquivos (fotos/vídeos) na galeria do dispositivo
import { saveToLibraryAsync } from "expo-media-library";

// Tela principal da rota "media"
export default function MediaScreen() {
    /* 
    Pega os parâmetros da URL/rota (ex.: media e type)
    Media => Caminho do arquivo
    Type => tipo de mídia (foto ou vídeo)
    */
    const { media, type } = useLocalSearchParams();

    // Hook de navegação programática
    const router = useRouter();

    // Parâmetros no console (bom para debug)
    console.log(media, type);

    return (
        <ThemedView style={styles.container}>
            {
                // Se o tipo for foto, a imagem será renderizada
                type === "photo" ? (
                    <Image
                        source={{uri: `file://${media}`}} // Caminho da imagem
                        style={{width: "100%", height: "80%", resizeMode: "contain"}}
                    />
                ) : null
                // Aqui poderia entrar um <video> para exibir vídeos no futuro
                // <Video source={{url: media}} style={{width: "100%", height: "100%"}}
            }

            {/*Botão customizado no componente para salvar a mídia na galeria*/}
            <ObscuraButton
                title="Salvar na galeria"
                containerStyle={{ alignSelf: "center" }}
                onPress={async () => {
                    // Salva a mídia no dispositivo
                    saveToLibraryAsync(media as string);

                    // Alerta para o usuário
                    Alert.alert("Salvo na galeria!");

                    // Volta para a tela anterior
                    router.back();
                }}
            />

            {/*Link que apaga a mídia (lógica de exclusão ainda não implementada) e volta para a home*/}
            <Link href="/" style={styles.link}>
                <ThemedText type="link">Deletar e voltar à tela inicial</ThemedText>
            </Link>
        </ThemedView>
    )
}

// Estilização
const styles = StyleSheet.create({
    container: {
        flex: 1, // Ocupa a tela inteira
        padding: 20, // Espaçamento interno
    },
    link: {
        marginTop: 15, // Espaço acima do link
        paddingVertical: 15, // Espaço interno em cima e embaixo
        alignSelf: "center" // Centraliza o link horizontalmente
    }
})