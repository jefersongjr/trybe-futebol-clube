import * as jwt from 'jsonwebtoken';
import ThrowException from '../middlewares/exceptions/ThrowException';

export class tokenGenerate {
    static makeToken = (username: string , role: string, email: string) => {
        const jwtConfig: jwt.SignOptions = {
            expiresIn: '7d',
            algorithm : 'HS256'
        }
        const token = jwt.sign( { username , role, email}, 'jwt_secret', jwtConfig);
        return token;
     }

     static validateToken = async (token: string | undefined) => {
        const jwtConfig: jwt.VerifyOptions= {
            complete : true
        } 
        if (!token) throw new ThrowException(401, 'Token must be a valid token')
        try {
            const introspection = jwt.verify(token, 'jwt_secret',jwtConfig);
            console.log(introspection)
            return introspection;
        } catch (error) {
            throw new ThrowException(401, 'Token must be a valid token');
        }
     }
}
