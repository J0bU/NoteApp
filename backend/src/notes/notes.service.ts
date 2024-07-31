import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Note } from './entities/note.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto) {
    try {
      const note = this.noteRepository.create(createNoteDto);
      await this.noteRepository.save(note);

      return note;
    } catch (e) {
      this.handleDBExceptions(e);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return await this.noteRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: string) {
    const note = await this.noteRepository.findOneBy({ id });

    if (!note) {
      throw new NotFoundException(`Note with ${id} not found`);
    }
    return note;
  }

  async findByFilter(term: string) {
    const result = await this.noteRepository.find({});
    const filterResult = result.map((note) => {
      if (note.tags.filter((value) => value === term).length !== 0) {
        return note;
      }
    });
    return filterResult;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    const note = await this.noteRepository.preload({
      id: id,
      ...updateNoteDto,
    });

    if (!note) throw new BadRequestException(`Note with id ${id} not found`);

    try {
      await this.noteRepository.save(note);
      return note;
    } catch (e) {
      this.handleDBExceptions(e);
    }
  }

  async remove(id: string) {
    const note = await this.findOne(id);
    await this.noteRepository.remove(note);

    return note;
  }

  private handleDBExceptions(e: any) {
    if (e.code === '23505') {
      throw new BadRequestException(e.detail);
    }
    throw new InternalServerErrorException(
      'Unexpected error, check server log!',
    );
  }
}
