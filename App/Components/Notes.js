"use strict";

import React, {
    AppRegistry,
    TextInput,
    View,
    Text,
    StyleSheet,
    Component,
    ScrollView,
    TouchableHighlight,
    ListView
} from 'react-native';

var Badge = require('./Badge');
var Separator = require('./Helpers/Separator');
var API = require('../Utils/API');

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    buttonText: {
        fontSize: 18,
        color: 'white'
    },
    button: {
        height: 60,
        backgroundColor: '#48BBEC',
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchInput: {
        height: 60,
        padding: 10,
        fontSize: 18,
        color: '#111',
        flex: 9
    },
    rowContainer: {
        padding: 10
    },
    footerContainer: {
        backgroundColor: '#E3E3E3',
        alignItems: 'center',
        flexDirection: 'row'
    }
});

class Notes extends Component {
    constructor(props) {
        super(props);

        this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
        this.state = {
            dataSource: this.ds.cloneWithRows(this.props.notes),
            note: '',
            error: ''
        }
    }

    openPage(url) {
        this.props.navigator.push({
            id: 'CustomWebView',
            passProps: {url: url}
        });
    }

    handleChange(event) {
        this.setState({
            note: event.nativeEvent.text
        });
    }

    handleSubmit() {
        var note = this.state.note;

        this.setState({
            note: ''
        });

        API.addNotes(this.props.userInfo.login, note)
            .then((data) => {
                API.getNotes(this.props.userInfo.login)
                    .then((data) => {
                        this.setState({
                            dataSource: this.ds.cloneWithRows(data)
                        });
                    });
            })
            .catch((err) => {
                console.log('Request Failed', err);
                this.setState({error});
            });
    }

    footer() {
        return (
            <View style={styles.footerContainer}>
                <TextInput
                    style={styles.searchInput}
                    value={this.state.note}
                    onChange={this.handleChange.bind(this)}
                    placeholder="New Note" />

                <TouchableHighlight
                    style={styles.button}
                    onPress={this.handleSubmit.bind(this)}
                    underlayColor="#88D4F5">
                        <Text style={styles.buttonText}> Submit </Text>
                </TouchableHighlight>
            </View>
        )
    }

    renderRow(rowData) {
        return (
            <View>
                <View style={styles.rowContainer}>
                    <Text> {rowData} </Text>
                </View>

                <Separator />
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderHeader={() => <Badge userInfo={this.props.userInfo}/> } />

                {this.footer()}
            </View>
        )
    }
}

AppRegistry.registerComponent('Notes', () => Notes);
module.exports = Notes;
