import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Job } from '../jobs/job.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  nome: string;

  @Column({ type: 'varchar', length: 500 })
  endereco: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  telefone: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  senha: string;

  @CreateDateColumn({ name: 'data_criacao' })
  dataCriacao: Date;

  @OneToMany(() => Job, (job) => job.usuario)
  trabalhos: Job[];
}