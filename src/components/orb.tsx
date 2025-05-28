import { View, Animated, Text } from 'react-native';
import styled from 'styled-components/native';
import React, { useEffect, useRef } from 'react';
import { Conversation } from "@11labs/client";

import { w, h } from "./style";
import RadialGradient from 'react-native-radial-gradient';

interface OrbProps {
    isSpeaking: boolean;
    isConnected: boolean;
    conversation: Conversation | null
}

const Orb = ({ isSpeaking, isConnected, conversation }: OrbProps) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isSpeaking) {
            // Fast pulse animation
            Animated.loop(
                Animated.sequence([
                    Animated.timing(scaleAnim, {
                        toValue: 1.05,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(scaleAnim, {
                        toValue: 1,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        } else if (conversation) {
            // Slow pulse animation
            Animated.loop(
                Animated.sequence([
                    Animated.timing(scaleAnim, {
                        toValue: 1.05,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(scaleAnim, {
                        toValue: 1,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        } else {
            scaleAnim.setValue(1);
        }

        // Wave motion animation
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 6000,
                useNativeDriver: true,
            })
        ).start();
    }, [isSpeaking, conversation]);

    const spin = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <OrbContainer>
            <AnimatedOrb
                style={{
                    transform: [
                        { scale: scaleAnim },
                        { rotate: spin }
                    ],
                }}
                isConnected={isConnected}
            />
        </OrbContainer>
    );
};

const OrbContainer = styled(View)(() => ({
    margin: w(1),
    alignItems: "center",
    justifyContent: "center",
}));

const AnimatedOrb = styled(Animated.View)<{ isConnected: boolean }>(() => ({
    width: w(50),
    height: w(50),
    borderRadius: 90,
    backgroundColor: "#a5a5a5",
    overflow: "hidden"
}));

export default Orb;
