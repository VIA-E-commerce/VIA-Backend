import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@/module/user';

import { CreateAddressRequest } from './dto';
import { Address } from './entity';
import { ADDRESS_ERROR } from './address.constant';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async register(dto: CreateAddressRequest, user: User) {
    const newAddress = await this.addressRepository.save(
      this.addressRepository.create({
        ...dto,
        user,
      }),
    );

    if (!newAddress) {
      throw new HttpException(
        ADDRESS_ERROR.CREATE_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
