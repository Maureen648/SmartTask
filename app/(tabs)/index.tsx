// import { StyleSheet } from 'react-native';

// import EditScreenInfo from '@/components/EditScreenInfo';
// import { Text, View } from '@/components/Themed';

// export default function TabOneScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Tab One</Text>
//       <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
//       <EditScreenInfo path="app/(tabs)/index.tsx" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
// });

// app/(tabs)/index.tsx
import React, { useState } from 'react';
import { View, FlatList, Text, Button, StyleSheet } from 'react-native';
import TaskInput from '../../components/TaskInput';
import TaskCard from '../../components/TaskCard';
import { Task } from '../../types/Task';

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleComplete = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const clearAll = () => {
    setTasks([]);
  };

  return (
    <View style={styles.container}>
      <TaskInput onAddTask={addTask} />
      <Text style={styles.counter}>
        Total: {tasks.length} | Completed: {tasks.filter(t => t.completed).length}
      </Text>
      {tasks.length === 0 ? (
        <Text style={styles.empty}>No tasks available.</Text>
      ) : (
        <>
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TaskCard
                task={item}
                onToggleComplete={() => toggleComplete(item.id)}
                onDelete={() => deleteTask(item.id)}
              />
            )}
          />
          <Button title="Clear All" onPress={clearAll} color="red" />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20 },
  counter: { textAlign: 'center', fontSize: 16, marginVertical: 10 },
  empty: { textAlign: 'center', marginTop: 30, color: '#888' },
});
