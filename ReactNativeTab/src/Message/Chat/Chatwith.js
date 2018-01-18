/* @flow */

// import React, { Component } from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// // create a component
// class Chatwith extends Component {
//     render() {
//         return (
//             <View style={styles.page}>
//                 <View style={styles.container}>
//                     <Text style={styles.text}>Chatwith</Text>
//                 </View>
//             </View>
//         );
//     }
// }


// const styles = StyleSheet.create({
//     page: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     container: {
//         backgroundColor: 'rgba(0, 0, 0, .1)',
//         borderRadius: 3,
//     },
//     text: {
//         color: '#000',
//         textAlign: 'center',
//         marginVertical: 8,
//         marginHorizontal: 16,
//     },
// });
// //make this component available to the app
// export default Chatwith;

//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
class Chatwith extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>MyClass</Text>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Chatwith;

