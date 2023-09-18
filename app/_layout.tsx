import { Stack } from 'expo-router';

import { QuizzillaCProvider } from '../src/modules/QuizzillaContext';

export default function Page() {
  return (
    <QuizzillaCProvider>
      <Stack>
        <Stack.Screen name={'(tabs)'} options={{ headerShown: false }} />
      </Stack>
    </QuizzillaCProvider>
  );
}
