import { Stack } from 'expo-router';

export default function Page() {
  return (
    <Stack>
      <Stack.Screen name={'(tabs)'} options={{ headerShown: false }} />
    </Stack>
  );
}
