import React, { useState, useEffect, useCallback } from 'react';
import { Alert, RefreshControl, FlatList, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { TabParamList, RootStackParamList, Job, User } from '../types';
import { JobService } from '../services/job';
import { AuthService } from '../services/auth';
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

const SearchContainer = styled.View`
  padding: 16px;
  background-color: white;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`;

const SearchInput = styled.TextInput`
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 16px;
  border-width: 1px;
  border-color: #e0e0e0;
`;

const SearchResultsText = styled.Text`
  padding: 16px;
  font-size: 14px;
  color: #666;
  background-color: #f8f8f8;
`;

const ListContainer = styled.View`
  flex: 1;
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
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Job[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const [jobsData, userData] = await Promise.all([
        JobService.getJobs(),
        AuthService.getCurrentUser()
      ]);

      // Filtrar trabalhos para não mostrar os do usuário logado
      const filteredJobs = jobsData.filter(job => job.usuarioId !== userData?.id);
      setJobs(filteredJobs);
      setCurrentUser(userData);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os trabalhos.');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    if (searchQuery.trim()) {
      await handleSearch(searchQuery);
    } else {
      await loadJobs();
    }
    setRefreshing(false);
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      const results = await JobService.searchJobs(query.trim());
      // Filtrar resultados da busca para não mostrar trabalhos do usuário logado
      const filteredResults = results.filter(job => job.usuarioId !== currentUser?.id);
      setSearchResults(filteredResults);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível realizar a busca.');
      setSearchResults([]);
    }
  };

  const handleSearchInputChange = (text: string) => {
    setSearchQuery(text);

    if (!text.trim()) {
      setIsSearching(false);
      setSearchResults([]);
    }
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      handleSearch(searchQuery);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
    setSearchResults([]);
  };

  useEffect(() => {
    loadJobs();
  }, []);

  // Atualiza a lista quando a tela recebe foco (ex: após criar um trabalho)
  useFocusEffect(
    useCallback(() => {
      // Se estiver buscando, refaz a busca para incluir novos trabalhos
      if (searchQuery.trim()) {
        handleSearch(searchQuery);
      } else {
        // Senão, recarrega todos os trabalhos
        loadJobs();
      }
    }, [searchQuery])
  );

  const handleJobPress = (jobId: string) => {
    navigation.navigate('JobDetails', { jobId });
  };

  const renderJob = ({ item }: { item: Job }) => (
    <JobCard job={item} onPress={() => handleJobPress(item.id)} />
  );

  const renderEmpty = () => (
    <EmptyContainer>
      <EmptyText>
        {isSearching
          ? `Nenhum resultado encontrado para "${searchQuery}"`
          : 'Nenhum trabalho disponível no momento.'
        }
      </EmptyText>
    </EmptyContainer>
  );

  const displayedJobs = isSearching ? searchResults : jobs;
  const showResultsCount = isSearching && searchResults.length > 0;

  return (
    <Container>
      <Header>
        <HeaderTitle>Trabalhos Disponíveis</HeaderTitle>
      </Header>

      <SearchContainer>
        <SearchInput
          placeholder="Buscar trabalhos..."
          value={searchQuery}
          onChangeText={handleSearchInputChange}
          onSubmitEditing={handleSearchSubmit}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
      </SearchContainer>

      {showResultsCount && (
        <SearchResultsText>
          {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''} encontrado{searchResults.length !== 1 ? 's' : ''} para "{searchQuery}"
        </SearchResultsText>
      )}

      <ListContainer>
        <FlatList<Job>
          data={displayedJobs}
          renderItem={renderJob}
          keyExtractor={(item: Job) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={!loading ? renderEmpty : null}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16 }}
        />
      </ListContainer>
    </Container>
  );
};