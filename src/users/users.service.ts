import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { HashService } from '../common/hash-service';
import { PageOptionsDto } from '../common/dtos/page-options.dto';
import { PageDto } from '../common/dtos/page.dto';
import { PageMetaDto } from '../common/dtos/page-meta.dto';
import { UserAggregateQueryDto } from './dto/user-aggregate-query.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: MongoRepository<User>,
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
    const { page, limit } = pageOptionsDto;

    const [entities, itemCount] = await this.userRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });

    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });

    return new PageDto(entities, pageMetaDto);
  }

  async findById(id: string) {
    return await this.userRepository.findOneBy({
      _id: new ObjectId(id),
    });
  }

  async findOneBy(data: object) {
    return await this.userRepository.findOneBy(data);
  }
  async create(user: CreateUserDto) {
    user.created_at = new Date();
    user.updated_at = new Date();
    user.password = await HashService.hash(user.password);
    const result = await this.userRepository.insertOne(user);
    const insertedId = result.insertedId;
    return await this.findOneBy({ _id: insertedId });
  }

  async update(id: string, user: UpdateUserDto) {
    return await this.userRepository.updateOne(
      { _id: new ObjectId(id) },
      { $set: user },
    );
  }

  async delete(id: string) {
    return await this.userRepository.deleteOne({
      _id: new ObjectId(id),
    });
  }
  async aggregate(pageQuery: UserAggregateQueryDto) {
    const { page, limit, sortBy, desc, search } = pageQuery;

    const matchStage = search
      ? {
          $match: {
            $or: [{ email: { $regex: search, $options: 'i' } }],
          },
        }
      : {};

    const pipeLine = [
      ...(search ? [matchStage] : []),
      { $sort: { [sortBy]: desc } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ];

    const result = await this.userRepository
      .aggregateEntity(pipeLine)
      .toArray();
    const count = await this.userRepository.count(
      search ? matchStage.$match : {},
    );
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto: pageQuery,
      itemCount: count,
    });

    return new PageDto(result, pageMetaDto);
  }

  findUserWithPosts() {
    return this.userRepository
      .aggregate([
        {
          $lookup: {
            from: 'posts',
            localField: '_id',
            foreignField: 'userId',
            as: 'posts',
          },
        },
      ])
      .toArray();
  }
}
