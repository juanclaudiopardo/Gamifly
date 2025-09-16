import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { View } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#e0e0e0',
          marginHorizontal: 37,
          marginBottom: 26,
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
          tabBarIcon: ({ size, focused }) => (
            <View
              style={{
                backgroundColor: focused ? '#0FB758' : '#F2F2F2',
                width: 60,
                height: 60,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons
                name='home'
                size={size}
                color={focused ? '#fff' : '#666'}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name='collections'
        options={{
          title: 'Colección',
          headerShown: false,
          tabBarIcon: ({ size, focused }) => (
            <View
              style={{
                backgroundColor: focused ? '#0FB758' : '#F2F2F2',
                width: 60,
                height: 60,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <AntDesign
                name='product'
                size={size}
                color={focused ? '#fff' : '#666'}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name='settings'
        options={{
          title: 'Configuración',
          headerShown: false,
          tabBarIcon: ({ size, focused }) => (
            <View
              style={{
                backgroundColor: focused ? '#0FB758' : '#F2F2F2',
                width: 60,
                height: 60,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons
                name='settings'
                size={size}
                color={focused ? '#fff' : '#666'}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name='popular'
        options={{
          title: 'Popular',
          headerShown: false,
          tabBarIcon: ({ size, focused }) => (
            <View
              style={{
                backgroundColor: focused ? '#0FB758' : '#F2F2F2',
                width: 60,
                height: 60,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons
                name='heart'
                size={size}
                color={focused ? '#fff' : '#666'}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ size, focused }) => (
            <View
              style={{
                backgroundColor: focused ? '#0FB758' : '#F2F2F2',
                width: 60,
                height: 60,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FontAwesome
                name='user'
                size={size}
                color={focused ? '#fff' : '#666'}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
