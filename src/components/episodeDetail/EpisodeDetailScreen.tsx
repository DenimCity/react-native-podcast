import {useRoute} from '@react-navigation/native';
import React from 'react';
import {Image} from 'react-native';
import {Box, Text} from 'react-native-design-utility';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

import {FearchQuery_feed, searchQuery_search} from '../../types/graphql';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {theme} from '../../constants/theme';
import {humanDuration} from '../../lib/dateHelpers';
import {usePlayerContext} from '../../context/PlayerContext';
import HtmlReader from '../HtmlReader';

const EpisodeDetailScreen = () => {
  const routeParams = (useRoute().params ?? {}) as {
    episode: FearchQuery_feed;
    podcast: searchQuery_search;
  };
  const playerContext = usePlayerContext();

  return (
    <Box bg="white" f={1}>
      <ScrollView>
        <Box px="sm" mt="sm">
          <Box dir="row" mb="sm">
            <Box h={60} w={60} radius={10} style={{overflow: 'hidden'}} mr={10}>
              <Image
                style={{flex: 1}}
                source={{
                  uri:
                    routeParams.episode.image ?? routeParams.podcast.thumbnail,
                }}
              />
            </Box>
            <Box w={50} f={1}>
              <Text weight="bold" size="sm">
                {routeParams.episode.title}
              </Text>
            </Box>
          </Box>
          <Box dir="row" align="center" mb="sm">
            <TouchableOpacity
              onPress={() => {
                playerContext.play({
                  title: routeParams.episode.title,
                  artwork:
                    routeParams.episode.image ?? routeParams.podcast.thumbnail,
                  id: routeParams.episode.linkUrl,
                  url: routeParams.episode.linkUrl,
                  artist: routeParams.podcast.artist,
                });
              }}>
              <FeatherIcon
                name="play"
                size={30}
                color={theme.color.blueLight}
              />
            </TouchableOpacity>
            <Box>
              <Text weight="bold" size="sm">
                Play
              </Text>
              <Text color="grey" size="sm">
                {humanDuration(routeParams.episode.duration)}
              </Text>
            </Box>
          </Box>

          <Box bg="greyLightest" h={1} mb="sm" />

          <Box>
            <Text size="xl" weight="bold">
              Episode Notes
            </Text>
            <HtmlReader html={routeParams.episode.description} />
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default EpisodeDetailScreen;
