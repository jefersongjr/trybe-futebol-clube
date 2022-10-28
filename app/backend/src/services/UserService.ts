import User from '../database/models/UserModel'
import { tokenGenerate } from '../utils/tokenGenerate';
import ThrowException from '../middlewares/exceptions/ThrowException';
import * as bcrypt from 'bcryptjs'

export class UserService {
    public getLogin = async ( email: string , password: string ) => {
        if (!email || !password) throw new ThrowException(400, 'All fields must be filled');

        const user = await User.findOne({ where: { email }})

        if (!user) throw new ThrowException(401, 'Incorrect email or password');
        
        const validatePass = bcrypt.compareSync(password, user?.password);

        if (!validatePass) throw new ThrowException(401, 'Incorrect email or password');


        const token = tokenGenerate.makeToken(user);
        return token;
    }
}