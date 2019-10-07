import { DrumType } from '../ast/DrumType';

class DrumCodeMap {
  static getDrumCode(drumName: DrumType): number {
    switch (drumName) {
      case 'CLP':
        return 0;
      case 'CSH':
          return 0;
      case 'HAT':
        return 35;
      case 'KCK':
        return 5;
      case 'RDE':
        return 0;
      case 'SNR':
        return 15;
      case 'TM1':
        return 0;
      case 'TM2':
        return 0;
      case 'TM3':
        return 0;
      default:
        throw new Error('Invalid drum name');
    }
  }
}

export default DrumCodeMap
