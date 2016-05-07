"use strict";

import React, {
    AppRegistry,
    View,
    StyleSheet,
    Component,
    WebView
} from 'react-native';

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F6EF',
        flexDirection: 'column'
    }
});

class CustomWebView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <WebView source={{uri: this.props.url}} />
            </View>
        )
    }
}

AppRegistry.registerComponent('CustomWebView', () => CustomWebView);
module.exports = CustomWebView;
