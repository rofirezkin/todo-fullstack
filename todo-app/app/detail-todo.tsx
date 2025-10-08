import { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

import { useGetTodoById } from "@/services/query/query/use-get-todo-by-id";
import { useUpdateTodo } from "@/services/query/mutation/use-update.todo";
import { useQueryClient } from "@tanstack/react-query";
import { GET_TODOS } from "@/services/query/query/use-get-todos";
import { T_AxiosBaseError } from "@/services/base-api";

export default function EditTodoScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: todo } = useGetTodoById({ params: { id: Number(id) } });
  const updateTodo = useUpdateTodo();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description ?? "");
    }
  }, [todo]);

  const handleUpdate = () => {
    if (!title) {
      alert("Title is required!");
      return;
    }

    updateTodo.mutate(
      { id: Number(id), title, description },
      {
        onSuccess: () => {
          alert("Todo updated successfully!");
          queryClient.invalidateQueries({ queryKey: [GET_TODOS] });
          router.back();
        },
        onError: (err: T_AxiosBaseError) => {
          alert("Failed to update todo: " + err.message);
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput value={title} onChangeText={setTitle} style={styles.input} />

      <Text style={styles.label}>Description</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={[styles.input, { height: 100 }]}
        multiline
      />

      <TouchableOpacity
        style={[styles.button, updateTodo.isPending && { opacity: 0.6 }]}
        onPress={handleUpdate}
        disabled={updateTodo.isPending}
      >
        <Text style={styles.buttonText}>
          {updateTodo.isPending ? "Updating..." : "Update Todo"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#4630EB",
  },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 5 },
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
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
