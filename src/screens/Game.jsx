import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';

import xImg from '../assests/images/x.png';
import oImg from '../assests/images/o.png';
import CustomAlert from '../components/CustomAlert/CustomAlert';
import Icon from 'react-native-vector-icons/AntDesign';

const Game = ({ route }) => {
  const { name } = route.params;

  const playerSymbol = name.toLowerCase() === 'x' ? 1 : 2;
  const computerSymbol = playerSymbol === 1 ? 2 : 1;

  const [board, setBoard] = useState(Array(9).fill(0));
  const [turn, setTurn] = useState(1);
  const [status, setStatus] = useState('Your Turn');
  const [alert, setAlert] = useState({
    alertMsg: '',
    alertVisible: false,
  });

  const bottomSheet = useRef(null);
  const gameCompleted = useRef(false);

  useEffect(() => {
    if (turn === 2 && !gameCompleted.current) {
      const emptyIndices = board
        .map((v, i) => (v === 0 ? i : null))
        .filter(v => v !== null);

      if (emptyIndices.length === 0) return;

      const newBoard = [...board];

      let move = findBestMove(newBoard, computerSymbol);

      if (move === null) move = findBestMove(newBoard, playerSymbol);

      if (move === null && board[4] === 0) move = 4;

      const corners = [0, 2, 6, 8].filter(i => board[i] === 0);
      if (move === null && corners.length > 0)
        move = corners[Math.floor(Math.random() * corners.length)];

      if (move === null)
        move = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

      newBoard[move] = computerSymbol;

      setTimeout(() => {
        setBoard(newBoard);
        checkWinner(newBoard);
        setTurn(1);
        setStatus('Your Turn');
      }, 500);
    }
  }, [turn]);

  const findBestMove = (b, symbol) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let line of lines) {
      const [a, b1, c] = line;
      const values = [b[a], b[b1], b[c]];
      if (values.filter(v => v === symbol).length === 2 && values.includes(0)) {
        return line[values.indexOf(0)];
      }
    }

    return null;
  };

  const handlePress = index => {
    if (board[index] !== 0 || turn !== 1) return;
    const newBoard = [...board];
    newBoard[index] = playerSymbol;
    setBoard(newBoard);
    checkWinner(newBoard);
    setTurn(2);
    setStatus('Computer Turn');
  };

  const checkWinner = b => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let line of lines) {
      const [a, b1, c] = line;
      if (b[a] !== 0 && b[a] === b[b1] && b[a] === b[c]) {
        gameCompleted.current = true;
        let winner = '';
        if (b[a] === playerSymbol) winner = 'You Win!';
        else if (b[a] === computerSymbol) winner = 'Computer Wins!';

        setAlert(prev => ({
          ...prev,
          alertVisible: true,
          alertMsg: `${winner}`,
        }));

        return true;
      }
    }

    if (b.every(v => v !== 0)) {
      gameCompleted.current = true;
      setAlert(prev => ({
        ...prev,
        alertVisible: true,
        alertMsg: `It's a Draw!`,
      }));

      return true;
    }

    return false;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(0));
    setTurn(1);
    setStatus('Your Turn');
    gameCompleted.current = false;
  };

  return (
    <View style={styles.container}>
      <CustomAlert
        visible={alert?.alertVisible}
        title="Game Over"
        message={alert?.alertMsg}
        onConfirm={() => {
          resetGame();
          setAlert(prev => ({ ...prev, alertVisible: false }));
        }}
      />

      <ImageBackground
        source={require('../assests/images/tic-tac-toe.png')}
        style={styles.background}
      >
        <View style={styles.statusBox}>
          <Text style={styles.text}>{status}</Text>
        </View>

        <View style={styles.boxWrapper}>
          {board.map((value, idx) => (
            <Box
              key={idx}
              value={value}
              onPress={() => handlePress(idx)}
              playerSymbol={playerSymbol}
              computerSymbol={computerSymbol}
            />
          ))}
        </View>

        <Icon
          name="pause"
          size={36}
          color="#fff"
          style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            backgroundColor: '#2C53B7',
            padding: 12,
            borderRadius: 100,
          }}
          onPress={() => bottomSheet?.current?.expand()}
          //   onLongPress={() => Alert.alert('Go Back')}
        />
      </ImageBackground>
    </View>
  );
};

const Box = ({ value, onPress, playerSymbol, computerSymbol }) => {
  let img = null;
  if (value === playerSymbol) img = playerSymbol === 1 ? xImg : oImg;
  if (value === computerSymbol) img = computerSymbol === 1 ? xImg : oImg;

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.box}>
        {img && (
          <Image
            source={img}
            resizeMode="contain"
            style={{
              width: '80%',
              height: '80%',
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#275EEB',
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  background: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  statusBox: {
    backgroundColor: '#40529b',
    width: '60%',
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 18,
    filter: 'drop-shadow(1px 1px 18px black)',
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
    color: 'white',
    fontWeight: '800',
  },
  box: {
    backgroundColor: '#2C53B7',
    width: 100,
    height: 100,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 40,
    gap: 5,
  },
});

export default React.memo(Game);
