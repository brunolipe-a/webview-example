import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  BackHandler,
  Platform,
  AppState,
} from "react-native";
import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import { useRef, useEffect, useState } from "react";
import LoadingModal from "./src/components/LoadingModal";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const webViewRef = useRef(null);

  function onAndroidBackPress() {
    if (!webViewRef.current) {
      return false;
    }

    webViewRef.current.goBack();

    return true; // prevent default behavior (exit app)
  }

  useEffect(() => {
    const subscription = AppState.addEventListener("change", () =>
      setIsLoading(false)
    );

    if (Platform.OS !== "android") {
      return () => subscription.remove();
    }

    BackHandler.addEventListener("hardwareBackPress", onAndroidBackPress);

    return () => {
      subscription.remove();
      BackHandler.removeEventListener("hardwareBackPress", onAndroidBackPress);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#000" />

      <WebView
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "#000",
          justifyContent: "center",
        }}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        allowsBackForwardNavigationGestures
        showsHorizontalScrollIndicator={false}
        textZoom={100}
        source={{ uri: "https://fotoesportesbh.46graus.com" }}
        ref={webViewRef}
      />
      <LoadingModal style="dark" isOpen={isLoading} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    backgroundColor: "#000",
  },
});
