import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import store from "@/Store";
import { Provider } from "react-redux";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        {/* <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" /> */}

        <GestureHandlerRootView style={{ flex: 1 }}>
          <Drawer>
            <Drawer.Screen
              name="index" // This is the name of the page and must match the url from root
              options={{
                drawerLabel: "Home",
                title: "overview",
              }}
            />
            <Drawer.Screen
              name="user/[id]" // This is the name of the page and must match the url from root
              options={{
                drawerLabel: "User",
                title: "overview",
              }}
            />
          </Drawer>
        </GestureHandlerRootView>
      </ThemeProvider>
    </Provider>
  );
}
