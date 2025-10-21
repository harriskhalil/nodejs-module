import * as bcrypt from 'bcrypt';

export class HashService {
  static hash(value: string) {
    return bcrypt.hash(value, 10);
  }
  static compare(plainText: string, hashValue: string) {
    return bcrypt.compare(plainText, hashValue);
  }
}
