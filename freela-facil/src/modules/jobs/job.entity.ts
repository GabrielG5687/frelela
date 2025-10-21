import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  titulo: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valorSugerido: number;

  @Column({ type: 'text' })
  descricao: string;

  @CreateDateColumn({ name: 'data_publicacao' })
  dataPublicacao: Date;

  @Column({ name: 'usuario_id' })
  usuarioId: string;

  @ManyToOne(() => User, (user) => user.trabalhos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: User;
}