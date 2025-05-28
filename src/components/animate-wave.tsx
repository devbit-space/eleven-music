import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { h, w, colors } from './style';
const NUM_BARS = 6;

const AnimatedWave = ({ isPlaying }: { isPlaying: boolean }) => {
  const animatedValues = useRef(Array(NUM_BARS).fill(0).map(() => new Animated.Value(0))).current;

  const animations = animatedValues.map(value => {
    return Animated.sequence([
      Animated.timing(value, {
        toValue: Math.random() * 0.75,
        duration: 100 + Math.random() * 125,
        useNativeDriver: true,
      }),
      Animated.timing(value, {
        toValue: Math.random() * 1.35,
        duration: 125 + Math.random() * 125,
        useNativeDriver: true,
      })
    ])
  })

  const animationLoop = Animated.loop(Animated.parallel(animations));

  useEffect(() => {
    if (isPlaying) {
      animationLoop.reset();
      animationLoop.start();
    } else {
      animationLoop.stop();
    }
    return () => animationLoop.stop();
  }, [isPlaying]);

  return (
    <View style={styles.waveform}>
      {animatedValues.map((value, index) => (
        <Animated.View
          key={index}
          style={[
            styles.waveBar,
            {
              transform: [{
                scaleY: value.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.1, 1],
                })
              }]
            }
          ]}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  waveform: {
    flexDirection: 'row',
    alignItems: 'center',
    height: h(0.75),
    justifyContent: 'center',
  },
  waveBar: {
    width: w(0.9),
    height: 20,
    backgroundColor: colors.darkGray,
    marginHorizontal: w(0.2),
  }
})

export { AnimatedWave }
