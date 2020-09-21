import React from 'react';
import TrackPlayer, {
  State as TrackPlayerState,
  Track,
  STATE_PLAYING,
  STATE_PAUSED,
  STATE_STOPPED,
} from 'react-native-track-player';

interface PlayerContextType {
  isPlaying: boolean;
  isPaused: boolean;
  isStopped: boolean;
  isEmpty: boolean;
  currentTrack: Track | null;
  play: (track?: Track) => void;
  pause: () => void;
  seekTo: (amount?: number) => void;
  goTo: (amount: number) => void;
}

export const PlayerContext = React.createContext<PlayerContextType>({
  isPlaying: false,
  isPaused: false,
  isStopped: false,
  isEmpty: false,
  currentTrack: null,
  play: () => null,
  pause: () => null,
  seekTo: () => null,
  goTo: () => null,
});

export const PlayerContextProvider: React.FC = (props) => {
  const [playerState, setPlayerState] = React.useState<null | TrackPlayerState>(
    null,
  );
  const [currentTrack, setCurrentTrack] = React.useState<null | Track>(null);

  React.useEffect(() => {
    const listener = TrackPlayer.addEventListener(
      'playback-state',
      ({state}: {state: TrackPlayerState}) => {
        setPlayerState(state);
      },
    );
    return () => {
      listener.remove();
    };
  }, []);

  const play = async (track?: Track) => {
    // we want to makse sure the stop the current track to play the next rtack
    await pause();
    if (!track) {
      if (currentTrack) {
        await TrackPlayer.play();
      }
      return;
    }

    if (currentTrack && track.id === currentTrack.id) {
      await TrackPlayer.play();
    }
    try {
      // check if track exists in the que
      await TrackPlayer.getTrack(track.id);
    } catch (error) {
      await TrackPlayer.add([track]);
      console.log('play -> error', error);
    } finally {
      setCurrentTrack(track);
      await TrackPlayer.skip(track.id);
      await TrackPlayer.play();
    }
  };

  const pause = async () => {
    await TrackPlayer.pause();
  };

  const seekTo = async (amount = 30) => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position + amount);
  };

  const goTo = async (amount: number) => {
    await TrackPlayer.seekTo(amount);
  };

  const value: PlayerContextType = {
    isPlaying: playerState === STATE_PLAYING,
    isPaused: playerState === STATE_PAUSED,
    isStopped: playerState === STATE_STOPPED,
    isEmpty: playerState === null,
    currentTrack,
    pause,
    play,
    seekTo,
    goTo,
  };

  return (
    <PlayerContext.Provider value={value}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => React.useContext(PlayerContext);
