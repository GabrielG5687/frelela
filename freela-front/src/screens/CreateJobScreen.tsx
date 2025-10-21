import React, { useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../types';
import { JobService } from '../services/job';

type CreateJobScreenNavigationProp = BottomTabNavigationProp<TabParamList, 'CreateJob'>;

interface Props {
  navigation: CreateJobScreenNavigationProp;
}

const Container = styled.ScrollView`
  flex: 1;
  background-color: #f5f5f5;
`;

const Content = styled.View`
  padding: 20px;
  padding-top: 40px;
`;

const Header = styled.View`
  background-color: #007AFF;
  padding: 20px;
  padding-top: 50px;
  padding-bottom: 20px;
  margin-bottom: 20px;
`;

const HeaderTitle = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: bold;
`;

const Card = styled.View`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 4;
`;

const Label = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
`;

const Input = styled.TextInput`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  font-size: 16px;
  border: 1px solid #ddd;
`;

const TextArea = styled.TextInput`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  font-size: 16px;
  border: 1px solid #ddd;
  min-height: 100px;
  text-align-vertical: top;
`;

const Button = styled.TouchableOpacity`
  background-color: #007AFF;
  border-radius: 8px;
  padding: 15px;
  align-items: center;
  margin-top: 10px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

export const CreateJobScreen: React.FC<Props> = ({ navigation }) => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valorSugerido, setValorSugerido] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateJob = async () => {
    if (!titulo || !descricao || !valorSugerido) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const numericValue = parseFloat(valorSugerido.replace(',', '.'));
    if (isNaN(numericValue) || numericValue <= 0) {
      Alert.alert('Erro', 'Por favor, insira um valor válido.');
      return;
    }

    setLoading(true);
    try {
      await JobService.createJob({
        titulo,
        descricao,
        valorSugerido: numericValue,
      });
      
      Alert.alert('Sucesso', 'Trabalho criado com sucesso!', [
        { text: 'OK', onPress: () => {
          setTitulo('');
          setDescricao('');
          setValorSugerido('');
          navigation.navigate('Home');
        }}
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar o trabalho. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <HeaderTitle>Novo Trabalho</HeaderTitle>
      </Header>
      
      <Content>
        <Card>
          <Label>Título do Trabalho</Label>
          <Input
            placeholder="Ex: Desenvolvimento de site"
            value={titulo}
            onChangeText={setTitulo}
            autoCapitalize="words"
          />
          
          <Label>Descrição</Label>
          <TextArea
            placeholder="Descreva detalhadamente o trabalho que precisa ser feito..."
            value={descricao}
            onChangeText={setDescricao}
            multiline
            autoCapitalize="sentences"
          />
          
          <Label>Valor (R$)</Label>
          <Input
            placeholder="Ex: 500,00"
            value={valorSugerido}
            onChangeText={setValorSugerido}
            keyboardType="numeric"
          />
          
          <Button onPress={handleCreateJob} disabled={loading}>
            <ButtonText>{loading ? 'Criando...' : 'Criar Trabalho'}</ButtonText>
          </Button>
        </Card>
      </Content>
    </Container>
  );
};