import { Tabs } from 'expo-router';
import React from 'react';

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#7f5af0',
        headerShown: false,
        tabBarStyle: { backgroundColor: 'black', borderTopWidth: 0 },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
    </Tabs>
  );
}
