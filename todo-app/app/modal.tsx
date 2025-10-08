import { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
import { useCreateTodo } from "@/services/query/mutation/use-create-todo";
import { useQueryClient } from "@tanstack/react-query";
import { GET_TODOS } from "@/services/query/query/use-get-todos";
import { T_AxiosBaseError } from "@/services/base-api";

export default function CreateTodoScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const queryClient = useQueryClient();
  const router = useRouter();

  const createTodo = useCreateTodo();

  const handleSubmit = () => {
    if (!title) {
      alert("Title is required!");
      return;
    }

    createTodo.mutate(
      { title, description },
      {
        onSuccess: () => {
          alert("Todo created successfully!");
          setTitle("");
          setDescription("");
          queryClient.invalidateQueries({ queryKey: [GET_TODOS] });
          router.back();
        },
        onError: (err: T_AxiosBaseError) => {
          alert("Failed to create todo: " + err.message);
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
        style={styles.input}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description (optional)"
        style={[styles.input, { height: 100 }]}
        multiline
      />

      <TouchableOpacity
        style={[styles.button, createTodo.isPending && { opacity: 0.6 }]}
        onPress={handleSubmit}
        disabled={createTodo.isPending}
      >
        <Text style={styles.buttonText}>
          {createTodo.isPending ? "Creating..." : "Create Todo"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#4630EB",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#4630EB",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
