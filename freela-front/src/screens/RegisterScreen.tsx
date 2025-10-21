import React, { useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { AuthService } from '../services/auth';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

interface Props {
  navigation: RegisterScreenNavigationProp;
}

const Container = styled.ScrollView`
  flex: 1;
  background-color: #f5f5f5;
`;

const Content = styled.View`
  flex: 1;
  padding: 20px;
  padding-top: 40px;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #007AFF;
  text-align: center;
  margin-bottom: 30px;
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
  margin-top: 10px;
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

export const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!nome || !telefone || !endereco || !senha || !email) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setLoading(true);
    try {
      await AuthService.register({
        nome,
        telefone,
        email,
        endereco,
        senha,
      });
      navigation.replace('MainTabs');
    } catch (error) {
      Alert.alert('Erro', 'Falha no cadastro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Content>
        <Title>Criar Conta</Title>
        
        <Input
          placeholder="Nome *"
          value={nome}
          onChangeText={setNome}
          autoCapitalize="words"
        />
        
        <Input
          placeholder="Telefone *"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
        />
        
        <Input
          placeholder="Email *"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <Input
          placeholder="Endereço *"
          value={endereco}
          onChangeText={setEndereco}
          autoCapitalize="words"
        />
        
        <Input
          placeholder="Senha *"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
        
        <Button onPress={handleRegister} disabled={loading}>
          <ButtonText>{loading ? 'Cadastrando...' : 'Cadastrar'}</ButtonText>
        </Button>
        
        <LinkButton onPress={() => navigation.goBack()}>
          <LinkText>Já tem conta? Faça login</LinkText>
        </LinkButton>
      </Content>
    </Container>
  );
};