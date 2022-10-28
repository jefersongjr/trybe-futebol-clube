import { ILogin } from '../interfaces';
import User from '../database/models/UserModel'
import { tokenGenerate } from '../utils/tokenGenerate';
import * as bcrypt from 'bcryptjs'

export class UserService {
    public getLogin = async ( email: string , password: string ) => {
        const user = await User.findOne({ where: { email }})
        if (!user) throw new ThrowException(401, 'Username or password invalid');
        

        const validatePass = bcrypt.compareSync(password, user?.password);

        if (!user) throw new ThrowException(401, 'Username or password invalid');


        const token = tokenGenerate.makeToken(user);
        return token;
    }
}