import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Note } from 'src/notes/entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,

    private readonly dataSource: DataSource,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { notes = [], ...userDetails } = createUserDto;

      const user = this.userRepository.create({
        ...userDetails,
        notes: notes.map((note) =>
          this.noteRepository.create({
            id: note,
            title: note,
            description: note,
          }),
        ),
      });

      await this.userRepository.save(user);

      return user;
    } catch (e) {
      this.handleDBExceptions(e);
    }
  }

  async findAll() {
    return await this.userRepository.find({
      relations: {
        notes: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`Note with ${id} not found`);
    }
    return user;
  }

  async findOnePlane(term: string) {
    const { notes = [], ...rest } = await this.findOne(term);
    return {
      ...rest,
      notes: notes.map((note) => {
        return { title: note.title, description: note.description };
      }),
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { notes } = updateUserDto;

    const databaseNotes = await this.noteRepository.find({});

    const user = await this.userRepository.preload({ id });

    if (!user)
      throw new NotFoundException(`The user with the id ${id} was not found`);

    // Creating query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (notes) {
        await queryRunner.manager.delete(Note, { user: { id } });
        user.notes = notes.map((note, index) => {
          const title = databaseNotes[index].title;
          const description = databaseNotes[index].description;

          return this.noteRepository.create({ id: note, title, description });
        });
      }

      await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOnePlane(id);
    } catch (e) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(e);
    }
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  private handleDBExceptions(e: any) {
    if (e.code === '23505') {
      throw new BadRequestException(e.detail);
    }
    console.log(e);
    throw new InternalServerErrorException(
      'Unexpected error, check server log!',
    );
  }

  async deleteAllUsers() {
    const query = this.userRepository.createQueryBuilder('user');

    try {
      return await query.delete().where({}).execute();
    } catch (e) {
      this.handleDBExceptions(e);
    }
  }
}
