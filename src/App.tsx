import { Pressable, StyleSheet, Text, View, Animated } from 'react-native';
import React, { useState } from 'react';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState('');
  const [heading, setHeading] = useState('O Turn'); 
  const [resetTurn, setResetTurn] = useState(true); // true = "O Turn", false = "X Turn"
  
//animation
  const [scales, setScales] = useState(() => Array(9).fill(null).map(() => new Animated.Value(1)));


  const animateScale = (index:number) => {
    Animated.sequence([
      Animated.timing(scales[index], {
        toValue: 2, 
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scales[index], {
        toValue: 1.5,  
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  };

  const handleData = (index: number) => {
    
    if (board[index] !== null || winner !== '') return;

    const newBoard = [...board];
    
   
    if (resetTurn) {
      newBoard[index] = 'O';
      setHeading('X Turn');
    } else {
      newBoard[index] = 'X';
      setHeading('O Turn');
    }

    
    setBoard(newBoard);
    
    setResetTurn(!resetTurn);

    animateScale(index);

    // Check for winner or draw
    if (
      newBoard[0] === 'O' && newBoard[1] === 'O' && newBoard[2] === 'O' ||
      newBoard[3] === 'O' && newBoard[4] === 'O' && newBoard[5] === 'O' ||
      newBoard[6] === 'O' && newBoard[7] === 'O' && newBoard[8] === 'O' ||
      newBoard[0] === 'O' && newBoard[3] === 'O' && newBoard[6] === 'O' ||
      newBoard[1] === 'O' && newBoard[4] === 'O' && newBoard[7] === 'O' ||
      newBoard[2] === 'O' && newBoard[5] === 'O' && newBoard[8] === 'O' ||
      newBoard[0] === 'O' && newBoard[4] === 'O' && newBoard[8] === 'O' ||
      newBoard[2] === 'O' && newBoard[4] === 'O' && newBoard[6] === 'O'
    ) {
      setWinner('O is winner');
      setHeading('');
    } else if (
      newBoard[0] === 'X' && newBoard[1] === 'X' && newBoard[2] === 'X' ||
      newBoard[3] === 'X' && newBoard[4] === 'X' && newBoard[5] === 'X' ||
      newBoard[6] === 'X' && newBoard[7] === 'X' && newBoard[8] === 'X' ||
      newBoard[0] === 'X' && newBoard[3] === 'X' && newBoard[6] === 'X' ||
      newBoard[1] === 'X' && newBoard[4] === 'X' && newBoard[7] === 'X' ||
      newBoard[2] === 'X' && newBoard[5] === 'X' && newBoard[8] === 'X' ||
      newBoard[0] === 'X' && newBoard[4] === 'X' && newBoard[8] === 'X' ||
      newBoard[2] === 'X' && newBoard[4] === 'X' && newBoard[6] === 'X'
    ) {
      setWinner('X is winner');
      setHeading('');
    } else if (!newBoard.includes(null)) {
      setWinner('Match draw, restart the game');
      setHeading("")
    }
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setWinner('');
    setResetTurn(!resetTurn);
    setHeading(resetTurn ? 'X Turn' : 'O Turn');
    setScales(Array(9).fill(null).map(() => new Animated.Value(1))); 
  };

  return (
    <View style={styles.container}>
      {winner && <Text style={styles.result}>{winner}</Text>}
        <View style={heading ?null: styles.headingWrapper }>
        {heading && <Text style={[styles.headingText, { backgroundColor: resetTurn ? '#d946ef' : '#f87171' }]}>{heading}</Text>}
      </View>
      <View
        style={[styles.boxes, { backgroundColor: resetTurn ? '#d946ef' : '#f87171' }]}
      >
        {board.map((box, index) => (
          <Pressable key={index} onPress={() => handleData(index)}>
            <View style={styles.box}>
              <Animated.View style={{ transform: [{ scale: scales[index] }] }}>
                {box && <Text style={styles.text}>{box}</Text>}
              </Animated.View>
            </View>
          </Pressable>
        ))}
      </View>
      <Pressable onPress={handleReset} style={styles.btn}>
        <Text style={styles.btntext}>Reset Game</Text>
      </Pressable>
      
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  headingText:{
    fontSize:14,
    fontWeight:"500",
    color:"white",
    width:200,
    textAlign:"center",
    paddingVertical:4,
    borderRadius:10,
    marginBottom:15
  },
  headingWrapper: {
    height: 40,  
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"lightblue"
  },
  boxes: {
    display: 'flex',
    gap: 10,
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#475569',
    height: 320,
    width: 320,
    marginBottom: 26,
  },
  box: {
    height: 100,
    width: 100,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'blue',
    
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#fcd34d',
  },
  btntext: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  result: {
    fontSize: 24,
    color: 'blue',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor:"#34d399",
    paddingHorizontal:6,
    paddingVertical:3,
    borderRadius:5
  }
});
