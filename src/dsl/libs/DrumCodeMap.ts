import { DrumType } from '../ast/DrumType';

class DrumCodeMap {
  static drumCodes: number[] = [21, 71, 37, 55, 1, 80, 17, 79, 64, 32, 45, 90, 95, 170, 177, 135];

  static getDrumCode(drumName: DrumType): number {
    switch (drumName) {
      case 'CLP':
        return 21;
      case 'CSH':
        return 71;
      case 'HAT':
        return 37;
      case 'OHT':
        return 55;
      case 'KCK':
        return 1;
      case 'RDE':
        return 80;
      case 'SNR':
        return 17;
      case 'TM1':
        return 79;
      case 'TM2':
        return 64;
      case 'TM3':
        return 32;
      case 'PED':
        return 45;
      case 'RBL':
        return 90;
      case 'TMB':
        return 95;
      case 'CAB':
        return 170;
      case 'MAR':
        return 177;
      case 'MHC':
        return 135;
      default:
        throw new Error(`Invalid drum name: ${drumName}`);
    }
  }
}

export default DrumCodeMap
