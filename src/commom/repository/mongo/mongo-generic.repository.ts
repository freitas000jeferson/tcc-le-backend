import { FilterQuery, InsertManyOptions, Model } from 'mongoose';
import { PaginationType } from 'src/commom/types/pagination.type';
import { IGenericRepository } from '../i-generic.repository';

export class MongoGenericRepository<T> implements IGenericRepository<T> {
  private _repository: Model<T>;

  constructor(repository: Model<T>) {
    this._repository = repository;
  }

  async countDocuments(): Promise<number> {
    return await this._repository.countDocuments();
  }

  async findById(id: string): Promise<T> {
    return await this._repository.findById(id).exec();
  }

  async findOne(query: FilterQuery<T>): Promise<T> {
    return await this._repository.findOne({ ...query }).exec();
  }

  async findAllPaginated(
    pagination: PaginationType,
    query: FilterQuery<T>
  ): Promise<T[]> {
    return await this._repository
      .find({ ...query })
      .skip(pagination.skip) // Always apply 'skip' before 'limit'
      .limit(pagination.limit)
      .sort(pagination.sort)
      //   .populate(populateOnFind)
      .exec();
  }

  async findAll(query: FilterQuery<T>): Promise<T[]> {
    return await this._repository.find({ ...query }).exec();
  }

  async create(data: T): Promise<T> {
    try {
      return await this._repository.create(data);
    } catch (err) {
      throw new Error('Error' + err);
    }
  }

  async update(filter: FilterQuery<T>, data: T): Promise<T> {
    await this._repository.updateOne(filter, data).exec();
    return data;
  }

  async delete(id: string): Promise<void> {
    await this._repository.deleteOne({ _id: id });
  }
  async insertMany(
    data: T[],
    options?: InsertManyOptions & { lean: true }
  ): Promise<T[]> {
    return await this._repository.insertMany(data, options);
  }
}
