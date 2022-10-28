import * as jwt from 'jsonwebtoken';

export class tokenGenerate {
    static makeToken = (payload: unknown) => {
        const jwtConfig: jwt.SignOptions = {
            expiresIn: '7d',
            algorithm : 'HS256'
        }
        const token = jwt.sign({data: payload}, 'jwt_secret', jwtConfig);
        return token;
     }
}