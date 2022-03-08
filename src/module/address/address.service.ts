import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@/module/user';

import { CreateAddressRequest, AddressResponse } from './dto';
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

  async getOne(id: number, user: User): Promise<AddressResponse> {
    const address = await this.addressRepository.findOne({
      id,
      user,
    });

    if (!address) {
      throw new HttpException(ADDRESS_ERROR.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return new AddressResponse(address);
  }

  async remove(id: number, user: User) {
    const result = await this.addressRepository.delete({
      id,
      user,
    });

    if (result.affected <= 0) {
      throw new HttpException(
        ADDRESS_ERROR.DELETE_ERROR,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
