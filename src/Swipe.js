import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  LayoutAnimation,
  PanResponder,
  Text,
  UIManager,
  View,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

const Swipe = ({onSwipe, children}) => {
  const position = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    new PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        if (gesture.dx > 0) {
          position.setValue({x: gesture.dx, y: 0});
        }
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipeRight();
        } else {
          resetPosition();
        }
      },
    }),
  ).current;

  const [state, setState] = useState({
    panResponder,
    position,
    position,
  });

  useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }, []);

  function forceSwipeRight() {
    Animated.timing(state.position, {
      toValue: {x: SCREEN_WIDTH, y: 0},
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => onSwipe());
  }

  function getStyle() {
    const {position} = state;
    const rotate = position.x.interpolate({
      inputRange: [0, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['0deg', '0deg', '0deg'],
      useNativeDriver: false,
    });

    return {
      ...position.getLayout(),
      transform: [{rotate}],
    };
  }

  function resetPosition() {
    Animated.spring(state.position, {
      toValue: {x: 0, y: 0},
      useNativeDriver: false,
    }).start();
  }

  return (
    <Animated.View style={[getStyle()]} {...state.panResponder.panHandlers}>
      {children}
    </Animated.View>
  );
};

export default Swipe;
