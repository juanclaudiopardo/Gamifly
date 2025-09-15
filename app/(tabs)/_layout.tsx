import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#666',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#e0e0e0',
          position: 'absolute',
          bottom: 40,
          marginHorizontal: 37,
          borderRadius: 35,
          paddingBottom: 0,
        },

        tabBarLabelPosition: 'beside-icon',
      }}
    >
      <Tabs.Screen
        name='(home)'
        options={{
          title: 'Inicio',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='home' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='collection'
        options={{
          title: 'Colección',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name='product' size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name='settings'
        options={{
          title: 'Configuración',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='settings' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='love'
        options={{
          title: 'Amor',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='settings' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='user' size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
