import * as crypto from 'crypto'

export class Donger {
  id = crypto.randomBytes(16).toString('hex')
  constructor(public name: string, public body: string) {}
}
