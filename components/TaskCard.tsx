// components/TaskCard.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Task } from '../types/Task';

interface Props {
  task: Task;
  onToggleComplete: () => void;
  onDelete: () => void;
}

export default function TaskCard({ task, onToggleComplete, onDelete }: Props) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <TouchableOpacity onPress={() => setShowDetails(!showDetails)}>
      <View style={[styles.card, task.completed && styles.completed]}>
        <Text style={styles.title}>{task.title}</Text>
        {showDetails && <Text style={styles.description}>{task.description}</Text>}
        <View style={styles.actions}>
          <TouchableOpacity onPress={onToggleComplete}>
            <Text>{task.completed ? 'Undo' : 'Done'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete}>
            <Text style={{ color: 'red' }}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  completed: {
    backgroundColor: '#d1ffd6',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  description: {
    marginTop: 5,
    color: '#555',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
