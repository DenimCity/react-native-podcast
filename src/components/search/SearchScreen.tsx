import React, {useState} from 'react';
import {Box, Text} from 'react-native-design-utility';
import {TextInput, FlatList} from 'react-native-gesture-handler';
import {StyleSheet, Image, ActivityIndicator} from 'react-native';
import {useLazyQuery} from '@apollo/client';

import {theme} from '../../constants/theme';
import {
  SearchQuery,
  SearchQueryVariables,
  SearchQuery_search,
} from '../../types/graphql';
import searchQuery from '../../graphql/query/searchQuery';

const SearchScreen = () => {
  const [term, setTerm] = useState<string>('');
  const [search, {data, loading, error}] = useLazyQuery<
    SearchQuery,
    SearchQueryVariables
  >(searchQuery);

  const onSearch = async () => {
    try {
      await search({
        variables: {
          term,
        },
      });
    } catch (error) {
      console.log('onSearch -> error', error);
    }
  };

  return (
    <Box f={1} bg="white">
      <Box h={50} w="100%" px="sm" mt="sm" mb="sm">
        <TextInput
          style={s.input}
          placeholder="Search Podcast"
          selectionColor={theme.color.blueLight}
          onChangeText={setTerm}
          autoCorrect={false}
          onSubmitEditing={onSearch}
          value={term}
        />
      </Box>
      <FlatList<SearchQuery_search>
        keyboardShouldPersistTaps="never"
        contentContainerStyle={s.listContentContainer}
        ListHeaderComponent={
          <>
            {loading && (
              <Box f={1} center h={300}>
                <ActivityIndicator size="large" color={theme.color.blueLight} />
              </Box>
            )}
          </>
        }
        ListEmptyComponent={
          <>
            {!loading && (
              <Box f={1} center>
                <Text color="grey">No podcasts, please search</Text>
              </Box>
            )}
          </>
        }
        data={data?.search ?? []}
        renderItem={({item}) => (
          <Box h={90} dir="row" align="center" px="sm">
            <Box h={70} w={70} bg="blueLight" radius={10} mr={10}>
              {item.thumbnail && (
                <Image source={{uri: item.thumbnail}} style={s.img} />
              )}
            </Box>
            <Box f={1}>
              <Text bold numberOfLines={1}>
                {' '}
                {item.podcastName}
              </Text>
              <Text size="xs" color="grey">
                {item.artist}
              </Text>
              <Text size="xs" color="blueLight">
                {item.episodesCount}
              </Text>
            </Box>
          </Box>
        )}
        keyExtractor={(item) => String(item.feedUrl)}
      />
    </Box>
  );
};

const s = StyleSheet.create({
  input: {
    height: 40,
    flex: 1,
    backgroundColor: theme.color.greyLightest,
    borderRadius: 10,
    paddingHorizontal: theme.space.sm,
    fontSize: theme.text.size.md,
  },
  img: {
    flex: 1,
    borderRadius: 10,
  },
  listContentContainer: {
    minHeight: '100%',
    paddingBottom: 90,
  },
});
export default SearchScreen;
