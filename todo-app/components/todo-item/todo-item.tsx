import { Colors } from "@/constants/theme";
import { T_Todo } from "@/services/api/type.todos";
import { Ionicons } from "@expo/vector-icons";
import { Checkbox } from "expo-checkbox";
import { router } from "expo-router";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

export const ToDoItem = ({
  todo,
  deleteTodo,
  handleDone,
}: {
  todo: T_Todo;
  deleteTodo: (id: number) => void;
  handleDone: (id: number, completed: boolean) => void;
}) => {
  const colorScheme = useColorScheme() ?? "light";

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({ pathname: "/detail-todo", params: { id: todo.id } })
      }
      style={styles.todoContainer}
    >
      <View style={styles.todoInfoContainer}>
        <Checkbox
          value={todo.completed}
          onValueChange={() => handleDone(todo.id, todo.completed)}
          color={todo.completed ? "#4630EB" : undefined}
        />
        <View style={{ gap: 4, flex: 1 }}>
          <Text
            style={[
              styles.todoText,
              { color: Colors[colorScheme].text },
              todo.completed && { textDecorationLine: "line-through" },
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {todo.title}
          </Text>

          {todo.description ? (
            <Text
              style={[
                styles.todoDescription,
                { color: Colors[colorScheme].desc },
                todo.completed && { textDecorationLine: "line-through" },
              ]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {todo.description}
            </Text>
          ) : null}
        </View>
      </View>
      <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
        <Ionicons name="trash" size={24} color={"red"} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  todoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
  },
  todoInfoContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    flex: 1,
  },
  todoText: {
    fontSize: 16,
    flexShrink: 1,
  },
  todoDescription: {
    fontSize: 12,
    flexShrink: 1,
  },
});
