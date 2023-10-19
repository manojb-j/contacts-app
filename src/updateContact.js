import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import contacts from './data'; // Import the data file

const EditContactScreen = ({ route, navigation }) => {
  const { contact, index } = route.params;

  const [name, setName] = useState(contact.name);
  const [number, setNumber] = useState(contact.number);
  const [Lnumber, setLNumber] = useState(contact.number);
  const [image, setImage] = useState(contact.image);

  const handleImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleSaveContact = () => {
    // Create an updated contact object
    const updatedContact = {
      ...contact,
      name,
      number,
      Lnumber,
      image,
    };

    // Update the contact in the 'contacts' array
    contacts[index] = updatedContact;

    // Navigate back to the "ContactListScreen"
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* <Text>Name:</Text> */}
      
      <TouchableOpacity onPress={handleImagePicker}>
        {/* <Text>Select Image</Text>
      {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />} */}
      {image ? (
                    <Image source={{ uri: image }} style={{ width: 180, height: 180, borderRadius: 90 }} />
                ) : (
                    <Image
                        source={require('./im.jpg')}
                        style={{ width: 180, height: 180, borderRadius: 90 }}
                    />
                )}
      </TouchableOpacity>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter name"
        style={styles.name}
      />
      {/* <Text>Number:</Text> */}
      <TextInput
        value={number}
        onChangeText={setNumber}
        keyboardType='numeric'
        maxLength={10}
        placeholder="Enter number"
        style={styles.number}
      />
      <TextInput
        value={Lnumber}
        onChangeText={setLNumber}
        keyboardType='numeric'
        maxLength={10}
        placeholder="Enter landline number"
        style={styles.number}
      />
      <TouchableOpacity onPress={handleSaveContact} style={styles.saveBtn}>
        <Text>Update</Text>
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
    name: {
        height: 50,
        width: '70%',
        borderColor: 'gray',
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 6,
        marginTop: 60,
        paddingHorizontal: 8,
    },
    number: {
        height: 50,
        width: '70%',
        borderColor: 'gray',
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 6,
        marginTop: 6,
        paddingHorizontal: 8,
    },
    saveBtn: {
        height: 50,
        width: "50%",
        backgroundColor: "skyblue",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        borderRadius: 10
    },

});

export default EditContactScreen;
