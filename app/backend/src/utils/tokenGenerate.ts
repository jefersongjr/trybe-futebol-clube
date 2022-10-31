import * as jwt from 'jsonwebtoken';
import ThrowException from '../middlewares/exceptions/ThrowException';

export class tokenGenerate {
    static makeToken = (payload: Object | string) => {
        const jwtConfig: jwt.SignOptions = {
            expiresIn: '7d',
            algorithm : 'HS256'
        }
        console.log(payload)
        const token = jwt.sign( payload, 'jwt_secret', jwtConfig);
        return token;
     }

     static validateToken = async (token: string | undefined) => {
        const jwtConfig: jwt.VerifyOptions= {
            complete : true
        } 
        if (!token) throw new ThrowException(401, 'Token invalid')
        try {
            const introspection = jwt.verify(token, 'jwt_secret', jwtConfig);
            return introspection;
        } catch (error) {
            throw new ThrowException(401, 'Expired or invalid token');
        }
     }
}
