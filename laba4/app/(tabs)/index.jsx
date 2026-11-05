import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {
    GestureDetector,
    Gesture,
    Directions,
} from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import { useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function ClickerScreen() {
    const [score, setScore] = useState(0);
    const [lastAction, setLastAction] = useState('Зробіть жест!');

    const [stats, setStats] = useState({
        clicks: 0,
        doubleClicks: 0,
        longPresses: 0,
        dragged: false,
        swipeRight: false,
        swipeLeft: false,
        pinched: false,
    });

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);
    const savedScale = useSharedValue(1);

    const updateStatsAndScore = async (scoreAdd, statUpdater, actionName) => {
        setScore((prev) => {
            const newScore = prev + scoreAdd;
            AsyncStorage.setItem('game_score', newScore.toString());
            return newScore;
        });

        if (actionName) setLastAction(actionName);

        setStats((prev) => {
            const updated = statUpdater(prev);
            AsyncStorage.setItem('game_stats', JSON.stringify(updated));
            return updated;
        });
    };

    useFocusEffect(
        React.useCallback(() => {
            async function loadData() {
                const savedScore = await AsyncStorage.getItem('game_score');
                const savedStats = await AsyncStorage.getItem('game_stats');
                if (savedScore !== null) setScore(parseInt(savedScore, 10));
                if (savedStats !== null) setStats(JSON.parse(savedStats));
            }
            loadData();
        }, [])
    );

    const singleTap = Gesture.Tap()
        .numberOfTaps(1)
        .onStart(() => {
            scale.value = withSequence(withSpring(1.2), withSpring(1));
            updateStatsAndScore(
                1,
                (s) => ({ ...s, clicks: s.clicks + 1, pinched: true }),
                'Одиночний клік! (+1)'
            );
        });

    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .onStart(() => {
            scale.value = withSequence(withSpring(1.4), withSpring(1));
            updateStatsAndScore(2, (s) => ({ ...s, doubleClicks: s.doubleClicks + 1 }), 'Подвійний клік! (+2)');
        });

    const longPress = Gesture.LongPress()
        .minDuration(3000)
        .onStart(() => {
            scale.value = withSequence(withTiming(1.5, { duration: 200 }), withSpring(1));
            updateStatsAndScore(15, (s) => ({ ...s, longPresses: s.longPresses + 1 }), 'Довге утримання (3 сек)! (+15)');
        });

    const pan = Gesture.Pan()
        .onUpdate((e) => {
            translateX.value = e.translationX;
            translateY.value = e.translationY;
        })
        .onEnd(() => {
            translateX.value = withSpring(0);
            translateY.value = withSpring(0);
            updateStatsAndScore(3, (s) => ({ ...s, dragged: true }), 'Перетягування! (+3)');
        });

    const flingRight = Gesture.Fling()
        .direction(Directions.RIGHT)
        .onStart(() => {
            updateStatsAndScore(7, (s) => ({ ...s, swipeRight: true }), 'Свайп вправо! (+7)');
        });

    const flingLeft = Gesture.Fling()
        .direction(Directions.LEFT)
        .onStart(() => {
            updateStatsAndScore(7, (s) => ({ ...s, swipeLeft: true }), 'Свайп вліво! (+7)');
        });

    const pinch = Gesture.Pinch()
        .onStart(() => {
            savedScale.value = scale.value;
        })
        .onUpdate((e) => {
            scale.value = savedScale.value * e.scale;
        })
        .onEnd(() => {
            scale.value = withSpring(1);
            savedScale.value = 1;
            updateStatsAndScore(10, (s) => ({ ...s, pinched: true }), 'Масштабування! (+10)');
        });

    const taps = Gesture.Exclusive(doubleTap, singleTap);
    const swipes = Gesture.Race(flingRight, flingLeft);
    const pinchAndLongPress = Gesture.Simultaneous(pinch, longPress);

    const combinedGestures = Gesture.Race(
        swipes,
        pinchAndLongPress,
        pan,
        taps
    );

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            { scale: scale.value },
        ],
    }));

    return (
        <View style={styles.container}>
            <View style={styles.scoreBoard}>
                <Text style={styles.scoreTitle}>Рахунок</Text>
                <Text style={styles.scoreText}>{score}</Text>
                <Text style={styles.actionText}>{lastAction}</Text>
            </View>

            <View style={styles.interactiveArea}>
                <GestureDetector gesture={combinedGestures}>
                    <Animated.View style={[styles.targetObject, animatedStyle]}>
                        <Text style={styles.objectText}>Торкнися!</Text>
                    </Animated.View>
                </GestureDetector>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 40,
    },
    scoreBoard: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingHorizontal: 40,
        paddingVertical: 20,
        borderRadius: 20,
        elevation: 4,
    },
    scoreTitle: { fontSize: 16, color: '#6B7280', fontWeight: '600' },
    scoreText: { fontSize: 48, fontWeight: 'bold', color: '#4F46E5', marginVertical: 4 },
    actionText: { fontSize: 14, color: '#10B981', fontWeight: '500' },
    interactiveArea: { width: width * 0.8, height: 300, alignItems: 'center', justifyContent: 'center' },
    targetObject: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: '#4F46E5',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    objectText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});