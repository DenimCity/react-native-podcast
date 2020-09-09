import React from 'react';
import {Box, Text} from 'react-native-design-utility';
import {SearchQuery_search} from '../../types/graphql';
import {Image, StyleSheet} from 'react-native';

const SearchTile: React.FC<{item: SearchQuery_search}> = (props) => {
  return (
    <Box h={90} dir="row" align="center" px="sm">
      <Box h={70} w={70} bg="blueLight" radius={10} mr={10}>
        {props.item.thumbnail && (
          <Image source={{uri: props.item.thumbnail}} style={s.img} />
        )}
      </Box>
      <Box f={1}>
        <Text bold numberOfLines={1}>
          {' '}
          {props.item.podcastName}
        </Text>
        <Text size="xs" color="grey">
          {props.item.artist}
        </Text>
        <Text size="xs" color="blueLight">
          {props.item.episodesCount}
        </Text>
      </Box>
    </Box>
  );
};

const s = StyleSheet.create({
  img: {
    flex: 1,
    borderRadius: 10,
  },
});
export default SearchTile;
