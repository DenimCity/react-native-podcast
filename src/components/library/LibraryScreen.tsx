import React from 'react';
import {Box, Text} from 'react-native-design-utility';
import {DBContext} from '../../context/DBContext';

const LibraryScreen = () => {
  const dbContext = React.useContext(DBContext);
  return (
    <Box f={1}>
      {dbContext.podcasts.map((podcast) => {
        console.log('LibraryScreen -> podcast', podcast.name);
        return (
          <Box
            key={`${podcast.artist}-${Math.random()}`}
            bg="white"
            mb="md"
            p="sm">
            <Text>{podcast.artist}</Text>
          </Box>
        );
      })}
    </Box>
  );
};

export default LibraryScreen;
