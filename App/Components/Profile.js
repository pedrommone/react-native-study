"use strict";

import React, {
    AppRegistry,
    Text,
    View,
    StyleSheet,
    Component,
    ScrollView
} from 'react-native';

var Badge = require('./Badge');
var Separator = require('./Helpers/Separator');

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    rowContainer: {
        paddingTop: 10,
        paddingLeft: 10 
    },
    rowTitle: {
        color: '#48BBEC',
        fontSize: 16
    },
    rowContents: {
        fontSize: 19
    }
});

class Profile extends Component {
    getRowTitle(user, item) {
        item = (item === 'public_repos') ? item.replace('_', ' ') : item;

        return item[0] ? item[0].toUpperCase() + item.slice(1) :  item;
    }

    render() {
        var userInfo = this.props.userInfo;
        var topicArrv = ['company', 'location', 'followers', 'following', 'email', 'bio', 'public_repos'];
        
        var list = topicArrv.map((item, index) => {
            if (!userInfo[item]) {
                return <View key={index} />
            } else {
                return (
                    <View key={index}>
                        <View style={styles.rowContainer}>
                            <Text style={styles.rowTitle}> {this.getRowTitle(userInfo, item)} </Text>
                            <Text style={styles.rowContainer}> {userInfo[item]} </Text>
                        </View>

                        <Separator />
                    </View>
                )
            }
        });

        return (
            <ScrollView style={styles.container}>
                <Badge userInfo={this.props.userInfo} />
                {list}
            </ScrollView>
        )
    }
}

AppRegistry.registerComponent('Profile', () => Profile);
module.exports = Profile;
