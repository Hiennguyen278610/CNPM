import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import { CreateAccountDto } from '@/modules/account/dto/create-account.dto';
import { UpdateAccountDto } from '@/modules/account/dto/update-account.dto';
import { Account } from '@/modules/account/schemas/account.schema';
import {Model} from "mongoose";
import aqp from 'api-query-params';
import {hashPasswordUtil} from "@/Util/helper";

@Injectable()
export class AccountService {
  constructor(@InjectModel(Account.name) private accountModel: Model<Account>) {}

  isMailExist = async (email: string) => {
    const account = await this.accountModel.exists({email});
    return !!account;
  }

  async create(createAccountDto: CreateAccountDto) {
    const {username, password, phone, email} = createAccountDto;
    const checkMailExist = await this.isMailExist(email);
    if (checkMailExist) {throw new BadRequestException(`Email ${email} is exist.`, 'EMAIL EXIST');}
    const hashPassword = await hashPasswordUtil(createAccountDto.password);
    const account = await this.accountModel.create({
        username, password: hashPassword, phone, email,
    });
    return account._id;
  }

  async findAll(query: string, current: number, pageSize: number) {
    const {filter, sort} = aqp(query);
    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;

    if (!current) current = 1;
    if (!pageSize) pageSize = 10;

    const totalItems = (await this.accountModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const skip = (current - 1) * (pageSize);

    const results = await this.accountModel.find(filter).limit(pageSize).skip(skip).select("-password").sort(sort as any);
    return {results, totalPages};
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
