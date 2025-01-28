import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');

  // Add a new Task
  const addTask = () => {
    if (taskTitle.trim() === '') return;
    if (tasks.some(task => task.title === taskTitle.trim())) {
      Alert.alert('Duplicate Task', 'This task already exists!');
      return;
    }
    setTasks([...tasks, { title: taskTitle.trim(), status: 'due' }]);
    setTaskTitle('');
  };

  // Toggle status between "due" and "done"
  const togglesStatus = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = updatedTasks[index].status === 'due' ? 'done' : 'due';
    setTasks(updatedTasks);
  };

  // Delete task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.AppTitleHeader}>ToDo App by Ibrahim</Text>
      {/* INPUT FIELD */}
      <TextInput
        style={styles.input}
        placeholder="Enter the Task Title"
        value={taskTitle}
        onChangeText={setTaskTitle}
      />
      {/* Add Task Button */}
      <Button
        title="Add Task"
        onPress={addTask}
        disabled={taskTitle.trim() === ''}
      />
      {/* Empty List Message */}
      {tasks.length === 0 && (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>No tasks added yet!</Text>
      )}
      {/* List of tasks */}
      <FlatList
        data={tasks}
        renderItem={({ item, index }) => (
          <View style={styles.taskCard}>
            <Text style={styles.taskText}>{item.title}</Text>
            <Text
              style={{
                color: item.status === 'done' ? 'green' : 'orange',
                fontWeight: 'bold',
              }}
            >
              {item.status}
            </Text>

            {/* Toggle status */}
            <Switch
              value={item.status === 'done'}
              onValueChange={() => togglesStatus(index)}
            />

            {/* Delete Task */}
            <TouchableOpacity onPress={() => deleteTask(index)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#ccd1d1',
  },
  AppTitleHeader: {
    paddingTop: 35,
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 25,
  },
  input: {
    height: 45,
    borderWidth: 1,
    marginBottom: 10,
    borderColor: 'grey',
    paddingLeft: 8,
  },
  taskCard: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  taskText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  deleteText: {
    color: 'red',
    marginTop: 5,
  },
});
