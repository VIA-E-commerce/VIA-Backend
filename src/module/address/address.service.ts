import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { PagingQuery, useTransaction } from '@/common';
import { User } from '@/module/user';

import {
  CreateAddressRequest,
  EditAddressRequest,
  AddressResponse,
} from './dto';
import { Address } from './entity';
import { ADDRESS_ERROR } from './address.constant';

@Injectable()
export class AddressService {
  constructor(
    private readonly connection: Connection,
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

  async getMe(
    { pageNum, pageSize }: PagingQuery,
    user: User,
  ): Promise<AddressResponse[]> {
    const addresses = await this.addressRepository.find({
      where: {
        user,
      },
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
      order: {
        isDefault: 'DESC',
        createdAt: 'DESC',
      },
    });

    return addresses.map((address) => new AddressResponse(address));
  }

  async edit(id: number, dto: EditAddressRequest, user: User): Promise<void> {
    await useTransaction(this.connection, async (manager) => {
      const addressRepository = manager.getRepository(Address);

      if (dto.isDefault) {
        await addressRepository.update(
          {
            isDefault: true,
            user,
          },
          {
            isDefault: false,
          },
        );
      }

      const result = await addressRepository.update(
        {
          id,
          user,
        },
        dto,
      );

      if (result.affected <= 0) {
        throw new HttpException(
          ADDRESS_ERROR.UPDATE_ERROR,
          HttpStatus.BAD_REQUEST,
        );
      }
    });
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
