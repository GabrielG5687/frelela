import React, { useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { AuthService } from '../services/auth';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const Container = styled.ScrollView`
  flex: 1;
  background-color: #f5f5f5;
`;

const Content = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px;
  min-height: 600px;
`;

const Logo = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: #007AFF;
  text-align: center;
  margin-bottom: 40px;
`;

const Input = styled.TextInput`
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  font-size: 16px;
  border: 1px solid #ddd;
`;

const Button = styled.TouchableOpacity`
  background-color: #007AFF;
  border-radius: 8px;
  padding: 15px;
  align-items: center;
  margin-bottom: 15px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const LinkButton = styled.TouchableOpacity`
  align-items: center;
  padding: 10px;
`;

const LinkText = styled.Text`
  color: #007AFF;
  font-size: 16px;
`;

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    try {
      await AuthService.login({ email, senha });
      navigation.replace('MainTabs');
    } catch (error) {
      Alert.alert('Erro', 'Falha no login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Content>
        <Logo>FreelaFácil</Logo>
        
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <Input
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
        
        <Button onPress={handleLogin} disabled={loading}>
          <ButtonText>{loading ? 'Entrando...' : 'Entrar'}</ButtonText>
        </Button>
        
        <LinkButton onPress={() => navigation.navigate('Register')}>
          <LinkText>Não tem conta? Cadastre-se</LinkText>
        </LinkButton>
      </Content>
    </Container>
  );
};