import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Headers from '../../common/Headers';

const GetAnswer = ({ route, navigation }) => {
    const { quiz } = route.params;
    console.log(`quiz getAnswer ${quiz}`);
    
    const handleNavigate = () => {
    if (navigation.canGoBack()) {
        navigation.goBack();
      } 
}


    return (
        <View style={styles.container}>
            <Headers courseText="Answers" courseTextDes="Answers" display={true} handleNavigate={handleNavigate}/>
            <ScrollView>
                
                {quiz.map((question, index) => (
                    <View key={index} style={styles.questionContainer}>
                        <View style={styles.quizContainer}>
                            <Text style={styles.question}>Question {index + 1}</Text>
                            <Text style={styles.question}>{question.question}</Text>
                        </View>
                        <View style={styles.answerDiv}>
                            <Text>Your answer: </Text>
                            <Text style={styles.answer}>{question.answer || "No Answer Yet"}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingHorizontal: 20,
        paddingVertical: 10,
        // alignItems: "center"
    },
    questionContainer: {
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    question: {
        fontSize: 13,
        // fontWeight: 'bold',
        marginBottom: 10,
        color: "white",
        textAlign: "left"
    },
    optionsContainer: {
        marginLeft: 20,
    },
    option: {
        fontSize: 16,
        marginBottom: 5,
    },
    quizContainer: {
        backgroundColor: "#3C3D43",
        width: 350,
        height: 120,
        borderRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        padding: 10,
    },

    answerDiv: {
        width: 350,
        borderWidth: 1,
        padding: 20,
        borderRadius: 10,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderColor: 'black',
        borderStyle: 'solid',
        backgroundColor: '#D7FFF3'
    },
    answer:{
        fontWeight:"bold",
        fontSize:16
    }
});

export default GetAnswer;
