import User from '../database/models/UserModel'
import { tokenGenerate } from '../utils/tokenGenerate';
import ThrowException from '../middlewares/exceptions/ThrowException';
import * as bcrypt from 'bcryptjs'
import { Jwt } from 'jsonwebtoken';

export class UserService {
    public getLogin = async ( email: string , password: string ) => {
        if (!email || !password) throw new ThrowException(400, 'All fields must be filled');

        const user = await User.findOne({ where: { email }})
        

        if (!user) throw new ThrowException(401, 'Incorrect email or password');
        
        const validatePass = bcrypt.compareSync(password, user?.password);

        if (!validatePass) throw new ThrowException(401, 'Incorrect email or password');

        const { username, role } = user;
        const token = tokenGenerate.makeToken(username, role, email );
        return token;
    }

    public getLoginValidate = async (token: string | undefined) => {
     if (!token) throw new ThrowException(401, 'Token invalid');
     const user = await tokenGenerate.validateToken(token);
     console.log(user)
     return user as Jwt;
    }
}