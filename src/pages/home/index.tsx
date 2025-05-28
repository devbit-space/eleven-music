import React from "react";
import styled from 'styled-components/native';
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Conversation } from "@11labs/client";
import { Audio, AVPlaybackStatus } from 'expo-av';
import { useVideoPlayer, VideoView } from 'expo-video';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { config } from "../../context";
import { colors, h, w } from "../../components/style";
import { AnimatedWave } from "../../components/animate-wave";
import Orb from "../../components/orb";

interface Status {
    isSpeaking: boolean;
    isConnected: boolean;
    conversation: Conversation | null;
}

const Home = () => {

    const [status, setStatus] = React.useState<Status>({
        isSpeaking: false,
        isConnected: false,
        conversation: null
    });

    const [isVideo, setVideo] = React.useState<AVPlaybackStatus | {}>({});

    const requestMicrophonePermission = async () => {
        try {
            const { status: existingStatus } = await Audio.getPermissionsAsync();

            if (existingStatus === 'granted') {
                return true;
            }

            const { status } = await Audio.requestPermissionsAsync();
            return status === 'granted';
        } catch (error) {
            console.error('Error requesting microphone permission:', error);
            return false;
        }
    };

    const videoSource = require("../../assets/loop.mp4");
    const player = useVideoPlayer(videoSource, player => {
        try {
            player.loop = true;
            player.play();
        } catch (error) {
            console.error('Error setting up video player:', error);
        }
    });

    const getSignedUrl = async () => {
        try {
            const response = await fetch(
                `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${config.agent_id}`,
                {
                    method: "GET",
                    headers: {
                        "xi-api-key": config.xi_api_key,
                    },
                }
            );
            console.log("response", response.ok);
            if (!response.ok) {
                throw new Error(`Failed to get signed URL: ${response.status}`);
            }

            const body = await response.json();
            if (!body.signed_url) {
                throw new Error('No signed URL in response');
            }
            return body.signed_url;
            // const requestHeaders: HeadersInit = new Headers();
            // requestHeaders.set("xi-api-key", config.xi_api_key); // use your ElevenLabs API key

            // const response = await fetch(
            //     "https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id={{agent id created through ElevenLabs UI}}",
            //     {
            //         method: "GET",
            //         headers: requestHeaders,
            //     }
            // );
            // console.log("response", response.ok);
            // if (!response.ok) {
            //     return Response.error();
            // }

            // const body = await response.json();
            // const url = body.signed_url;
            // console.log("url", url);
        } catch (error) {
            console.error('Error getting signed URL:', error);
            throw error;
        }
    }

    const startConversation = async () => {
        try {
            const hasPermission = await requestMicrophonePermission();
            if (!hasPermission) {
                console.log('Microphone permission not granted');
                return;
            }

            console.log('Microphone permission granted');
            const signedUrl = "wss://api.elevenlabs.io/v1/convai/conversation?agent_id=6EGMRdP00JcnFMxJQDU3&conversation_signature=ILJlblw4371TqP0xN43J"//await getSignedUrl();
            console.log('Signed URL:', signedUrl);
            // const conversation = await Conversation.startSession({
            //     signedUrl,
            //     onConnect: () => {
            //         setStatus(prev => ({ ...prev, isConnected: true, isSpeaking: true }));
            //     },
            //     onDisconnect: () => {
            //         setStatus(prev => ({ ...prev, isConnected: false, isSpeaking: false }));
            //     },
            //     onError: (error) => {
            //         console.error('Conversation error:', error);
            //         alert('An error occurred during the conversation');
            //     },
            //     onModeChange: ({ mode }) => {
            //         setStatus(prev => ({ ...prev, isSpeaking: mode === 'speaking' }));
            //     }
            // });

            // setStatus(prev => ({ ...prev, conversation }));
        } catch (error) {
            console.error('Error starting conversation:', error);
            alert('Failed to start conversation');
        }
    };

    return (
        <HomeWrapper>
            <Title>IIElevenLabs</Title>
            <AnimationWrapper>
                <StyledVideo player={player} nativeControls={false} />
                <WaveWrapper>
                    <AnimatedWave isPlaying={true} />
                </WaveWrapper>
            </AnimationWrapper>

            <IconWrapper onPress={startConversation}>
                <FontAwesome name="phone" size={w(7)} color={colors.white} />
            </IconWrapper>

        </HomeWrapper>
    )
}

const HomeWrapper = styled(View)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    paddingTop: h(4),
    paddingHorizontal: w(4),
    gap: h(2)
}));

const Title = styled(Text)(() => ({
    textAlign: 'center',
    paddingTop: h(5),
    fontWeight: 'bold',
    fontSize: w(10)
}));

const AnimationWrapper = styled(View)(() => ({
    position: 'relative',
    marginTop: h(12)
}));

const WaveWrapper = styled(View)(() => ({
    position: 'absolute',
    bottom: w(14),
    left: w(14),
    zIndex: 1,
    width: w(12),
    height: w(12),
    backgroundColor: colors.white,
    borderRadius: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const IconWrapper = styled(TouchableOpacity)(() => ({
    backgroundColor: colors.black,
    borderRadius: w(100),
    width: w(15),
    height: w(15),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: {
        width: 10,
        height: w(55),
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
}));

const StyledVideo = styled(VideoView)(() => ({
    width: w(40),
    height: w(40),
    zIndex: -1,
    borderRadius: '100%',
    shadowColor: colors.warning,
    shadowOffset: {
        width: 1,
        height: w(2),
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 1,
}));


export default Home;