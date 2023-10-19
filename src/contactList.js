import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Image, StyleSheet, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import contacts from './data';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useFocusEffect } from '@react-navigation/native';

const ContactListScreen = ({ navigation }) => {
    const [data, setData] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(null);

    const [refresh, setRefresh] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const getData = () => contacts;

    console.log("contacts", getData());

    const handleSearch = (query) => {
        const filteredData = contacts.filter((item) =>
            item.name.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filteredData);
        setSearchQuery(query);
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    );

    const fetchData = () => {
        const result = contacts;
        setData(result);
        console.log("contacts data ---------------------------------------", contacts)
        setRefresh(!refresh);
    };
    const handleDeleteContact = (index) => {
        console.log("delete id ++++++++++++++++++++++++++++++++++++++++++++++++++++++", index);
        Alert.alert(
            'Delete Contact',
            'Are you sure you want to delete this contact?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        contacts.splice(index, 1);
                        setRefresh(!refresh);
                    },
                    style: 'destructive',
                },
            ]
        );
        setRefresh(!refresh);
    };

    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
        setRefresh(!refresh);
    };

    const toggleFavorite = (index) => {
        contacts[index].favorite = !contacts[index].favorite;
        setRefresh(!refresh);
        console.log("**********************************************", contacts[index].favorite);
    };



    console.log("data data dtad", data)
    // console.log("set data", setData)

    // useEffect(() => {
    //     const fetchData = () => {
    //         const result = getData();
    //         setData(result);
    //         console.log("result data ---------------------------------------",result)
    //     };
    //     fetchData();
    //     setRefresh(true);
    // }, [refresh]);




    const renderItem = (data, rowMap) => (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
            backgroundColor: 'white',
            borderColor: 'lightgray',
            borderWidth: 0,


        }}>


            <View style={{ flexDirection: 'row' }}>
                <Image source={{ uri: data.item.image }} style={{ width: 50, height: 50, borderRadius: 40, marginLeft: 20 }} />
                <Text style={{ fontSize: 20, paddingHorizontal: 20, paddingVertical: 10 }}>{data.item.name}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    onPress={() => {
                        toggleFavorite(data.index);
                    }}
                    style={{ marginRight: 10 }}
                >
                    <MaterialIcons
                        name={data.item.favorite ? 'star' : 'star-border'}
                        size={24}
                        color={data.item.favorite ? 'gold' : 'gray'}
                    />
                </TouchableOpacity>

            </View>
        </View>
    );

    const renderHiddenItem = (data, rowMap) => (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', height: '100%' }}>
            <TouchableOpacity
                onPress={() => handleDeleteContact(data.index)}

                style={{
                    backgroundColor: 'red',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 75,
                    height: '100%',
                }}
            >
                <Text style={{ color: 'white' }}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Update', { contact: data.item, index: data.index })}
                style={{
                    backgroundColor: 'green',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 75,
                    height: '100%',
                    
                }}
            >
                <Text style={{ color: 'white' }}>Edit</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search.."
                value={searchQuery}
                onChangeText={(text) => handleSearch(text)}
                style={styles.searchInput}
            />
            <SwipeListView
                data={searchResults || data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                // leftOpenValue={95}
                rightOpenValue={-150}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowDidOpen={onRowDidOpen}
            />
            <TouchableOpacity
                onPress={() => navigation.navigate('Add')}
                style={styles.addBtn}
            >
                <MaterialIcons
                name='add'
                size={35}
                color={'black'}
                />
            </TouchableOpacity>
            {/* <TouchableOpacity
                onPress={() => navigation.navigate('search')}
                style={styles.addBtn}
            >
                <Text style={{ fontSize: 50, fontWeight: 100 }}>search</Text>
            </TouchableOpacity> */}
        </View>
    );

};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    addBtn: {
        flex:1,
        position: 'absolute',
        bottom: 50,
        right: 40,
        backgroundColor: 'skyblue',
        padding: 10,
        borderRadius: 25,
        height:70,
        width: 70,
        alignItems:'center',
        justifyContent:'center'
    },
    searchInput: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        padding: 10,
        borderRadius:15
    }

});

export default ContactListScreen;
