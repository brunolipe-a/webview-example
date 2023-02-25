import { ActivityIndicator, Modal, View, StyleSheet } from "react-native";

export default function LoadingModal({ isOpen }) {
  return (
    <Modal
      animationType="fade"
      visible={isOpen}
      transparent
      statusBarTranslucent
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
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
    backgroundColor: "white",
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
