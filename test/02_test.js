var assert = require('assert');
const faker = require('@faker-js/faker').faker
const Client = require('../src/ips_client')
let client = null
beforeEach(async function () {
  client= new Client()

});


describe('Top-up', function () {
  describe('faucet', function () {
    it('can generate a valid voucher', async function () {
      
       const res = await client.generateVoucher()
       assert('code' in res);
    })

    it('can also make killed voucher', async function () {
       const res = await client.generateVoucher(true)

       assert('code' in res);
       assert.equal(res.killed, true);
    });

  });
  describe('confirm', function () {
    it('can confirm a valid voucher', async function () {
      
      const res = await client.generateVoucher()

      assert('code' in res);
   })
    it('reject a killed voucher', async function () {
      
      const res = await client.generateVoucher(true)
      

      assert('code' in res);
   })


  })


})