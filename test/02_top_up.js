const assert = require('assert')
const faker = require('@faker-js/faker').faker
const Client = require('../src/ips_client')
let client = null
/* eslint-env mocha */
beforeEach(async function () {
  client = new Client()
})

const fakeMID = async function () {
  const payload = {
    mid: Date.now(),
    name: faker.company.companyName(),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    postal_code: faker.address.zipCode(),
    active: true
  }

  return client.createMID(payload)
}

describe('Top-up', function () {
  describe('faucet', function () {
    it('can generate a valid voucher', async function () {
      const res = await client.generateVoucher()
      assert('code' in res)
    })

    it('can also generate killed voucher', async function () {
      const res = await client.generateVoucher(true)

      assert('code' in res)
      assert.equal(res.killed, true)
    })
  })
  describe('confirm', function () {
    it('can confirm a valid voucher', async function () {
      const mid = await fakeMID()
      const voucher = await client.generateVoucher()
      const res = await client.confirmVoucher(voucher.code, mid.mid)

      assert(res.success, true)
    })

    it('reject a killed voucher', async function () {
      const mid = await fakeMID()
      const voucher = await client.generateVoucher(true)
      const res = await client.confirmVoucher(voucher.code, mid.mid)

      assert.equal(res.success, false)
    })

    it('reject a valid voucher and invalid mid', async function () {
      const voucher = await client.generateVoucher(true)
      const res = await client.confirmVoucher(voucher.code, 0)

      assert.equal(res.success, false)
    })
  })
  describe('check', function () {
    it('is available upon voucher creation', async function () {
      const voucher = await client.generateVoucher()
      const res = await client.checkVoucher(voucher.code)

      assert.equal(res.success, true)
      assert.equal(res.data.code, voucher.code)
    })

    it('update after voucher validation', async function () {
      const mid = await fakeMID()
      const voucher = await client.generateVoucher()
      const status = await client.checkVoucher(voucher.code)

      assert.equal(status.data.billed, false)

      await client.confirmVoucher(voucher.code, mid.mid)
      const updated = await client.checkVoucher(voucher.code)

      assert.equal(updated.data.billed, true)
      assert.equal(updated.data.code, status.data.code)
    })
  })
})
