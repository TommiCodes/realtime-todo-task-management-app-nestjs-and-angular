import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Connection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  socketId: string;

  // one user could have many Connections, e.g. one on his desktop and one on mobile
  @ManyToOne(() => User, (user) => user.connections)
  @JoinColumn()
  connectedUser: User;
}
