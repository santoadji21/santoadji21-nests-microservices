import { AbstractRepository } from '@app/common/database/abstract.repository';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../../../../libs/common/src/models/user.schema';

@Injectable()
export class UsersRepository extends AbstractRepository<UserDocument> {
  protected readonly logger: Logger = new Logger(UserDocument.name);

  constructor(
    @InjectModel(UserDocument.name)
    reservationModel: Model<UserDocument>,
  ) {
    super(reservationModel);
  }
}
