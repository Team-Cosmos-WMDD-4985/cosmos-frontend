import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import AxiosService from '../../services/axios'
const CreateYourQuiz = ({ route, navigation }) => {
    const { topics, courseId } = route.params;
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [numQuestions, setNumQuestions] = useState("");





    console.log(name)
    console.log(courseId)
    console.log(type)
    console.log(topics)
    console.log(difficulty)
    console.log(numQuestions)
    const handleTypeSelection = (selectedType) => {
        setType(selectedType);
    };

    const handleDifficultySelection = (selectedDifficulty) => {
        setDifficulty(selectedDifficulty);
    };

    const sendQuizInfo = async () => {
        navigation.navigate('MultipleChoiceQue')
        try {
            const response = await AxiosService(
                "POST",
                "sendTopics",
                true,
                {},
                { topics, courseId, name, type, difficulty, numQuestions }
            );
            
        } catch (err) {
            console.log(err)
        }
        
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Your Quiz!</Text>
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter quiz name"
                        value={name}
                        onChangeText={setName} // Directly update name state on text change
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Question Type</Text>
                    {["Multiple-Choice", "True-False", "Long-Answer"].map((option) => (
                        <TouchableOpacity
                            key={option}
                            style={[styles.button, type === option && styles.selectedButton]}
                            onPress={() => handleTypeSelection(option)}>
                            <Text style={styles.buttonText}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Difficulty Level</Text>
                    <View style={styles.buttonDiv}>
                        {["EASY", "MEDIUM", "HARD"].map((level) => (
                            <TouchableOpacity
                                key={level}
                                style={[styles.button, difficulty === level && styles.selectedButton]}
                                onPress={() => handleDifficultySelection(level)}>
                                <Text style={styles.buttonText}>{level}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Number of Questions</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter number of questions"
                        keyboardType="number-pad"
                        value={numQuestions}
                        onChangeText={setNumQuestions} // Directly update numQuestions state on text change
                    />
                    <Text style={styles.helperText}>Maximum of 30 questions</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => { /* Handle Generate Quiz */ }}>
                    {/* <Text style={styles.buttonText} onPress={() => navigation.navigate('MultipleChoiceQue')}>Generate Quiz</Text> */}
                    <Text style={styles.buttonText} onPress={() => sendQuizInfo()}>Generate Quiz</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 70,
        alignItems: 'center',
    },
    formContainer: {
        width: '80%',
        justifyContent: "space-around"
    },
    title: {
        fontSize: 23,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 20,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    helperText: {
        fontSize: 12,
        color: 'gray',
        marginTop: 5,
    },
    button: {
        backgroundColor: '#A1A1A1',
        borderRadius: 5,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        marginTop: 10, // Added margin for spacing between buttons
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonDiv: {
        flexDirection: "row",
        justifyContent: "space-between", // Adjusted for evenly space buttons
        marginTop: 10, // Added margin for spacing
    },
    selectedButton: {
        backgroundColor: 'tomato', // Highlight for selected button
    },
    // Added styles for spacing between elements
    gap: {
        marginBottom: 20, // Adjust as needed for spacing between input elements
    },
});


export default CreateYourQuiz;
