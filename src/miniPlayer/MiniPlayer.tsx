import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Box, Text} from 'react-native-design-utility';
import Icon from 'react-native-vector-icons/Feather';

import {usePlayerContext} from '../context/PlayerContext';
import {theme} from '../constants/theme';
import {Image} from 'react-native';

const MiniPlayer = () => {
  const playerContext = usePlayerContext();

  if (playerContext.isEmpty || !playerContext.currentTrack) {
    return null;
  }
  return (
    <Box
      h={75}
      bg="white"
      px="sm"
      style={{borderTopWidth: 1, borderTopColor: theme.color.greyLightest}}>
      <Box f={1} dir="row" align="center" justify="between">
        <Box
          h={50}
          w={50}
          bg="blueLight"
          radius={10}
          mr={10}
          style={{overflow: 'hidden'}}>
          <Image
            source={{uri: playerContext.currentTrack.artwork}}
            style={{flex: 1}}
          />
        </Box>
        <Box f={1} mr={20}>
          <Text numberOfLines={1}>{playerContext.currentTrack.title}</Text>
        </Box>
        <Box mr={10}>
          {playerContext.isPaused && (
            <Box>
              <TouchableOpacity onPress={() => playerContext.play()}>
                <Icon name="play" size={30} />
              </TouchableOpacity>
            </Box>
          )}
          {playerContext.isPlaying && (
            <Box>
              <TouchableOpacity onPress={() => playerContext.pause()}>
                <Icon name="pause" size={30} />
              </TouchableOpacity>
            </Box>
          )}
          {playerContext.isStopped && (
            <Box>
              <TouchableOpacity onPress={() => null}>
                <Icon name="square" size={30} />
              </TouchableOpacity>
            </Box>
          )}
        </Box>
        <Box>
          <TouchableOpacity>
            <Icon
              size={30}
              name="rotate-cw"
              onPress={() => playerContext.seekTo()}
            />
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
};

export default MiniPlayer;
