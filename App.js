import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AddContactScreen from './src/addContact';
import EditContactScreen from './src/updateContact';
import ContactListScreen from './src/contactList';
import SearchScreen from './src/search';
import ContactScreen from './animAdd';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Favorite from './src/favorite';
import Routes from './src/Navigation/Routes';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
       <Stack.Navigator>
         <Stack.Screen name="List" component={Routes}
         options={{ 
           title:'Contact List',
           headerTitleAlign: 'center',
           headerTintColor: 'black',
           headerStyle: {
             backgroundColor: 'skyblue', 
            },

          }} />
        <Stack.Screen name="Add" component={AddContactScreen} options={{ title: 'Add new contact' }} />
        <Stack.Screen name="Update" component={EditContactScreen} options={{ title: 'update conatct' }} />
          <Stack.Screen name="search" component={SearchScreen} options={{ title: 'search' }} />
          <Stack.Screen name="ani" component={ContactScreen} options={{
             title: 'Animation', 
             headerShown: false
             }} />
      </Stack.Navigator>
   
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
