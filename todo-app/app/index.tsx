import {
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { useMemo, useState } from "react";
import { useGetTodos } from "@/services/query/query/use-get-todos";

import { useUpdateTodo } from "@/services/query/mutation/use-update.todo";
import { useDeleteTodo } from "@/services/query/mutation/use-delete-todo";
import { router } from "expo-router";
import { ToDoItem } from "@/components/todo-item/todo-item";

export default function Index() {
  const { data: todos, isLoading, refetch } = useGetTodos();

  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const handleDelete = (id: number) => {
    deleteTodo.mutate(
      { id },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  const handleDone = (id: number, completed: boolean) => {
    updateTodo.mutate(
      { id, completed: !completed },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  const filteredTodos = useMemo(() => {
    if (!todos) return [];
    switch (filter) {
      case "active":
        return todos.filter((t) => !t.completed);
      case "completed":
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => setFilter("all")}>
          <Text
            style={[styles.filterText, filter === "all" && styles.activeFilter]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter("active")}>
          <Text
            style={[
              styles.filterText,
              filter === "active" && styles.activeFilter,
            ]}
          >
            Active
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter("completed")}>
          <Text
            style={[
              styles.filterText,
              filter === "completed" && styles.activeFilter,
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <Text>Loading...</Text>
      ) : filteredTodos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="clipboard-outline" size={64} color="#aaa" />
          <Text style={styles.emptyText}>No todos found</Text>
          <Text style={styles.emptySubText}>
            Tap the + button below to create your first todo!
          </Text>
        </View>
      ) : (
        <FlatList
          data={[...filteredTodos].reverse()}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ToDoItem
              todo={item}
              deleteTodo={handleDelete}
              handleDone={handleDone}
            />
          )}
        />
      )}

      {/* Footer */}
      <KeyboardAvoidingView
        style={styles.footer}
        behavior="padding"
        keyboardVerticalOffset={10}
      >
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/modal")}
        >
          <Ionicons name="add" size={34} color={"#fff"} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    bottom: 20,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    backgroundColor: "#4630EB",
    padding: 8,
    borderRadius: 10,
    marginLeft: 20,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
    marginTop: 30,
    gap: 20,
  },
  filterText: {
    fontSize: 16,
    color: "#555",
  },
  activeFilter: {
    color: "#4630EB",
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  emptySubText: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
    textAlign: "center",
  },
});
