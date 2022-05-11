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

describe('Invoices', function () {
  describe('vouchers', function () {
    it('confirmed vouchers are attached to an invoice', async function () {
      const mid = await fakeMID()
      const voucher = await client.generateVoucher()
      const res = await client.confirmVoucher(voucher.code, mid.mid)

      assert(res.success, true)
      assert.notEqual(res.data.invoice, null)
    })
  })

  describe('invoice transactions', function () {
    it('voucher is added to the invoice', async function () {
      const mid = await fakeMID()
      const v1 = await client.generateVoucher()
      const conf1 = await client.confirmVoucher(v1.code, mid.mid)

      const inv1 = await client.getInvoice(conf1.data.invoice)

      // console.log(inv1)
      const v2 = await client.generateVoucher()
      const conf2 = await client.confirmVoucher(v2.code, mid.mid)
      const inv2 = await client.getInvoice(conf2.data.invoice)

      // assert.equal(res.success, true)
      assert.equal(inv2.data.CollectorInvoiceLines.length, inv1.data.CollectorInvoiceLines.length + 1)
    })
  })
})
