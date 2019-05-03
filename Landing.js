import React, {Component} from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet
} from 'react-native';

import Header from './header';

import PlayList from './playlist';

import img from './imgs';

import {TOGETHER} from './footer';

class Landing extends React.Component {

    state = {
        playlists: this.generatePlaylists(img, 5)
    };

    title = ['Choose your preference', 'Recently Played', 'Inspired by your Recent Listening', 'New Music Friday!'];

    generatePlaylists(array, size) {
        let results = [];
        while (array.length) {
            results.push(array.splice(0, size));
        }
        console.log(results);
        return results;
    }

    renderPlaylists() {
        return this.state.playlists.map((playlist, i) => {
            if(i == 1) return <PlayList title={this.title[i]} items={playlist} key={i} circle/>
            return (
                <PlayList title={this.title[i]} items={playlist} key={i}/>
            )
        })

    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.sv}>
                    {this.renderPlaylists()}
                </ScrollView>
                {/*for the gap*/}
                <View style={{height: TOGETHER}}/>
                <Header name='HOME'/>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    sv: {
        paddingTop: 72,
    }
});