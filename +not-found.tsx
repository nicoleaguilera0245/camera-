/* 
Essencial para comunicação da biblioteca
Link => Navegação entre rotas
Stack => Definição de configurações da tela atual na navegação em pilha
*/
import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native'; // Criação de estilos nativos

// Componentes customizados para a aplicação de temas
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Componente principal da tela "not-found"
export default function NotFoundScreen() {
  return (
    <>
      {/*Configura o título da tela dentro da Stack*/}
      <Stack.Screen options={{ title: 'Oops!' }} />

      {/*Usa ThemedView como container da tela*/}
      <ThemedView style={styles.container}>

        {/*Mensagem de Erro*/}
        {/*Dica => A mensagem de erro deve ser clara para o usuário*/}
        <ThemedText type="title">Essa tela não existe.</ThemedText>
        <Link href="/" style={styles.link}> {/*Link que retorna o usuário para a Home (rota "/")*/}
          <ThemedText type="link">Volte para a Tela Inicial.</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

// Estilização
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa a tela inteira
    alignItems: 'center', // Centraliza elementos no eixo horizontal
    justifyContent: 'center', // Centraliza elementos no eixo vertical
    padding: 20 // Espaçamento interno
  },
  link: {
    marginTop: 15, // Espaço acima do link
    paddingVertical: 15 // Espaçamento interno vertical (top e bottom)
  }
});