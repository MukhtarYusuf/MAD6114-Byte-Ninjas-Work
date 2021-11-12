import { StatusBar } from 'expo-status-bar';
import React, {useState, useLayoutEffect, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, FlatList, Button, Image } from 'react-native';

import palette from 'google-material-color-palette-json';

import CustomActivityIndicator from '../Components/CustomActivityIndicator';
import ProjectListItem from '../Components/ProjectListItem';
import { getAllProjects } from '../Helpers/ProjecstHelper';

export default function ProjectsScreen({navigation}) {
    navigation.options = () => {
        return {
            headerRight: () => (
                <Button title='Add'/>
            ),
        };
    };
    let isFirstLoad = useRef(true);
    const [isLoading, setIsLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    // const [projects, setProjects] = useState([
    //     {
    //         "id": 1,
    //         "name": "Electronics Store Project",
    //         "memberCount": 3,
    //         "taskCount": 8,
    //         "status": "In Progress"
    //     },
    //     {
    //         "id": 2,
    //         "name": "Testing Project",
    //         "memberCount": 4,
    //         "taskCount": 7,
    //         "status": "In Progress"
    //     },
    //     {
    //         "id": 3,
    //         "name": "Byte Project",
    //         "memberCount": 3,
    //         "taskCount": 10,
    //         "status": "In Progress"
    //     },
    //     {
    //         "id": 4,
    //         "name": "Bug Fixes",
    //         "memberCount": 5,
    //         "taskCount": 20,
    //         "status": "In Progress"
    //     },
    //     {
    //         "id": 5,
    //         "name": "Testing Project",
    //         "memberCount": 4,
    //         "taskCount": 7,
    //         "status": "In Progress"
    //     },
    //     {
    //         "id": 6,
    //         "name": "Testing Project 3",
    //         "memberCount": 3,
    //         "taskCount": 6,
    //         "status": "In Progress"
    //     },
    //     {
    //         "id": 7,
    //         "name": "E-Commerce Project",
    //         "memberCount": 5,
    //         "taskCount": 9,
    //         "status": "In Progress"
    //     },
    //     {
    //         "id": 8,
    //         "name": "IOT Project",
    //         "memberCount": 3,
    //         "taskCount": 10,
    //         "status": "In Progress"
    //     },
    //     {
    //         "id": 9,
    //         "name": "Meta Project",
    //         "memberCount": 4,
    //         "taskCount": 20,
    //         "status": "In Progress"
    //     },
    //     {
    //         "id": 10,
    //         "name": "Testing Project 3",
    //         "memberCount": 4,
    //         "taskCount": 15,
    //         "status": "In Progress"
    //     },
    // ]);

    const navigateToAddEditScreen = (projectId = '') => {
        navigation.navigate('Add Project', { "projectId": projectId });
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button title='Add' color='#fff' onPress={() => navigateToAddEditScreen()}/>
                // <Image source={require('../assets/byte-ninja.png')} style={{width: 20, height: 20, marginRight: 5,}}></Image>
            ),
        });
    }, [navigation]);

    useEffect(() => {
        setIsLoading(true);

        let unsubScribe = getAllProjects((projects) => {
            setIsLoading(false);

            let localProjects = projects.concat([]);
            setProjects(localProjects);
        });

        // Unsubscribe when component will unmount to prevent memory leak
        return () => { unsubScribe() };
    }, []);

    return (
            <View style={styles.container}>
                { isLoading && <CustomActivityIndicator /> }
                { 
                    (projects.length === 0) &&
                    <Text style={styles.emptyText}>You Don't have any Projects. Tap 'Add' to add Projects.</Text>
                }
                {
                    (projects.length !== 0) &&
                    <FlatList
                        style={styles.flatList}
                        data={projects} 
                        renderItem={({item}) => <ProjectListItem project={item} onPress={() => navigateToAddEditScreen(item.id)}/>}
                    />
                }
                <StatusBar style="auto" />
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    flatList: {
        width: '100%',
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '500',
        paddingTop: 15, 
        paddingBottom: 10,
        paddingLeft: 10, 
        paddingRight: 10,
        marginTop: 10,
        color: palette.grey.shade_800,
    },
});