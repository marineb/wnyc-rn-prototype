
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Platform,
    TouchableOpacity
} from 'react-native';
import { ReactNativeAudioStreaming, Player } from 'react-native-audio-streaming';

export default class App extends Component {
    constructor() {
        super();
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.urls = [
            {
                name: 'WNYC FM',
                // url: 'http://lacavewebradio.chickenkiller.com:8000/stream.mp3'
                url: 'http://fm939.wnyc.org/wnycfm'
            },
            {
                name: 'WNYC AM',
                url: 'http://am820.wnyc.org/wnycam'
            },
        ];

        this.state = {
            dataSource: this.ds.cloneWithRows(this.urls),
            selectedSource: this.urls[0].url
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                        <TouchableOpacity onPress={() => {
                            this.setState({selectedSource: rowData.url, dataSource: this.ds.cloneWithRows(this.urls)});
                            ReactNativeAudioStreaming.play(rowData.url, {});
                        }}>
                            <View style={StyleSheet.flatten([
                                styles.row,
                                {backgroundColor: rowData.url == this.state.selectedSource ? '#DE1E3D' : 'white'}
                            ])}>
                                <Text style={styles.icon}>▸</Text>
                                <View style={styles.column}>
                                    <Text style={styles.name}>{rowData.name}</Text>
                                    <Text style={styles.url}>{rowData.url}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                />

                <Player url={this.state.selectedSource} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fafafa',
        paddingTop: Platform.OS === 'ios' ? 30 : 0
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        borderBottomColor: 'grey',
        borderBottomWidth: 1
    },
    column: {
        flexDirection: 'column'
    },
    icon: {
        fontSize: 26,
        width: 30,
        textAlign: 'center'
    },
    name: {
        color: '#000'
    },
    url: {
        color: '#CCC'
    }
});

AppRegistry.registerComponent('App', () => App);
