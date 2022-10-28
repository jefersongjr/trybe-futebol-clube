import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

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
  describe('quando o campo email não for informado', () => {
    it('deve retornar o status 400', async () => {
        const httpResponse = await chai
            .request(app)
            .post('/login')
            .send({password: 'admin_secret'})
            ;
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
});
