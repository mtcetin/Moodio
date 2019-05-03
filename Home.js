import React, { Component } from 'react'
import { Text, Dimensions, View, Navigator, Button, StyleSheet } from 'react-native'

import Landing from './Landing';
import Browse from './Browse';
import Footer from './footer';
import TabBarNavigation from './tab-bar-navigation';

var ROUTES = {
    landing: Landing,
    browser: Browse
};

class Home extends React.Component{

    constructor(props)
    {
        super(props);
        this.state = {accessToken:this.props.navigation.state.params.data.response.access_token};
        this.handleLogout = this.handleLogout.bind(this);
        this.openCameraScreen = this.openCameraScreen.bind(this);
        this.openAudioScreen = this.openAudioScreen.bind(this);
    }

    componentDidMount(){
        this.setState({accessToken:this.props.navigation.state.params.data.response.access_token});
        console.log(this.state.accessToken);
        fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: {
                'Accept':'application/json',
                'Authorization': 'Bearer ' + this.state.accessToken
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState(responseJson);
        })
        .catch((error) =>{
            console.error(error);
        });

        fetch('https://api.spotify.com/v1/recommendations?' + 
        'seed_genres=sad', {
            method: 'GET',
            headers: {
                'Accept':'application/json',
                'Authorization': 'Bearer ' + this.state.accessToken
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({playlist:responseJson.tracks.map(track => track.name)});
        })
        .catch((error) =>{
            console.error(error);
        });

    }
    
    configureScene(route) {
        if (route.sceneConfig) {
            return route.sceneConfig;
        }
        return {
            ...CustomNavigatorSceneConfigs.FloatFromRight,
            gestures: {}
        };
    }
    //new
    renderScene(route, navigator) {
        var Component = ROUTES[route.name];

        return <Component route={route} navigator={navigator}/>
    }

    handleLogout(event) {
        
        this.props.navigation.navigate('LoginScreen');

        event.preventDefault();
    }

    openCameraScreen(event){
        this.props.navigation.navigate('CameraScreen');

        event.preventDefault();
    }
    
    openAudioScreen(event){
        this.props.navigation.navigate('AudioScreen');

        event.preventDefault();
    }

    render()
    {
        return (
            <View style={styles.container}>
                <Navigator
                    initialRoute={{name: 'landing'}}
                    renderScene={this.renderScene}
                    configureScene={(route) => ({ ... Navigator.SceneConfigs.VerticalDownSwipeJump, gestures: false })}
                    style={styles.container}
                />
                <Footer ref='footer'
                        hide={() => this.refs.tab.hide()}
                        show={() => this.refs.tab.show()}
                        hideTabBarNavigation={(v) => this.refs.tab.setHeight(v)}/>
                <TabBarNavigation ref='tab'/>
            </View>
        )
    }

}
var styles = StyleSheet.create({
    container: {
        flex: 1
    }
});