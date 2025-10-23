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

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  salario: number;

  @Column({ type: 'text' })
  descricao: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  categoria: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  localizacao: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  tipoContrato: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  experiencia: string;

  @Column({ type: 'varchar', length: 20, default: 'ATIVO' })
  status: string;

  @CreateDateColumn({ name: 'data_publicacao' })
  dataPublicacao: Date;

  @Column({ name: 'usuario_id' })
  usuarioId: string;

  @ManyToOne(() => User, (user) => user.trabalhos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: User;
}