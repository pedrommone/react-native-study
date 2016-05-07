"use strict";

import React, {
    AppRegistry,
    Text,
    View,
    StyleSheet,
    Component,
    Image,
    TouchableHighlight
} from 'react-native';

var API = require('../Utils/API');

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        height: 350
    },
    buttonText: {
        fontSize: 24,
        color: 'white',
        alignSelf: 'center'
    }
});

var API = require('../Utils/API');

class Dashboard extends Component {
    makeBackground(index) {
        var obj = {
            flexDirection: 'row',
            alignSelf: 'stretch',
            justifyContent: 'center',
            flex: 1
        }

        if (index == 0) {
            obj.backgroundColor = '#48BBEC';
        }

        if (index == 1) {
            obj.backgroundColor = '#E77AAE';
        }

        if (index == 2) {
            obj.backgroundColor = '#758BF4';
        }

        return obj;
    }

    goToProfile() {
        this.props.navigator.push({
            id: 'Profile',
            passProps: {userInfo: this.props.userInfo}
        });
    }

    goToRepos() {
        API.getRepos(this.props.userInfo.login)
            .then((res) => {
                this.props.navigator.push({
                    id: 'Repositories',
                    passProps: {
                        userInfo: this.props.userInfo,
                        repos: res
                    }
                })   
            });
    }

    goToNotes() {
        API.getNotes(this.props.userInfo.login)
            .then((res) => {
                res = res || {};

                this.props.navigator.push({
                    id: 'Notes',
                    passProps: {
                        notes: res,
                        userInfo: this.props.userInfo
                    }
                });
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={{uri: this.props.userInfo.avatar_url}} />

                <TouchableHighlight
                    style={this.makeBackground(0)}
                    onPress={this.goToProfile.bind(this)}
                    underlayColor='#88D4F5'>
                    <Text style={styles.buttonText}> View Profile </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={this.makeBackground(1)}
                    onPress={this.goToRepos.bind(this)}
                    underlayColor='#88D4F5'>
                    <Text style={styles.buttonText}> View Repositories </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={this.makeBackground(2)}
                    onPress={this.goToNotes.bind(this)}
                    underlayColor='#88D4F5'>
                    <Text style={styles.buttonText}> View Notes </Text>
                </TouchableHighlight>
            </View>
        )
    }
}

AppRegistry.registerComponent('Dashboard', () => Dashboard);
module.exports = Dashboard;
