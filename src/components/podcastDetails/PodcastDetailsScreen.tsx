import React from 'react';
import {Box, Text} from 'react-native-design-utility';

import {SearchStackRouteParamList} from '../../navigators/types';
import {RouteProp, useRoute} from '@react-navigation/native';
import {FlatList, Image, StyleSheet} from 'react-native';

type NavigationParams = RouteProp<SearchStackRouteParamList, 'PodcastDetails'>;

export default function PodcastDetailsScreen() {
  const {data} = useRoute<NavigationParams>().params ?? {};
  return (
    <Box f={1} bg="white">
      <FlatList
        ListHeaderComponent={
          <>
            <Box dir="row" px="sm" mt="sm" mb="md">
              {data.thumbnail && (
                <Box mr={10}>
                  <Image source={{uri: data.thumbnail}} style={s.thumbnail} />
                </Box>
              )}
              <Box f={1}>
                <Text size="lg" bold>
                  {data.podcastName}
                </Text>
                <Text size="xs" color="grey">
                  {data.artist}
                </Text>
                <Text color="blue" size="xs">
                  Subscribe
                </Text>
              </Box>
            </Box>
            <Box px="sm" mb="md">
              <Text>Play last Episode</Text>
            </Box>
            <Box px="sm" mb="md">
              <Text bold size="lg">
                Episodes
              </Text>
            </Box>
          </>
        }
        data={[{id: '1'}, {id: '2'}]}
        ItemSeparatorComponent={() => (
          <Box w="100%" px="sm" my="sm">
            <Box style={{height: StyleSheet.hairlineWidth}} bg="greyLighter" />
          </Box>
        )}
        keyExtractor={(item) => item.id}
        renderItem={() => (
          <Box px="sm">
            <Text size="small">Friday</Text>
            <Text bold>#400 - The Title</Text>
            <Text size="sm" color="grey" numberOfLines={2}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
            <Text size="sm" color="grey">
              3hrs. 13min
            </Text>
          </Box>
        )}
      />
    </Box>
  );
}

const s = StyleSheet.create({
  thumbnail: {
    height: 100,
    width: 100,
  },
});
