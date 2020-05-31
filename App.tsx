import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState<number | null>();
  const [guessRounds, setGuessRounds] = useState(0);

  const startGameHandler = (selectedNumber: number) => {
    setUserNumber(selectedNumber)
  }

  const gameOverHandler = (numOfRounds: number) => {
    setGuessRounds(numOfRounds);
  }

  const configNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  }

  let content = <StartGameScreen onStartGame={startGameHandler} />

  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  } else if (guessRounds > 0) {
    content = <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onRestart={configNewGameHandler} />
  }

  return (
    <View style={styles.screen}>
      <Header title="Try your luck with Numbers ;)" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});