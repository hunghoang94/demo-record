import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  recordButton: {
    height: 100,
    width: 100,
    textAlign: "center",
    textAlignVertical: "center",
    borderColor: "#d2684b",
    borderWidth: 1,
    borderRadius: 50,
    marginBottom: 20
  },
  active: {
    color: "#fff",
    backgroundColor: "#d2684b"
  },
  inactive: {
    color: "#d2684b",
    backgroundColor: "#fff"
  }
});
