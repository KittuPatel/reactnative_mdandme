import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 10,
  },
  header: {
    marginBottom: 10,
    paddingBottom: 5,
  },
  headerTitle: {
    paddingTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Avenir",
  },
  post: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderTopWidth: 4,
    borderTopColor: "#FFB6C1",
    fontFamily: "Avenir",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "Avenir",
  },
  postBody: {
    fontFamily: "Avenir",
  },
  readMore: {
    color: "#1e90ff",
    fontWeight: "bold",
    fontFamily: "Avenir",
  },
  assessment: {
    fontSize: 14,
    fontStyle: "italic",
    marginTop: 10,
    color: "#555",
    fontFamily: "Avenir",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconText: { fontWeight: "600" },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    fontFamily: "Avenir",
  },
  commentsTitle: {
    fontFamily: "Avenir",
    color: "#888",
    fontSize: 14,
  },
  commentSection: {
    marginTop: 10,
    maxHeight: 200,
    fontFamily: "Avenir",
  },
  comment: {
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    paddingVertical: 5,
    fontFamily: "Avenir",
  },
  commentName: {
    fontWeight: "bold",
    marginBottom: 4,
    fontFamily: "Avenir",
  },
  commentDate: {
    fontSize: 12,
    marginTop: 4,
    color: "#888",
    fontFamily: "Avenir",
  },
})
