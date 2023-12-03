import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class HashingService {
  getHashed(input: string, encryptionKey: string = 'Faisal') {
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
        let encryptedValue = cipher.update(input, 'utf8', 'hex');
        encryptedValue += cipher.final('hex');
        result[algorithm + ' (Encrypted)'] = encryptedValue;
      }
    }

    return result;
  }
}

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
