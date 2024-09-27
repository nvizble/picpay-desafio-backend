import { IsAlpha, IsEmail, IsNotEmpty, IsNumberString, IsString, MinLength } from 'class-validator';

export class CreateAccountDto {
    @IsNotEmpty({ message: 'O campo nome é obrigatório' })
    @IsString({ message: "Nome deve ser do tipo string" })
    @IsAlpha("pt-BR", { message: "O nome deve apenas conter caracteres do alfabeto " })
    name: string;
    @IsEmail({}, { message: "Email deve ser enviado em um formato valido" })
    @IsNotEmpty({ message: 'O campo email é obrigatório' })
    email: string;

    @IsNotEmpty({ message: 'O campo documento é obrigatório' })
    @IsNumberString({}, { message: "Doc apenas deve conter numeros" })
    doc: string;

    @IsString({ message: "Senha deve ser do tipo string" })
    @MinLength(3, { message: "Senha deve conter no minimo 3 caracteres" })
    password: string;

    @IsNotEmpty({ message: "account_type é obrigatorio" })
    @IsString({ message: "account_type deve ser do tipo string" })
    account_type: string;
}
