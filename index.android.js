"use strict";

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Navigator,
} from 'react-native';

import Home from './App/Components/Home';
import Dashboard from './App/Components/Dashboard';
import Profile from './App/Components/Profile';
import Repositories from './App/Components/Repositories';
import CustomWebView from './App/Components/Helpers/CustomWebView';
import Notes from './App/Components/Notes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red'
    }
});

React.BackAndroid.addEventListener('hardwareBackPress', () => {
    if (navigator && navigator.getCurrentRoutes().length > 1) {
        navigator.pop();
        return true;
    }

    return false;
});

class githubNotetaker extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{id: 'Home', passProps: {}}}
                renderScene={this.renderScene.bind(this)}
                ref={(nav) => { navigator = nav; }}
                // navigationBar={this.navigationBar.bind(this)}
                configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromRight}
            />
        )
    }

    renderScene(route, navigator) {
        if (route.id == 'Home') {
            return <Home navigator={navigator} {...route.passProps} />
        }

        if (route.id == 'Dashboard') {
            return <Dashboard navigator={navigator} {...route.passProps} />
        }

        if (route.id == 'Profile') {
            return <Profile navigator={navigator} {...route.passProps} />
        }

        if (route.id == 'Repositories') {
            return <Repositories navigator={navigator} {...route.passProps} />
        }

        if (route.id == 'CustomWebView') {
            return <CustomWebView navigator={navigator} {...route.passProps} />
        }

        if (route.id == 'Notes') {
            return <Notes navigator={navigator} {...route.passProps} />
        }
    }
};

AppRegistry.registerComponent('githubNotetaker', () => githubNotetaker);
