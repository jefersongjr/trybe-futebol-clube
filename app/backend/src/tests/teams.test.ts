import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as bcrypt from 'bcryptjs';

import { app } from '../app';

import { Response } from 'superagent';
import Team from '../database/models/TeamModel';
import { teams } from '../utils/teamDataBase'

chai.use(chaiHttp);

const { expect } = chai;

describe('testando o EndPoint "/teams"', () => {
  describe('quando a requisição for feita corretamente', () => {
    const response = teams;
    beforeEach(() => {
      sinon.stub(Team, 'findAll').resolves();
     });

     afterEach(() => sinon.restore())

    it('deve retornar o status 200', async () => {
        const httpResponse = await chai
            .request(app)
            .get('/teams')
        expect(httpResponse.status).to.be.equal(200);
      });
    });
}); 
