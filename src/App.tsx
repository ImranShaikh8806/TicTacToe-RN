import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Animated, ImageSourcePropType } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import diceone from './assets/dice1.png';
import dicetwo from './assets/dice2.png';
import dicethree from './assets/dice3.png';
import dicefour from './assets/dice4.png';
import dicefive from './assets/dice5.png';
import dicesix from './assets/dice6.png';

type DiceProps = {
  imageurl: ImageSourcePropType;
};

const Dice = ({ imageurl }: DiceProps): JSX.Element => {
  return <Image style={styles.diceImage} source={imageurl} />;
};

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export default function App(): JSX.Element {
  const [diceImg, setDiceImg] = useState<ImageSourcePropType>(diceone);
  const [isCooldown, setIsCooldown] = useState(false); 
  const rotation = useRef(new Animated.Value(0)).current; 
  const scale = useRef(new Animated.Value(1)).current; 

  const rollDiceOnTap = () => {
    if (isCooldown) return; 

    
    rotation.setValue(0);

    
    const randomNum = Math.floor(Math.random() * 6) + 1;

    switch (randomNum) {
      case 1:
        setDiceImg(diceone);
        break;
      case 2:
        setDiceImg(dicetwo);
        break;
      case 3:
        setDiceImg(dicethree);
        break;
      case 4:
        setDiceImg(dicefour);
        break;
      case 5:
        setDiceImg(dicefive);
        break;
      case 6:
        setDiceImg(dicesix);
        break;
      default:
        setDiceImg(diceone);
        break;
    }

    //haptic feedback
    ReactNativeHapticFeedback.trigger('impactHeavy', options);

    
    setIsCooldown(true);
    setTimeout(() => {
      setIsCooldown(false); 
    }, 1500); 

    
    Animated.sequence([
      // Start rotating the dice
      Animated.timing(rotation, {
        toValue: 4 * Math.PI,  
        duration: 1000,  
        useNativeDriver: true,  
      }),
     
      Animated.timing(scale, {
        toValue: 1.2,  
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,  
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  
  const rotate = rotation.interpolate({
    inputRange: [0, 5 * Math.PI],  
    outputRange: ['0deg', '1800deg'], 
  });

  return (
    <View style={styles.container}>
      
      <Animated.View
        style={{
          transform: [{ rotate }, { scale }],
        }}
      >
        <Dice imageurl={diceImg} />
      </Animated.View>
      <Pressable onPress={rollDiceOnTap} disabled={isCooldown}>
        <Text style={[styles.rollDiceBtnText, isCooldown && styles.disabledButton]}>
          Roll the dice
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fffaf2',
  },
  diceImage: {
    width: 150,
    height: 150,
    borderRadius:20
  },
  rollDiceBtnText: {
    marginTop:35,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#e5e0ff',
    fontSize: 16,
    color: 'blue',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  disabledButton: {
    color: '#d3d3d3', 
  },
});
