import { Note } from 'src/notes/entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text')
  name: string;

  @OneToMany(() => Note, (Note) => Note.user, { cascade: true, eager: true })
  notes?: Note[];
}
