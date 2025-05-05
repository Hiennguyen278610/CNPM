import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import { CreateAccountDto } from '@/modules/account/dto/create-account.dto';
import { UpdateAccountDto } from '@/modules/account/dto/update-account.dto';
import { Account } from '@/modules/account/schemas/account.schema';
import {Model} from "mongoose";
import aqp from 'api-query-params';
import {hashPasswordUtil} from "@/Util/helper";
import mongoose from 'mongoose';
import {CreateAuthDto} from '@/auth/dto/create-auth.dto';
import {v4 as uuidv4} from 'uuid';
import dayjs from 'dayjs';
import {MailerService} from '@nestjs-modules/mailer';

@Injectable()
export class AccountService {
  constructor(@InjectModel(Account.name) private accountModel: Model<Account>, 
  private readonly mailerService: MailerService
) {}

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

  async findByMail(email: string) {
    return await this.accountModel.findOne({ email });
  }

  async update(updateAccountDto: UpdateAccountDto) {
    return this.accountModel.updateOne(
      {_id: updateAccountDto._id}, {...updateAccountDto});
  }

  async remove(id: string) {
    if (!mongoose.isValidObjectId(id)) throw new BadRequestException('ID không hợp lệ', 'ID INVALID');
    
    return this.accountModel.deleteOne({_id: id});
  }

  async handleRegister(registerDto: CreateAuthDto) {
    const {username, email, password, phone} = registerDto;
    const checkMailExist = await this.isMailExist(email);
    if (checkMailExist) {throw new BadRequestException(`Email ${email} is exist.`, 'EMAIL EXIST');}
    const hashPassword = await hashPasswordUtil(registerDto.password);
    const codeId = uuidv4();
    const account = await this.accountModel.create({
        username, email, phone,
        password: hashPassword,
        isActive: false,
        verifyCode: codeId,
        verifyTime: dayjs().add(5, 'minute')
    })

    this.mailerService
      .sendMail({
        to: account.email, 
        subject: 'Activate your account', // Title
        text: 'welcome',
        template: "register", 
        context: { 
          name: account?.username ?? account.email,
          activationCode: codeId,
        },
      })

    return account._id;
  }
}
