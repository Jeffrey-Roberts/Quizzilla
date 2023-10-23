import { MaterialCommunityIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
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
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="home"
              size={28}
              style={{ marginBottom: -3 }}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="flash-cards"
        options={{
          title: 'Flash Cards',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="cards"
              size={28}
              style={{ marginBottom: -3 }}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
