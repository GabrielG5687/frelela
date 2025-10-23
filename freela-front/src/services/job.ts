import api from './api';
import { Job, CreateJobRequest, UpdateJobRequest } from '../types';

export class JobService {
  static async getJobs(): Promise<Job[]> {
    try {
      const response = await api.get<Job[]>('/jobs');
      return response.data;
    } catch (error) {
      throw new Error('Erro ao carregar trabalhos.');
    }
  }

  static async getJobById(id: string): Promise<Job> {
    try {
      const response = await api.get<Job>(`/jobs/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao carregar detalhes do trabalho.');
    }
  }

  static async createJob(jobData: CreateJobRequest): Promise<Job> {
    try {
      const response = await api.post<Job>('/jobs', jobData);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao criar trabalho.');
    }
  }

  static async getUserJobs(): Promise<Job[]> {
    try {
      const response = await api.get<Job[]>('/jobs/my-jobs');
      return response.data;
    } catch (error) {
      throw new Error('Erro ao carregar seus trabalhos.');
    }
  }

  static async updateJob(id: string, jobData: UpdateJobRequest): Promise<Job> {
    try {
      const response = await api.patch<Job>(`/jobs/${id}`, jobData);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao atualizar trabalho.');
    }
  }

  static async deleteJob(id: string): Promise<void> {
    try {
      await api.delete(`/jobs/${id}`);
    } catch (error) {
      throw new Error('Erro ao excluir trabalho.');
    }
  }

  static async searchJobs(query: string): Promise<Job[]> {
    try {
      const response = await api.get<Job[]>(`/jobs/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao buscar trabalhos.');
    }
  }
}