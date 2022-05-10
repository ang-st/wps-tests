var assert = require('assert');
const faker = require('@faker-js/faker').faker
const Client = require('../src/ips_client')
let client = null
beforeEach(async function () {
  client= new Client()
});


describe('Point of sale', function () {
  describe('create', function () {
    it('can create a new mid', async function () {

      const payload = {"mid": Date.now(),
      "name":faker.company.companyName(),
       "address":faker.address.streetAddress(),
       "city":faker.address.city(),
       "postal_code":faker.address.zipCode(), "active":true}
      
       const  res= await client.createMID(payload) 
       assert.equal(res.mid, payload.mid);
    })

    it('can return an error on trying to  create same mid', async function () {

      const payload = {"mid": Date.now(),
      "name":faker.company.companyName(),
       "address":faker.address.streetAddress(),
       "city":faker.address.city(),
       "postal_code":faker.address.zipCode(), "active":true}
      
       await client.createMID(payload) 
       const  res= await client.createMID(payload) 
      
       assert.equal(res.success, false);
    });
  });

  describe('update', function () {
    it('can update previously created mid', async function () {

      const payload = {"mid": Date.now(),
      "name":faker.company.companyName(),
       "address":faker.address.streetAddress(),
       "city":faker.address.city(),
       "postal_code":faker.address.zipCode(), "active":true}
     
       

       await client.createMID(payload) 
       payload.address = faker.address.streetAddress()
       const  res= await client.updateMID(payload) 

       
      
       //console.log(res)
       assert.equal(res.address, payload.address);
    });

  });
})