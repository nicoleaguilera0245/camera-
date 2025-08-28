import { ComponentProps } from "react"; // Importa tipos para definir propriedades de componentes em React
import { Ionicons } from "@expo/vector-icons"; // Importa a biblioteca de ícones Ionicons (pacote do expo)
import {
    StyleProp,
    StyleSheet,
    Text,
    Touchable,
    TouchableOpacity,
    ViewStyle
} from 'react-native'; // Importa elementos e tipos do React Native
import { Colors } from '@/constants/Colors'; // Importa um objeto de cores customizado do projeto
import { text } from "stream/consumers";

// Interface para tipar as props do botão
interface ObscuraButtonProps {
    onPress: () => void; // Função chamada quando o botão é pressionado
    title?: string; // Texto opcional que pode aparecer no botão
    iconName?: ComponentProps<typeof Ionicons>["name"];
    // Nome do ícone da biblioteca Ionicons (ex.: "home", "camera")
    containerStyle?: StyleProp<ViewStyle>;
    // Estilo adicional que pode ser passado para customizar o container
    iconSize?: number;
}

// Componente funcional que representa o botão
export default function ObscuraButton ({
    onPress,
    iconName,
    title,
    containerStyle,
    iconSize
}: ObscuraButtonProps) {
    return (
        <TouchableOpacity
            onPress={onPress} // Chama a função passada ao clicar
            style={[
                styles.container, // Estilização básica
                {
                    backgroundColor: Colors.dark.background, // Cor vinda do tema
                    borderRadius: title ? 6 : 40, // Bordas arredondadas (se tiver texto, menor radius; se for só ícone, círculo)
                    alignSelf: "flex-start" // Botão é ajustado ao conteúdo
                },
                containerStyle, // Permite sobreescrever estilos ao usar o componente
            ]}
        >
            {/*Renderiza o ícone apenas se a prop iconName for passada*/}
            {iconName && (
                <Ionicons name={iconName} size={iconSize ?? 28} color={"white"} />
            )}

            {/*Renderiza o título caso ele exista*/}
            {title ? (
                <Text
                    style={{
                        fontSize: 14,
                        fontWeight: "600",
                        color: "white"
                    }}
                >
                    {title}
                </Text>
            ) : null}
        </TouchableOpacity>
    )
}

// Estilização do container
const styles = StyleSheet.create({
    container: {
        padding: 7, // Espaçamento interno
        borderRadius: 40, // Borda arredondada (default, mas por ser alterada dinamicamente)
        flexDirection: "row", // Alinhamento do ícone com o texto lado a lado
        alignItems: "center", // Centralização vertical do ícone e texto
        gap: 7 // Espaçamento entre ícone e texto
    }
})