import { Stack } from 'expo-router';

export default function CollectionsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name='index'
        options={{
          title: 'Colecciones',
          headerShown: false,
        }}
      />
    </Stack>
  );
}