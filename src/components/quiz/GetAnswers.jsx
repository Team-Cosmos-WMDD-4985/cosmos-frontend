import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GetAnswer = ({ route, navigation }) => {
    const { quiz } = route.params;
    console.log(`quiz getAnswer ${JSON.stringify(quiz)}`);

    return (
        <View style={styles.container}>
            <View>
               {quiz.questions.map((question, index) => (
                   <View key={index} style={styles.questionContainer}>
                       <Text style={styles.question}>{question.question}</Text>
                       <Text> Your answer: </Text>
                       <Text style={styles.answer}>{question.answer || "No Answer Yet"}</Text>
                   </View>
               ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    questionContainer: {
        marginBottom: 20,
    },
    question: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    optionsContainer: {
        marginLeft: 20,
    },
    option: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default GetAnswer;
