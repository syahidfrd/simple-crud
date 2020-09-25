/* eslint-disable no-useless-catch */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const server = require('./main');

chai.use(chaiHttp);

describe('API Test', () => {
  describe('GET /product', () => {
    it('Should return products', async () => {
      try {
        const res = await chai.request(server).get('/product');
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('data');
      } catch (error) {
        throw error;
      }
    });
  });

  describe('GET /product/:id', () => {
    it('Should return data product', async () => {
      try {
        const res = await chai.request(server).get('/product/1');
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('data');
      } catch (error) {
        throw error;
      }
    });

    it('Should return product not found', async () => {
      try {
        const res = await chai.request(server).get('/product/10');
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('msg');
        expect(res.body.msg).to.equal('product not found');
      } catch (error) {
        throw error;
      }
    });
  });
});
