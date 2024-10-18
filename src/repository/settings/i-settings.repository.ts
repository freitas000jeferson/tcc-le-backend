import { FilterQuery } from 'mongoose';
import { PaginationType } from 'src/commom/types/pagination.type';
import { Settings, SettingsDocument } from 'src/model/mongo';

export interface ISettingsRepository {
  countDocuments(): Promise<number>;
  findOne(query: FilterQuery<SettingsDocument>): Promise<SettingsDocument>;
  findAll(query: FilterQuery<SettingsDocument>): Promise<SettingsDocument[]>;
  findAllPaginated(
    pagination: PaginationType,
    query: FilterQuery<SettingsDocument>
  ): Promise<SettingsDocument[]>;
  create(data: Settings): Promise<SettingsDocument>;
}
export const SETTINGS_REPOSITORY_NAME = 'ISettingsRepository';
