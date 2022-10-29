import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as bcrypt from 'bcryptjs';

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import User from '../database/models/UserModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('testando o EndPoint "/login"', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  describe('quando a requisição for feita corretamente', () => {
    const user = {
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: 'secret_admin'
    };

    beforeEach(() => {
      sinon.stub(User, 'findOne').resolves(user as User);
      sinon.stub(bcrypt, 'compareSync').resolves(true);
     });

     afterEach(() => sinon.restore())

    
    it('deve retornar o status 200', async () => {
        const httpResponse = await chai
            .request(app)
            .post('/login')
            .send({email: 'admin@admin.com', password: 'admin_secret'});
        expect(httpResponse.status).to.be.equal(200);
      });
    });

  describe('quando o campo email não for informado', () => {
    it('deve retornar o status 400', async () => {
        const httpResponse = await chai
            .request(app)
            .post('/login')
            .send({password: 'admin_secret'});
        expect(httpResponse.status).to.equal(400);
        expect(httpResponse.body).to.deep.equal({message: 'All fields must be filled'})
      });
    });
    
    describe('quando o campo password não for informado', () => {
        it('deve retornar o status 400', async () => {
            const httpResponse = await chai
                .request(app)
                .post('/login')
                .send({email: 'admin@admin.com'})
                ;
            expect(httpResponse.status).to.equal(400);
            expect(httpResponse.body).to.deep.equal({message: 'All fields must be filled'})
          });
        });

        describe('quando o email estiver incorreto ou não cadastrado', () => {
          const user = {
            username: 'Admin',
            role: 'admin',
            email: 'admin@admin.com',
            password: 'secret_admin'
          };
      
          beforeEach(() => {
            sinon.stub(User, 'findOne').resolves(null);
           });
      
           afterEach(() => sinon.restore())
      
          
          it('deve retornar o status 401', async () => {
              const httpResponse = await chai
                  .request(app)
                  .post('/login')
                  .send({email: 'emailerrado@admin.com', password: 'admin_secret'});
              expect(httpResponse.status).to.be.equal(401);
              expect(httpResponse.body).to.deep.equal({message: 'Incorrect email or password'})
            });
          });

          describe('quando o password estiver incorreto ou não cadastrado', () => {
            const user = {
              username: 'Admin',
              role: 'admin',
              email: 'admin@admin.com',
              password: 'kdiadgahdajdkmsadasbdyasbdiapdmalsdsbdad'
            };
        
            beforeEach(() => {
              sinon.stub(bcrypt, 'compareSync').resolves(false);
            });
        
             afterEach(() => sinon.restore())
        
            
            it('deve retornar o status 401', async () => {
                const httpResponse = await chai
                    .request(app)
                    .post('/login')
                    .send({email: 'emailerrado@admin.com', password: 'senha_errada'});
                expect(httpResponse.status).to.be.equal(401);
                expect(httpResponse.body).to.deep.equal({message: 'Incorrect email or password'})
              });
            });
    });
