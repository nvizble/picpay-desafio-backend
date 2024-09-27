import { Injectable, Logger } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from "bcrypt"

@Injectable()
export class AccountsService {
    constructor(readonly db: PrismaService) { }

    async create(createAccountDto: CreateAccountDto) {
        try {
            const account = await this.db.accounts.create({
                data: {
                    name: createAccountDto.name,
                    email: createAccountDto.email,
                    doc: createAccountDto.doc,
                    password: await bcrypt.hash(createAccountDto.password, 10),
                    account_type: createAccountDto.account_type
                }
            })

            return account;

        } catch (error) {
            Logger.error(error)
            return error
        }
    }

    async findAll() {
        return await this.db.accounts.findMany()
    }

    async findOne(id: number) {
        return this.db.accounts.findUnique({
            where: {
                id
            }
        });
    }

    async findOneByEmail(email: string) {
        return await this.db.accounts.findUnique({
            where: {
                email
            }
        })
    }

    async findOneByDoc(doc: string) {
        return await this.db.accounts.findUnique({
            where: {
                doc
            }
        })
    }

    async update(id: number, updateAccountDto: UpdateAccountDto) {
        const updatedAccount = await this.db.accounts.update({
            where: {
                id,
            },
            data: {
                ...updateAccountDto
            },
        }
        )
        return updatedAccount
    }

    async remove(id: number) {
        return await this.db.accounts.delete({
            where: {
                id
            }
        }
        )
    }
}
