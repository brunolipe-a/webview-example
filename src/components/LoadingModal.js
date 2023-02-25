import { ActivityIndicator, Modal, View, StyleSheet } from "react-native";

export default function LoadingModal({ isOpen, style }) {
  return (
    <Modal
      animationType="fade"
      visible={isOpen}
      transparent
      statusBarTranslucent
    >
      <View style={styles.centeredView}>
        <View
          style={[
            styles.modalView,
            { backgroundColor: style === "light" ? "white" : "black" },
          ]}
        >
          <ActivityIndicator size="small" color="#ff7e01" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0008",
  },
  modalView: {
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
