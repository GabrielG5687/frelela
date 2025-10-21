import React, { useState, useEffect } from 'react';
import { Alert, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, User, UpdateUserRequest } from '../types';
import { UserService } from '../services/user';
import { AuthService } from '../services/auth';

type EditProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditProfile'>;
type EditProfileScreenRouteProp = RouteProp<RootStackParamList, 'EditProfile'>;

interface Props {
  navigation: EditProfileScreenNavigationProp;
  route: EditProfileScreenRouteProp;
}

const Container = styled.ScrollView`
  flex: 1;
  background-color: #f5f5f5;
`;

const Header = styled.View`
  background-color: #007AFF;
  padding: 20px;
  padding-top: 50px;
  padding-bottom: 20px;
`;

const HeaderTitle = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const Content = styled.View`
  padding: 20px;
`;

const Card = styled.View`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  elevation: 3;
`;

const Label = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
  margin-top: 15px;
`;

const Input = styled.TextInput`
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  font-size: 16px;
  margin-bottom: 15px;
`;

const Button = styled.TouchableOpacity<{ disabled?: boolean }>`
  background-color: ${props => props.disabled ? '#ccc' : '#007AFF'};
  border-radius: 8px;
  padding: 15px;
  align-items: center;
  margin-top: 20px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

export const EditProfileScreen: React.FC<Props> = ({ navigation }) => {
  const [user, setUser] = useState<User | null>(null);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const currentUser = await AuthService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setNome(currentUser.nome);
        setTelefone(currentUser.telefone);
        setEmail(currentUser.email || '');
        setEndereco(currentUser.endereco);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
    }
  };

  const handleUpdate = async () => {
    if (!user) return;

    if (!nome || !telefone || !endereco) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setLoading(true);
    try {
      const updateData: UpdateUserRequest = {
        nome,
        telefone,
        endereco,
      };

      if (email) {
        updateData.email = email;
      }

      if (senha) {
        updateData.senha = senha;
      }

      await UserService.updateUser(user.id, updateData);
      
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o perfil. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Container>
        <Header>
          <HeaderTitle>Carregando...</HeaderTitle>
        </Header>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <HeaderTitle>Editar Perfil</HeaderTitle>
      </Header>
      
      <Content>
        <Card>
          <Label>Nome *</Label>
          <Input
            value={nome}
            onChangeText={setNome}
            placeholder="Digite seu nome"
            autoCapitalize="words"
          />

          <Label>Telefone *</Label>
          <Input
            value={telefone}
            onChangeText={setTelefone}
            placeholder="Digite seu telefone"
            keyboardType="phone-pad"
          />

          <Label>Email</Label>
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu email (opcional)"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Label>Endereço *</Label>
          <Input
            value={endereco}
            onChangeText={setEndereco}
            placeholder="Digite seu endereço"
            autoCapitalize="words"
            multiline
          />

          <Label>Nova Senha</Label>
          <Input
            value={senha}
            onChangeText={setSenha}
            placeholder="Digite uma nova senha (opcional)"
            secureTextEntry
          />

          <Button onPress={handleUpdate} disabled={loading}>
            <ButtonText>{loading ? 'Salvando...' : 'Salvar Alterações'}</ButtonText>
          </Button>
        </Card>
      </Content>
    </Container>
  );
};