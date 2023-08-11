import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Complexity, Status } from '../todo.interface';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: Status;

  @Column()
  title: string;

  @Column()
  subTitle: string;

  @Column()
  text: string;

  @Column()
  complexity: Complexity;

  /*    createdBy?: UserI;
        updatedBy?: UserI;
        createdAt?: Date;
        updatetAt?: Date;*/
}
