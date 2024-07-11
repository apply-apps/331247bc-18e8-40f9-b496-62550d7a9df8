// Filename: index.js
// Combined code from all files

import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Dimensions, Button, Text } from 'react-native';

const Snake = ({ snakeDots, blockSize }) => {
  return (
    <>
      {snakeDots.map((dot, index) => (
        <View key={index} style={{
          width: blockSize,
          height: blockSize,
          backgroundColor: 'green',
          position: 'absolute',
          left: dot[0] * blockSize,
          top: dot[1] * blockSize
        }} />
      ))}
    </>
  );
};

const Food = ({ position, blockSize }) => {
  return (
    <View style={{
      width: blockSize,
      height: blockSize,
      backgroundColor: 'red',
      position: 'absolute',
      left: position[0] * blockSize,
      top: position[1] * blockSize
    }} />
  );
};

const App = () => {
  const [snakeDots, setSnakeDots] = useState([[0, 0], [1, 0]]);
  const [food, setFood] = useState([6, 6]);
  const [direction, setDirection] = useState('RIGHT');
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameInterval, setGameInterval] = useState(null);

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const blockSize = 20;

  useEffect(() => {
    if (!gameInterval) {
      setGameInterval(setInterval(moveSnake, 200));
    }
    return () => clearInterval(gameInterval);
  }, [snakeDots, direction, food]);

  const moveSnake = () => {
    let dots = [...snakeDots];
    let head = dots[dots.length - 1];

    switch (direction) {
      case 'RIGHT':
        head = [head[0] + 1, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 1, head[1]];
        break;
      case 'UP':
        head = [head[0], head[1] - 1];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 1];
        break;
    }

    dots.push(head);
    dots.shift();

    if (detectCollision(head, dots)) {
      gameOver();
      return;
    }

    if (isFoodEaten(head)) {
      dots = [...snakeDots, head];
      generateFood();
    }

    setSnakeDots(dots);
  };

  const detectCollision = (head, dots) => {
    for (let i = 0; i < dots.length - 1; i++) {
      if (head[0] === dots[i][0] && head[1] === dots[i][1]) {
        return true;
      }
    }

    if (head[0] >= Math.floor(screenWidth / blockSize) || head[0] < 0 ||
      head[1] >= Math.floor(screenHeight / blockSize) || head[1] < 0) {
      return true;
    }

    return false;
  };

  const isFoodEaten = (head) => {
    return head[0] === food[0] && head[1] === food[1];
  };

  const generateFood = () => {
    const x = Math.floor(Math.random() * Math.floor(screenWidth / blockSize));
    const y = Math.floor(Math.random() * Math.floor(screenHeight / blockSize));
    setFood([x, y]);
  };

  const gameOver = () => {
    setIsGameOver(true);
    clearInterval(gameInterval);
  };

  const resetGame = () => {
    setSnakeDots([[0,0], [1,0]]);
    setFood([6,6]);
    setDirection('RIGHT');
    setIsGameOver(false);
    setGameInterval(setInterval(moveSnake, 200));
  };

  const handleSwipe = (newDirection) => {
    setDirection(newDirection);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.gameArea}>
        <Snake snakeDots={snakeDots} blockSize={blockSize} />
        <Food position={food} blockSize={blockSize} />
      </View>
      <View style={styles.buttonsArea}>
        <Button title="UP" onPress={() => handleSwipe('UP')} />
        <Button title="LEFT" onPress={() => handleSwipe('LEFT')} />
        <Button title="RIGHT" onPress={() => handleSwipe('RIGHT')} />
        <Button title="DOWN" onPress={() => handleSwipe('DOWN')} />
      </View>
      {isGameOver && (
        <View style={styles.gameOverArea}>
          <Text style={styles.gameOverText}>Game Over</Text>
          <Button title="Restart" onPress={resetGame} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  gameArea: {
    flex: 1,
    backgroundColor: '#ddd',
    position: 'relative',
  },
  buttonsArea: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 20,
  },
  gameOverArea: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50% }, { translateY: -50% }],
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default App;