import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, BackHandler, Platform } from "react-native";
import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import { useRef, useEffect, useState } from "react";
import LoadingModal from "./src/components/LoadingModal";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const webViewRef = useRef(null);

  function onAndroidBackPress() {
    if (!webViewRef.current) {
      return false;
    }

    webViewRef.current.goBack();

    return true; // prevent default behavior (exit app)
  }

  useEffect(() => {
    if (Platform.OS !== "android") {
      return;
    }

    BackHandler.addEventListener("hardwareBackPress", onAndroidBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onAndroidBackPress);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <WebView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        allowsBackForwardNavigationGestures
        showsHorizontalScrollIndicator={false}
        source={{ uri: "https://afsphoto.fotop.com.br/fotos" }}
        ref={webViewRef}
      >
        <LoadingModal isOpen={isLoading} />
      </WebView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
});
