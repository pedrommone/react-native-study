"use strict";

import React, {
    AppRegistry,
    Text,
    View,
    StyleSheet,
    Component,
    ScrollView,
    TouchableHighlight
} from 'react-native';

var Badge = require('./Badge');
var Separator = require('./Helpers/Separator');
var CustomWebView = require('./Helpers/CustomWebView');

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    rowContainer: {
        flexDirection: 'column',
        flex: 1,
        padding: 10 
    },
    name: {
        color: '#48BBEC',
        fontSize: 18,
        paddingBottom: 5
    },
    stars: {
        color: '#48BBEC',
        fontSize: 14,
        paddingBottom: 5
    },
    desciption: {
        fontSize: 14,
        paddingBottom: 5
    }
});

class Repositories extends Component {
    openPage(url) {
        this.props.navigator.push({
            id: 'CustomWebView',
            passProps: {url: url}
        });
    }

    render() {
        var repos = this.props.repos;
        var list = repos.map((item, index) => {
            var desc = repos[index].description
                ? <Text style={styles.description}> {repos[index].description} </Text>
                : <View></View>;

            return (
                <View key={index}>
                    <View style={styles.rowContainer}>
                        <TouchableHighlight
                            onPress={this.openPage.bind(this, repos[index].html_url)}
                            underlayColor='transparent'>
                            <Text style={styles.name}> {repos[index].name} </Text>
                        </TouchableHighlight>

                        <Text style={styles.stars}> Stars: {repos[index].stargazers_count} </Text>

                        {desc}
                    </View>

                    <Separator />
                </View>
            )
        });

        return (
            <ScrollView style={styles.container}>
                <Badge userInfo={this.props.userInfo} />

                {list}
            </ScrollView>
        )
    }
}

AppRegistry.registerComponent('Repositories', () => Repositories);
module.exports = Repositories;
