import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, ScrollView, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import { guessDirections } from '../constants/guessDirections';
import defaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';

interface IOwnProps {
  userChoice: number;
  onGameOver(numOfRounds: number): void;
}

const genRandomBetween: any = (min: number, max: number, exclude: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return genRandomBetween(min, max, exclude);
  } else {
    return rndNum
  }
}

const renderListItem = (listLength: number, itemData: any) => (
  <View style={styles.listItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <Text>{itemData.item}</Text>
  </View>
)

const GameScreen = (props: IOwnProps) => {
  const initGuess = genRandomBetween(1, 100, props.userChoice);

  const [currentGuess, setCurrentGuess] = useState(initGuess);
  const [rounds, setRounds] = useState(0);
  const [passGuesses, setPassGuesses] = useState<any[]>([initGuess.toString()]);


  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      onGameOver(passGuesses.length)
    }
  }, [currentGuess, userChoice, onGameOver])

  const nextGuessHandler = (direction: string) => {
    if (
      direction === guessDirections.lower && currentGuess < props.userChoice ||
      direction === guessDirections.higher && currentGuess > props.userChoice
    ) {
      Alert.alert(
        `Don't lie!`,
        `You know that this is wrong...`,
        [{ text: 'Sorry!', style: 'cancel' }]
      );
      return;
    } else if (direction === guessDirections.lower) {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = genRandomBetween(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    // setRounds(curRounds => curRounds + 1);
    setPassGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses]);
  };

  return (
    <View style={styles.screen}>
      <Text style={defaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={() => { nextGuessHandler('lower') }} >
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={() => { nextGuessHandler('higher') }} >
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView>
          {passGuesses.map((guess, index) =>
            renderListItem(guess, passGuesses.length - index)
          )}
        </ScrollView> */}
        <FlatList
          keyExtractor={(item) => item}
          data={passGuesses}
          renderItem={(items) => renderListItem(passGuesses.length, items)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height === 600 ? 20 : 5,
    width: 400,
    maxWidth: '90%',
  },
  listContainer: {
    flex: 1,
    width: '60%',
  },
  list: {
    flexGrow: 1,
    // alignItems: 'center',
    justifyContent: 'flex-end'
  },
  listItem: {
    borderColor: 'black',
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
})

export default GameScreen