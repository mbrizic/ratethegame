import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto, GetUserDto, LoginUserDto, UpdateUserCommand } from '../users/users.dto';
import HttpException from '../core/exceptions/HttpException';
import { DataStoredInToken, TokenData } from '../auth/auth.interface';
import { isEmptyObject } from '../core/util';
import { Users } from '../../models/users';
import UserService from '../users/users.service';

class AuthService {
  private users = Users;
  private usersService = new UserService()

  public async signup(dto: CreateUserDto): Promise<GetUserDto> {
    return await this.usersService.createUser(dto)
  }

  public async login(dto: LoginUserDto): Promise<{ cookie: string, user: GetUserDto }> {
    if (isEmptyObject(dto)) {
      throw new HttpException(400, "Incorrect input data");
    }

    const user = await this.users.findOne({ where: { email: dto.email } });
    if (!user) {
      throw new HttpException(409, `Email ${dto.email} not found`);
    } 

    const isPasswordMatching: boolean = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordMatching) {
      throw new HttpException(409, "Password not matching");
    }

    const tokenData = this.createToken(user.id);
    const cookie = this.createCookie(tokenData);

    return { cookie, user: this.mapToDto(user) };
  }

  public async logout(userData: UpdateUserCommand): Promise<GetUserDto> {
    if (isEmptyObject(userData)) {
      throw new HttpException(400, "Incorrect input data");
    }

    const user = await this.users.findOne({ where: { password: userData.password } });
    if (!user) {
      throw new HttpException(409, "User not found");
    }

    return this.mapToDto(user);
  }

  public createToken(userId: number): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: userId };
    const secret: string = process.env.JWT_SECRET;
    const expiresIn: number = 60 * 60 * 24;

    return { expiresIn, token: jwt.sign(dataStoredInToken, secret, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }

  private mapToDto(model: Users): GetUserDto {
    return {
      id: model.id,
      email: model.email,
      password: model.password,
    }
  }
}

export default AuthService;
