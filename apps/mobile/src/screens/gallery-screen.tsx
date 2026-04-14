import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import type { ListRenderItem } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { UserPicture } from '@erasys/pictures';

import { useGalleryPictures } from '../hooks/use-gallery-pictures';

const gap = 12;

export const GalleryScreen = () => {
  const galleryQuery = useGalleryPictures();

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>React Native</Text>
        <Text style={styles.title}>Mobile gallery</Text>
        <Text style={styles.description}>
          A simple Expo screen using the same shared picture module and React Query cache.
        </Text>
      </View>

      {galleryQuery.isPending ? (
        <View style={styles.centered}>
          <ActivityIndicator color="#5eead4" />
          <Text style={styles.muted}>Loading gallery...</Text>
        </View>
      ) : null}

      {galleryQuery.isError ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>We could not load the gallery right now.</Text>
        </View>
      ) : null}

      {galleryQuery.isSuccess ? (
        <FlatList
          data={galleryQuery.data}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          initialNumToRender={6}
          maxToRenderPerBatch={8}
          removeClippedSubviews
          renderItem={renderPicture}
          windowSize={5}
        />
      ) : null}
    </SafeAreaView>
  );
};

const renderPicture: ListRenderItem<UserPicture> = ({ item }) => (
  <View style={styles.card}>
    <Image
      source={{ uri: item.src }}
      accessibilityLabel={item.alt}
      resizeMode="cover"
      style={styles.image}
    />
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    gap: 8,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  eyebrow: {
    color: '#5eead4',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  title: {
    color: '#f8fafc',
    fontSize: 32,
    fontWeight: '800',
  },
  description: {
    color: '#cbd5e1',
    fontSize: 15,
    lineHeight: 22,
  },
  centered: {
    alignItems: 'center',
    gap: 12,
    padding: 24,
  },
  muted: {
    color: '#cbd5e1',
  },
  errorBox: {
    margin: 20,
    borderRadius: 18,
    backgroundColor: '#7f1d1d',
    padding: 16,
  },
  errorText: {
    color: '#fee2e2',
    fontWeight: '600',
  },
  list: {
    gap,
    padding: 20,
    paddingTop: 8,
  },
  row: {
    gap,
  },
  card: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 22,
    backgroundColor: '#1e293b',
  },
  image: {
    aspectRatio: 4 / 5,
    width: '100%',
  },
});
