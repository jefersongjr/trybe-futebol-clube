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
  describe('Rota para retornar todos os times corretamente', () => {
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
    describe('filtrando time por id corretamente', () => {
        const response = teams;
        beforeEach(() => {
          sinon.stub(Team, 'findByPk').resolves(teams[1] as Team);
         });
    
         afterEach(() => sinon.restore())
    
        it('deve retornar o status 200', async () => {
            const httpResponse = await chai
                .request(app)
                .get('/teams/1')
            expect(httpResponse.status).to.be.equal(200);
          });
        });

        describe('filtrando time por id com id inválido', () => {
            const response = teams;
            beforeEach(() => {
              sinon.stub(Team, 'findByPk').resolves(null);
             });
        
             afterEach(() => sinon.restore())
        
            it('deve retornar o status 401', async () => {
                const httpResponse = await chai
                    .request(app)
                    .get('/teams/17')
                expect(httpResponse.status).to.be.equal(401);
                expect(httpResponse.body).to.deep.equal({message: 'Team not exists'});
              });
            });
}); 
