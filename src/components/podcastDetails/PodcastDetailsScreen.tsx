import React from 'react';
import {Box, Text} from 'react-native-design-utility';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useQuery} from '@apollo/client';

import {SearchStackRouteParamList} from '../../navigators/types';
import {theme} from '../../constants/theme';
import {FearchQuery, FearchQueryVariables} from '../../types/graphql';
import feedQuery from '../../graphql/query/feedQuery';
import {getWeekDate, humanDuration} from '../../lib/dateHelpers';
import {usePlayerContext} from '../../context/PlayerContext';
import {DBContext} from '../../context/DBContext';
import {PodcastModel} from '../models/PodcastModel';

type NavigationParams = RouteProp<SearchStackRouteParamList, 'PodcastDetails'>;

export default function PodcastDetailsScreen() {
  const navigation = useNavigation();
  const {data: podcastData} = useRoute<NavigationParams>().params ?? {};
  const dbContext = React.useContext(DBContext);

  const {data, loading} = useQuery<FearchQuery, FearchQueryVariables>(
    feedQuery,
    {
      variables: {
        feedUrl: podcastData.feedUrl,
      },
    },
  );

  const playerContext = usePlayerContext();

  function subscribeFunc(podcast: PodcastModel) {
    dbContext.subToPodcast(
      new PodcastModel({
        epidsodeCount: podcast.epidsodeCount,
        artist: podcast.artist,
        feedUrl: podcast.feedUrl,
        name: podcast.name,
        thumbnail: podcast.thumbnail,
      }),
    );
  }

  return (
    <Box f={1} bg="white">
      <FlatList
        ListHeaderComponent={
          <>
            <Box dir="row" px="sm" mt="sm" mb="md">
              {podcastData.thumbnail && (
                <Box mr={10}>
                  <Image
                    source={{uri: podcastData.thumbnail}}
                    style={s.thumbnail}
                  />
                </Box>
              )}
              <Box f={1}>
                <Text size="lg" bold>
                  {podcastData.podcastName}
                </Text>
                <Text size="xs" color="grey">
                  {podcastData.artist}
                </Text>
                <TouchableOpacity onPress={() => subscribeFunc(podcastData)}>
                  <Text color="blue" size="xs">
                    Subscribe
                  </Text>
                </TouchableOpacity>
              </Box>
            </Box>
            <Box px="sm" mb="md" dir="row" align="center">
              <Box mr={10}>
                <TouchableOpacity
                  onPress={() => {
                    const el = data?.feed[0];
                    if (!el) {
                      return;
                    }
                    playerContext.play({
                      title: el.title,
                      artwork: el.image ?? podcastData.thumbnail,
                      id: el.linkUrl,
                      url: el.linkUrl,
                      artist: podcastData.artist,
                    });
                  }}>
                  <FeatherIcon
                    name="play"
                    size={30}
                    color={theme.color.blueLight}
                  />
                </TouchableOpacity>
              </Box>
              <Box f={1}>
                <Text bold>Play</Text>
                <Text size="sm">{data?.feed[0].title}</Text>
              </Box>
            </Box>
            <Box px="sm" mb="md">
              <Text bold size="lg">
                Episodes
              </Text>
            </Box>
            {loading && (
              <Box h={200} center>
                <ActivityIndicator size="large" color={theme.color.blueLight} />
              </Box>
            )}
          </>
        }
        data={data?.feed}
        ItemSeparatorComponent={() => (
          <Box w="100%" px="sm" my="sm">
            <Box style={{height: StyleSheet.hairlineWidth}} bg="greyLighter" />
          </Box>
        )}
        keyExtractor={(item) => item.linkUrl}
        renderItem={({item}) => (
          <Box px="sm">
            <Text size="xs" color="grey">
              {getWeekDate(new Date(item.pubDate)).toUpperCase()}
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EpisodeDetails', {
                  episode: item,
                  podcast: podcastData,
                })
              }>
              <Text bold>{item.title}</Text>
            </TouchableOpacity>
            <Text size="sm" color="grey" numberOfLines={2}>
              {item.summary}
            </Text>
            <Text size="sm" color="grey">
              {humanDuration(item.duration)}
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
