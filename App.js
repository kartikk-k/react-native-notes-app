import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import Folder from './screens/Folder';
import Home from './screens/Home';
import Note from './screens/Note';
import NewFolder from './screens/NewFolder';

import Login from './screens/Login';
import Register from './screens/Register';

import { AuthProvider } from './context/AuthContext';
import NotesContext, { NotesProvider } from './context/NotesContext';


export default function App() {
  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <AuthProvider>
        <NotesProvider>
          <Stack.Navigator>
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Folder' component={Folder} />
            <Stack.Screen name='Note' component={Note} />
            <Stack.Screen name='NewFolder' component={NewFolder} options={{ presentation: 'modal', headerShown: false, }} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Register' component={Register} />
          </Stack.Navigator>
        </NotesProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
