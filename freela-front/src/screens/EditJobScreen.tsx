import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Job, UpdateJobRequest } from '../types';
import { JobService } from '../services/job';

type EditJobScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditJob'>;
type EditJobScreenRouteProp = RouteProp<RootStackParamList, 'EditJob'>;

interface Props {
  navigation: EditJobScreenNavigationProp;
  route: EditJobScreenRouteProp;
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

const Label = styled.Text<{ first?: boolean }>`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
  margin-top: ${props => props.first ? '0px' : '20px'};
`;

const Input = styled.TextInput`
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  font-size: 16px;
  margin-bottom: 15px;
`;

const TextArea = styled.TextInput`
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  font-size: 16px;
  margin-bottom: 15px;
  min-height: 120px;
  text-align-vertical: top;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.TouchableOpacity<{ disabled?: boolean; variant?: 'primary' | 'danger' }>`
  background-color: ${props => 
    props.disabled ? '#ccc' : 
    props.variant === 'danger' ? '#ff4444' : '#007AFF'
  };
  border-radius: 8px;
  padding: 15px;
  align-items: center;
  flex: ${props => props.variant === 'danger' ? '0 0 45%' : '0 0 45%'};
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

export const EditJobScreen: React.FC<Props> = ({ navigation, route }) => {
  const { jobId } = route.params;
  const [job, setJob] = useState<Job | null>(null);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valorSugerido, setValorSugerido] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadJobData();
  }, []);

  const loadJobData = async () => {
    try {
      const jobData = await JobService.getJobById(jobId);
      setJob(jobData);
      setTitulo(jobData.titulo);
      setDescricao(jobData.descricao);
      setValorSugerido(jobData.valorSugerido);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os dados do trabalho.');
      navigation.goBack();
    }
  };

  const handleUpdate = async () => {
    if (!job) return;

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
      const updateData: UpdateJobRequest = {
        titulo,
        descricao,
        valorSugerido: numericValue,
      };

      await JobService.updateJob(job.id, updateData);
      
      Alert.alert('Sucesso', 'Trabalho atualizado com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o trabalho. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!job) return;

    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir este trabalho? Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              await JobService.deleteJob(job.id);
              Alert.alert('Sucesso', 'Trabalho excluído com sucesso!', [
                { text: 'OK', onPress: () => navigation.navigate('MainTabs') }
              ]);
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o trabalho. Tente novamente.');
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  if (!job) {
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
        <HeaderTitle>Editar Trabalho</HeaderTitle>
      </Header>
      
      <Content>
        <Card>
          <Label first>Título do Trabalho</Label>
          <Input
            value={titulo}
            onChangeText={setTitulo}
            placeholder="Ex: Desenvolvimento de site"
            autoCapitalize="words"
          />

          <Label>Descrição</Label>
          <TextArea
            value={descricao}
            onChangeText={setDescricao}
            placeholder="Descreva detalhadamente o trabalho..."
            multiline
            autoCapitalize="sentences"
          />

          <Label>Valor (R$)</Label>
          <Input
            value={valorSugerido}
            onChangeText={setValorSugerido}
            placeholder="Ex: 500,00"
            keyboardType="numeric"
          />

          <ButtonRow>
            <Button onPress={handleUpdate} disabled={loading}>
              <ButtonText>{loading ? 'Salvando...' : 'Salvar'}</ButtonText>
            </Button>

            <Button variant="danger" onPress={handleDelete} disabled={loading}>
              <ButtonText>Excluir</ButtonText>
            </Button>
          </ButtonRow>
        </Card>
      </Content>
    </Container>
  );
};