import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { Algorithm_types } from 'src/types/types';

@Injectable()
export class HashingService {
  getHashed(input: string, encryptionKey: string = 'Put_Your_Password_Here') {
    // encryptionKey = crypto.randomBytes(16).toString('hex'); // 16 bytes for AES-128
    let key = crypto
      .createHash('sha256')
      .update(String(encryptionKey))
      .digest('base64')
      .substr(0, 32);
    const keyBuffer = Buffer.from(key, 'hex');
    let iv = crypto.randomBytes(16);
    const algorithms = [
      ...crypto.getHashes(), // Get hash algorithms
      // ...crypto.getCiphers(),
      'aes-128-cbc',
      'aes-192-cbc',
      'aes-256-cbc',
      'des-ede3-cbc',
      'rc2-cbc',
      'blowfish-cbc',
      'camellia-128-cbc',
      'camellia-192-cbc',
      'camellia-256-cbc',
    ];

    // const encryptionKey = 'Faisal'; // The encryption key

    const result: Record<string, string> = {}; // Object to store algorithm-value pairs

    for (const algorithm of algorithms) {
      if (crypto.getHashes().includes(algorithm)) {
        const hash = crypto.createHash(algorithm);
        hash.update(input);
        result[algorithm + ' (Hash)'] = hash.digest('hex');
      } else if (crypto.getCiphers().includes(algorithm)) {
        const cipher = crypto.createCipher(algorithm, encryptionKey);
        // const cipher = crypto.createCipheriv(algorithm, keyBuffer, iv);

        let encryptedValue = cipher.update(input, 'utf8', 'hex');
        encryptedValue += cipher.final('hex');
        result[algorithm + ' (Encrypted)'] = encryptedValue;
      }
    }

    return result;
  }

  hashValue(
    inputValue: string,
    algorithm: Algorithm_types,
    key?: string,
  ): string {
    try {
      const hash = crypto
        .createHmac(algorithm, key || '')
        .update(inputValue)
        .digest('hex');
      return hash;
    } catch (error) {
      console.error(
        `Error hashing with algorithm ${algorithm}:
         ${error.message}`,
      );
      return error.message;
    }
  }
  supportedAlogorithms(): string[] {
    return Object.values(Algorithm_types);
  }
  // testHashingAlgorithms() {
  // let i = 1;
  // const inputValue = 'your_input_data';
  // const optionalKey = 'your_optional_key';

  // Object.values(Algorithm_types).forEach((algorithm) => {
  //   const hashValue = this.hashValue(inputValue, algorithm, optionalKey);
  //   // console.log(`${i++} Algorithm: ${algorithm}, Hash: ${hashValue}`);
  //   console.log(i++);
  // });
  // return 'Done';
  // }
}

//////////////////////////////////////////
// import { Injectable } from '@nestjs/common';
// import * as crypto from 'crypto';

// @Injectable()
// export class HashingService {
//   getHashed(input: string) {
//     const algorithms = crypto.getHashes(); // Get a list of all supported hash algorithms
//     console.log(algorithms);
//     const result: Record<string, string> = {}; // Object to store algorithm-value pairs

//     for (const algorithm of algorithms) {
//       const hash = crypto.createHash(algorithm);
//       hash.update(input);
//       result[algorithm] = hash.digest('hex');
//     }

//     return result;
//   }
// }

////////////////////////////////////////////////////

// import { Injectable } from '@nestjs/common';
// import * as crypto from 'crypto'; // Import crypto as a namespace

// @Injectable()
// export class HashingService {
//   getHashed(input: string) {
//     const hash = crypto.createHash('sha256');
//     hash.update(input);
//     return hash.digest('hex');
//   }
// }
