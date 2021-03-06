import React, {useState} from 'react';
import {Box, Text} from 'react-native-design-utility';
import {TextInput, FlatList} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import {useLazyQuery} from '@apollo/client';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {theme} from '../../constants/theme';
import {
  SearchQuery,
  SearchQueryVariables,
  SearchQuery_search,
} from '../../types/graphql';
import searchQuery from '../../graphql/query/searchQuery';
import SearchEmpty from './SearchEmpty';
import SearchTile from './SearchTile';
import SearchLoading from './SearchLoading';

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
        <Box
          dir="row"
          align="center"
          h={40}
          bg="greyLightest"
          radius={10}
          px="sm">
          <Box mr={10}>
            <FeatherIcon name="search" size={20} color={theme.color.grey} />
          </Box>
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
      </Box>
      {error && (
        <Box f={1} center>
          <Text color="red">{error.message}</Text>
        </Box>
      )}
      <FlatList<SearchQuery_search>
        keyboardShouldPersistTaps="never"
        contentContainerStyle={s.listContentContainer}
        ListHeaderComponent={<>{loading && <SearchLoading />}</>}
        ListEmptyComponent={<>{!loading && <SearchEmpty />}</>}
        data={data?.search ?? []}
        renderItem={({item}) => <SearchTile item={item} />}
        keyExtractor={(item) => String(item.feedUrl)}
      />
    </Box>
  );
};

const s = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: theme.text.size.md,
  },
  img: {
    flex: 1,
    borderRadius: 10,
  },
  listContentContainer: {
    paddingBottom: 90,
  },
});
export default SearchScreen;
