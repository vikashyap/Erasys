import { StatusBar } from 'react-native';

import { AppProviders } from './src/providers';
import { GalleryScreen } from './src/screens/gallery-screen';

export default function App() {
  return (
    <AppProviders>
      <StatusBar barStyle="light-content" />
      <GalleryScreen />
    </AppProviders>
  );
}
