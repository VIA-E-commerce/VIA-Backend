import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { PagingQuery, throwExceptionOrNot, useTransaction } from '@/common';
import { EXCEPTION } from '@/docs';
import { Address, User } from '@/models';

import {
  CreateAddressRequest,
  EditAddressRequest,
  AddressResponse,
} from './dto';

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
    throwExceptionOrNot(newAddress, EXCEPTION.ADDRESS.CREATE_ERROR);
  }

  async getOne(id: number, user: User): Promise<AddressResponse> {
    const address = await this.addressRepository.findOne({
      id,
      user,
    });
    throwExceptionOrNot(address, EXCEPTION.ADDRESS.NOT_FOUND);

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

      throwExceptionOrNot(result.affected, EXCEPTION.ADDRESS.UPDATE_ERROR);
    });
  }

  async remove(id: number, user: User) {
    const result = await this.addressRepository.delete({
      id,
      user,
    });

    throwExceptionOrNot(result.affected, EXCEPTION.ADDRESS.DELETE_ERROR);
  }
}
