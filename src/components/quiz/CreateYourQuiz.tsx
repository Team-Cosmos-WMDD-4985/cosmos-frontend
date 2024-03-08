// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';

// const CreateYourQuiz = ({navigation}) => {
//     const [showPassword, setShowPassword] = useState(false);

//     const handleTogglePasswordVisibility = () => {
//         setShowPassword(prevState => !prevState);
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Create Your Quiz!</Text>
//             <View style={styles.formContainer}>
//                 <View style={styles.inputContainer}>
//                     <Text style={styles.label}>Name</Text>
//                     <TextInput style={styles.input} placeholder="Enter your email" />
//                 </View>
//                 <View style={styles.inputContainer}>
//                     <Text style={styles.label}>Question Type</Text>
//                     <TouchableOpacity style={{ backgroundColor: "#A1A1A1", width: "100%", height: 40, alignItems: "center", justifyContent: "center", borderRadius: 5 }}><Button color="black" title="Multiple-Choice"  /></TouchableOpacity>
//                     <TouchableOpacity style={{ backgroundColor: "#A1A1A1", width: "100%", height: 40, alignItems: "center", justifyContent: "center", borderRadius: 5 }}><Button color="black" title="True-False"  /></TouchableOpacity>
//                     <TouchableOpacity style={{ backgroundColor: "#A1A1A1", width: "100%", height: 40, alignItems: "center", justifyContent: "center", borderRadius: 5 }}><Button color="black" title="Long-Answer" /></TouchableOpacity>
//                 </View>
//                 <View style={styles.inputContainer}>
//                     <Text style={styles.label}>Difficulty Level</Text>
//                     <View style={styles.buttonDiv}>
//                         <TouchableOpacity style={{ backgroundColor: "#D9D9D966", borderColor: "black", justifyContent: "center", width: 100, borderRadius: 10 }}><Button color="black" title="EASY" /></TouchableOpacity>
//                         <TouchableOpacity style={{ backgroundColor: "#D9D9D966", borderColor: "black", justifyContent: "center", width: 100, borderRadius: 10 }}><Button color="black" title="MEDIUM" /></TouchableOpacity>
//                         <TouchableOpacity style={{ backgroundColor: "#D9D9D966", borderColor: "black", justifyContent: "center", width: 100, borderRadius: 10 }}><Button color="black" title="HARD" /></TouchableOpacity>
//                     </View>
//                 </View>
//                 <View style={styles.inputContainer}>
//                     <Text style={styles.label}>Number of Questions</Text>
//                     <TextInput style={styles.input} placeholder="Enter number of questions" />
//                     <Text style={styles.helperText}>Maximum of 30 questions</Text>
//                 </View>
//                 <TouchableOpacity style={styles.button} onPress={() => { }}>
//                     <Text style={styles.buttonText} onPress={() => navigation.navigate('MultipleChoiceQue')}>Generate Quiz</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         marginTop: 70,
//         alignItems: 'center',
//     },
//     formContainer: {
//         width: '80%',
//         justifyContent:"space-around"
//     },
//     title: {
//         fontSize: 23,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
//     inputContainer: {
//         marginBottom: 20,
//         gap:10
//     },
//     label: {
//         fontSize: 20,
//         marginBottom: 10,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: 'gray',
//         borderRadius: 5,
//         paddingHorizontal: 10,
//         paddingVertical: 8,
//     },
//     helperText: {
//         fontSize: 12,
//         color: 'gray',
//         marginTop: 5,
//     },
//     button: {
//         backgroundColor: 'tomato',
//         borderRadius: 10,
//         paddingVertical: 12,
//         alignItems: 'center',
//     },
//     buttonText: {
//         color: '#fff',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     buttonDiv:{
//         flexDirection:"row",
//         gap:10
//     }
// });

// export default CreateYourQuiz;
