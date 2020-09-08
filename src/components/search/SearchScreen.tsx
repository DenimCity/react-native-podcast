import React from 'react';
import {Box} from 'react-native-design-utility';
import {TextInput} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

import {theme} from '../../constants/theme';

import KeyBoardDissmissView from '../KeyboardDismissView';

const SearchScreen = () => {
  return (
    <KeyBoardDissmissView>
      <Box f={1} bg="white">
        <Box h={50} w="100%" px="sm" mt="sm">
          <TextInput
            style={s.input}
            placeholder="Search Podcast"
            selectionColor={theme.color.blueLight}
          />
        </Box>
      </Box>
    </KeyBoardDissmissView>
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
});
export default SearchScreen;
