import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'; // Temas claro/escuro e ThemeProvider para os componentes
import { useFonts } from 'expo-font'; // Fontes personalizadas
import { Stack } from 'expo-router'; // Navegação em pilha (stack navigation)
import * as SplashScreen from 'expo-splash-screen'; // Tela de abertura
import { useEffect } from 'react'; // Efeitos colaterais
import 'react-native-reanimated'; // Animações
import { useColorScheme } from '@/hooks/useColorScheme'; // Detecção de modo claro/escuro
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Habilitação do uso de gestos (arrastar, deslizar...)

/* 
Impede que a Splash Screen desapareça automaticamente 
Será escondida manualmente quando os recursos terminarem de carregar
*/
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme(); // Detecção de tema claro/escuro

  // Carrega a fonte personalizada "SpaceMono" (asset/fonts)
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Esconde a Splash Screen após o carregamento das fontes
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Renderiza nada caso as fontes não carreguem
  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    // Suporte a gestos
    <GestureHandlerRootView>
      {/*Aplicação do tema do app, aqui está fixo no tema escuro*/}
      {/*Condicional: value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}*/}
      <ThemeProvider value={DarkTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} /> {/*Tela inicial sem cabeçalho*/}

          {/*Tela de permissões exibida como modal, com cabeçalho visível*/}
          <Stack.Screen
            name="permissions"
            options={{ presentation: "modal", headerShown: true }}
          />

          {/*Tela de mídia exibida como modal, mas sem cabeçalho*/}
          <Stack.Screen
            name="media"
            options={{ presentation: "modal", headerShown: false }}
          />

          {/*Tela de erro (not-found), aparece como modal*/}
          <Stack.Screen name='+not-found' options={{ presentation: "modal" }} />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
