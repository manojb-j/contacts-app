import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import contacts from './data';
import { MaterialIcons } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';


const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  // Dummy data for demonstration purposes, replace this with your actual data source.
  const allData = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
    // Add more data here...
  ];

  const handleDeleteContact = (index) => {
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
                },
                style: 'destructive',
            },
        ]
    );
};

  const handleSearch = (query) => {
    const filteredData = contacts.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredData);
    setSearchQuery(query);
  };

  const toggleFavorite = (index) => {
    contacts[index].favorite = !contacts[index].favorite;
    console.log("**********************************************", contacts[index].favorite);
};

  const renderItem = (filteredData, rowMap) => (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      backgroundColor: 'white',
      borderColor: 'lightgray',
      borderWidth: 1,


    }}>

      <View style={{ flexDirection: 'row' }}>
        <Image source={{ uri: filteredData.item.image }} style={{ width: 50, height: 50, borderRadius: 40, marginLeft: 20 }} />
        <Text style={{ fontSize: 20, paddingHorizontal: 20, paddingVertical: 10 }}>{filteredData.item.name}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => {
            toggleFavorite(filteredData.index);
          }}
          style={{ marginRight: 10 }}
        >
          <MaterialIcons
            name={filteredData.item.favorite ? 'star' : 'star-border'}
            size={24}
            color={filteredData.item.favorite ? 'gold' : 'gray'}
          />
        </TouchableOpacity>

      </View>
    </View>
  );
  const renderHiddenItem = (filteredData, rowMap) => (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', height: '100%' }}>
      <TouchableOpacity
        onPress={() => handleDeleteContact(filteredData.index)}
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
        onPress={() => navigation.navigate('Update', { contact: filteredData.item, index: filteredData.index })}
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

  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

 

  return (
    <View>
      <TextInput
        placeholder="Search"
        value={searchQuery}
        onChangeText={(text) => handleSearch(text)}
      />
      {/* <FlatList
        data={searchResults || contacts} // Use searchResults if available, otherwise display allData
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      /> */}
      <SwipeListView
        data={searchResults || contacts}
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
        <Text style={{ fontSize: 50, fontWeight: 100 }}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      top: 60
  },
  addBtn: {
      height: 60,
      width: 60,
      backgroundColor: 'lightblue',
      fontSize: 60,
      marginTop: 60,
      marginLeft: '75%',
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center'
  },
  searchInput: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      margin: 10,
      padding: 10,
  }

});

export default SearchScreen;
