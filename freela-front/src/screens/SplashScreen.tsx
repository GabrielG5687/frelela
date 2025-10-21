import React, { useEffect } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { AuthService } from '../services/auth';

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

interface Props {
  navigation: SplashScreenNavigationProp;
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #007AFF;
`;

const Logo = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
`;

const Subtitle = styled.Text`
  font-size: 16px;
  color: white;
  opacity: 0.8;
`;

export const SplashScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuthenticated = await AuthService.isAuthenticated();
        
        setTimeout(() => {
          if (isAuthenticated) {
            navigation.replace('MainTabs');
          } else {
            navigation.replace('Login');
          }
        }, 2000);
      } catch (error) {
        setTimeout(() => {
          navigation.replace('Login');
        }, 2000);
      }
    };

    checkAuth();
  }, [navigation]);

  return (
    <Container>
      <Logo>FreelaFácil</Logo>
      <Subtitle>Conectando freelancers</Subtitle>
    </Container>
  );
};