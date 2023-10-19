import React, { useState } from 'react';
import { View, Text, FlatList, Button, Image } from 'react-native';
import contacts from './data';
import { useFocusEffect } from '@react-navigation/native';

const Favorite = () => {
    const [favorites, setfavorites] = useState(null);
  
    useFocusEffect(
        React.useCallback(() => {
            fliterFav();
        }, [])
        );
        
        const fliterFav = () => {
            const favorites = contacts.filter((contacts) => contacts.favorite);
            setfavorites(favorites);
        };
  return (
    <View>
      <FlatList
        data={favorites}
        keyExtractor={(item,index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            {/* <Text>{item.name}</Text>
            <Text>Favorite: {item.favorite ? 'Yes' : 'No'}</Text> */}
            <View style={{ flexDirection: 'row', marginTop:15 }}>
                <Image source={{ uri: item.image }} style={{ width: 50, height: 50, borderRadius: 40, marginLeft: 20 }} />
                <Text style={{ fontSize: 20, paddingHorizontal: 20, paddingVertical: 10 }}>{item.name}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Favorite;
