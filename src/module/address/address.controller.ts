import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PagingQuery } from '@/common';
import { CurrentUser, JwtAuthGuard } from '@/module/auth';
import { User } from '@/module/user';

import { CreateAddressRequest, AddressIdParam, AddressResponse } from './dto';
import { AddressService } from './address.service';
import { AddressControllerDoc as Doc } from './address.controller.doc';

@ApiTags('주소 API')
@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Doc.register('주소 저장')
  @Post()
  @UseGuards(JwtAuthGuard)
  async register(@Body() dto: CreateAddressRequest, @CurrentUser() user: User) {
    await this.addressService.register(dto, user);
  }

  @Doc.getOne('주소 조회')
  @Get(':id(\\d+)')
  @UseGuards(JwtAuthGuard)
  async getOne(
    @Param() { id }: AddressIdParam,
    @CurrentUser() user: User,
  ): Promise<AddressResponse> {
    return this.addressService.getOne(id, user);
  }

  @Doc.getMe('내 주소 목록 조회')
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(
    @Query() pagingQuery: PagingQuery,
    @CurrentUser() user: User,
  ): Promise<AddressResponse[]> {
    return this.addressService.getMe(pagingQuery, user);
  }

  @Doc.remove('주소 삭제')
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param() { id }: AddressIdParam, @CurrentUser() user: User) {
    await this.addressService.remove(id, user);
  }
}