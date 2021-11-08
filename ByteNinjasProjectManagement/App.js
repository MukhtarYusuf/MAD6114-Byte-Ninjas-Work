import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import ProjectsScreen from './Screens/ProjectsScreen';
import AddEditProjectScreen from './Screens/AddEditProjectScreen';
import MyTasksScreen from './Screens/MyTasksScreen';
import ProfileScreen from './Screens/ProfileScreen';
import LoginScreen from './Screens/LoginScreen';

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'darkslateblue',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerShown: false,
            }}
        >
            <Tab.Screen name="Projects" component={ProjectStackNavigator} />
            <Tab.Screen name="My Tasks" component={MyTasksScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

const ProjectStackNavigator = () => {
    return (
        <ProjectsStack.Navigator
            screenOptions={{
                headerStyle: {
                backgroundColor: 'darkslateblue',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                fontWeight: 'bold',
                },
            }}
        >
            <ProjectsStack.Screen name="My Projects" component={ProjectsScreen}/>
            <ProjectsStack.Screen name="Add Project" component={AddEditProjectScreen}/>
        </ProjectsStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();
const MainStack = createStackNavigator();
const ProjectsStack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <MainStack.Navigator
                screenOptions={{
                    headerStyle: {
                      backgroundColor: 'darkslateblue',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                    headerShown: false,
                }}>
                <MainStack.Screen name='Login Screen' 
                    component={LoginScreen}
                    options={{headerShown: true}}>
                </MainStack.Screen>
                <MainStack.Screen name='Home' 
                    component={TabNavigator}
                    options={{ headerShown: false }}>
                </MainStack.Screen>
            </MainStack.Navigator>
            <StatusBar style="auto" />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});