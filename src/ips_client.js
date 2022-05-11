require('dotenv').config()
const rp = require('request-promise')

class IpsClient {
  constructor () {
    this.root = process.env.POS_SERVER_ROOT ? process.env.POS_SERVER_ROOT : 'http://localhost:3000'

    this.auth_headers = {
      'X-API-KEY': process.env.UUID,
      'X-API-SECRET': process.env.KEY
    }
  }

  log (message) {
    console.log(`IPS API CLIENT: ${message}`)
  }

  async confirmVoucher (code, mid) {
    return await rp({
      uri: `${this.root}/V1/worldline/top-up/confirm/${code}`,
      json: true,
      body: { mid },
      method: 'POST',
      headers: this.auth_headers

    })
  }

  async checkVoucher (code) {
    const route = '/V1/worldline/top-up/check/'
    return await rp({
      uri: `${this.root}${route}${code}`,
      json: true,
      method: 'GET',
      headers: this.auth_headers

    })
  }

  async generateVoucher (killed = false) {
    const kill = killed ? '/killed' : ''
    const route = '/V1/worldline/top-up/faucet' + kill
    return await rp({
      uri: `${this.root}${route}`,
      json: true,
      method: 'GET',
      headers: this.auth_headers

    })
  }

  async createMID (data) {
    const route = '/V1/worldline/pos/create'
    return await rp({
      uri: `${this.root}${route}`,
      json: true,
      method: 'POST',
      body: data,
      headers: this.auth_headers

    })
  }

  async updateMID (data) {
    const route = '/V1/worldline/pos/update'
    return await rp({
      uri: `${this.root}${route}`,
      json: true,
      method: 'POST',
      body: data,
      headers: this.auth_headers

    })
  }

  async listInvoices () {
    const route = '/V1/member/invoices'
    return await rp({
      uri: `${this.root}${route}`,
      json: true,
      method: 'GET',
      headers: this.auth_headers

    })
  }

  async getInvoice (uuid) {
    const route = `/V1/member/invoice/${uuid}`
    return await rp({
      uri: `${this.root}${route}`,
      json: true,
      method: 'GET',
      headers: this.auth_headers

    })
  }
}

module.exports = IpsClient
