"use strict";

import React, {
    AppRegistry,
    Component,
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableHighlight
} from 'react-native';

import Spinner from 'react-native-spinkit';

var API = require('../Utils/API');

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#48BBEC',
        paddingTop: 200
    },
    title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center',
        color: '#fff',
    },
    searchInput: {
        height: 50,
        padding: 4,
        marginRight: 5,
        fontSize: 23,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 45,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 30
    },
    spinner: {
        alignSelf: 'center',
    }
});

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            isLoading: false,
            error: false,
        }
    }

    handleChange(event) {
        this.setState({
            username: event.nativeEvent.text
        });
    }

    handleSubmit() {
        this.setState({
            isLoading: true
        });

        API.getBio(this.state.username)
            .then((res) => {
                if (res.message == 'Not Found') {
                    this.setState({
                        error: 'User not found!',
                        isLoading: false
                    });
                } else {
                    this.props.navigator.push({
                        id: 'Dashboard',
                        passProps: {userInfo: res}
                    });

                    this.setState({
                        isLoading: false,
                        error: false,
                        username: ''
                    });
                }
            });
    }

    render() {
        var showErr = (
            this.state.error ? <Text> { this.state.error } </Text> : <View></View>
        );

        return (
            <View style={styles.mainContainer}>
                <Text style={styles.title}> Search for a GitHub User </Text>

                <TextInput
                    style={styles.searchInput}
                    onChange={this.handleChange.bind(this)} />

                <TouchableHighlight
                    style={styles.button}
                    onPress={this.handleSubmit.bind(this)}
                    underlayColor="white">
                        <Text style={styles.buttonText}> SEARCH </Text>
                </TouchableHighlight>

                {showErr}

                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Spinner
                        style={styles.spinner}
                        isVisible={this.state.isLoading}
                        size={50}
                        type="Wave"
                        color="white" />
                </View>
            </View>
        )
    }
}

AppRegistry.registerComponent('Home', () => Home);
module.exports = Home;
