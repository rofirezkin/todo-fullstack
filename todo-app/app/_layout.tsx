import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import BackButton from "@/components/back-button/BackButton";
import { Colors } from "@/constants/theme";
import { AppWrapper } from "@/context/client-provider";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AppWrapper>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{
              title: "Create Todo",
              headerLeft: () => (
                <BackButton color={Colors[colorScheme || "light"].text} />
              ),
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="detail-todo"
            options={{
              title: "Edit Todo",
              headerLeft: () => (
                <BackButton color={Colors[colorScheme || "light"].text} />
              ),
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </AppWrapper>
    </ThemeProvider>
  );
}
