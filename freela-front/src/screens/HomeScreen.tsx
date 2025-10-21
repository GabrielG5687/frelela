import React, { useState, useEffect } from 'react';
import { Alert, RefreshControl, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TabParamList, RootStackParamList, Job } from '../types';
import { JobService } from '../services/job';
import { JobCard } from '../components/JobCard';

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Home'>,
  StackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const Container = styled.View`
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
`;

const ListContainer = styled.View`
  flex: 1;
  padding: 16px;
`;

const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const EmptyText = styled.Text`
  font-size: 18px;
  color: #666;
  text-align: center;
`;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const jobsData = await JobService.getJobs();
      setJobs(jobsData);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os trabalhos.');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadJobs();
    setRefreshing(false);
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleJobPress = (jobId: string) => {
    navigation.navigate('JobDetails', { jobId });
  };

  const renderJob = ({ item }: { item: Job }) => (
    <JobCard job={item} onPress={() => handleJobPress(item.id)} />
  );

  const renderEmpty = () => (
    <EmptyContainer>
      <EmptyText>Nenhum trabalho disponível no momento.</EmptyText>
    </EmptyContainer>
  );

  return (
    <Container>
      <Header>
        <HeaderTitle>Trabalhos Disponíveis</HeaderTitle>
      </Header>
      
      <ListContainer>
        <FlatList<Job>
          data={jobs}
          renderItem={renderJob}
          keyExtractor={(item: Job) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={!loading ? renderEmpty : null}
          showsVerticalScrollIndicator={false}
        />
      </ListContainer>
    </Container>
  );
};