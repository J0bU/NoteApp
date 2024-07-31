import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('bool', {
    nullable: true,
    default: 1,
  })
  isActived: boolean;

  @Column('bool', {
    nullable: true,
    default: 0,
  })
  isArchived: boolean;

  @Column({
    type: 'text',
    array: true,
    default: [],
  })
  tags: string[];

  @ManyToOne(() => User, (user) => user.notes, { onDelete: 'CASCADE' })
  user: User;
}
