import 'react-native-gesture-handler';
import React from 'react';
import {UtilityThemeProvider, Box} from 'react-native-design-utility';
import {NavigationContainer} from '@react-navigation/native';
import {ApolloProvider} from '@apollo/client';
import TrackPlayer from 'react-native-track-player';
import {ActivityIndicator} from 'react-native';

import {theme} from './src/constants/theme';
import MainStackNavigator from './src/navigators/MainStackNavigator';
import client from './src/graphql/client';
import {PlayerContextProvider} from './src/context/PlayerContext';
import {DBProvider} from './src/context/DBContext';

const App = () => {
  const [isReady, setIsReady] = React.useState<boolean>(false);

  React.useEffect(() => {
    TrackPlayer.setupPlayer().then(() => {
      console.log('player is setup');
      TrackPlayer.updateOptions({
        capabilities: [
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_STOP,
          TrackPlayer.CAPABILITY_JUMP_FORWARD,
          TrackPlayer.CAPABILITY_JUMP_BACKWARD,
        ],
        jumpInterval: 30,
      });
      setIsReady(true);
    });
  }, []);
  return (
    <UtilityThemeProvider theme={theme}>
      <DBProvider>
        <ApolloProvider client={client}>
          {isReady ? (
            <PlayerContextProvider>
              <NavigationContainer>
                <MainStackNavigator />
              </NavigationContainer>
            </PlayerContextProvider>
          ) : (
            <Box f={1} center>
              <ActivityIndicator />
            </Box>
          )}
        </ApolloProvider>
      </DBProvider>
    </UtilityThemeProvider>
  );
};

export default App;
