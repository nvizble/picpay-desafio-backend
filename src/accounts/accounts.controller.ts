import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Logger } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Response } from 'express';

@Controller('accounts')
export class AccountsController {
    constructor(private readonly accountsService: AccountsService) { }

    @Post()
    async create(@Body() createAccountDto: CreateAccountDto, @Res() res: Response) {
        try {

            const promiseAccountByEmail = this.accountsService.findOneByEmail(createAccountDto.email)
            const promiseAccountByDoc = this.accountsService.findOneByDoc(createAccountDto.doc)

            const [accountByEmail, accountByDoc] = await Promise.all([promiseAccountByEmail, promiseAccountByDoc])

            if (accountByEmail) {
                return res.status(HttpStatus.CONFLICT).json({ message: "Email ja cadastrado" })
            }

            if (accountByDoc) {
                return res.status(HttpStatus.CONFLICT).json({ message: "Doc ja cadastrado" })
            }

            const account = await this.accountsService.create(createAccountDto)


            delete account.password

            return res.status(HttpStatus.CREATED).json({ account })

        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message })
        }
    }

    @Get()
    async findAll() {
        return this.accountsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.accountsService.findOne(+id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto, @Res() res: Response) {

        if (updateAccountDto.email) {
            const accountByEmail = await this.accountsService.findOneByEmail(updateAccountDto.email)

            if (accountByEmail) {
                return res.status(HttpStatus.CONFLICT).json({ message: "Email ja cadastrado" })
            }
        }


        if (updateAccountDto.doc) {
            const accountByDoc = await this.accountsService.findOneByDoc(updateAccountDto.doc)

            if (accountByDoc) {
                return res.status(HttpStatus.CONFLICT).json({ message: "Doc ja cadastrado" })
            }

        }

        const updatedAccount = await this.accountsService.update(+id, updateAccountDto);

        return res.status(HttpStatus.ACCEPTED).json({ updatedAccount })

    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.accountsService.remove(+id);
    }
}
