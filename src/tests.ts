export default class tests {
    public static plainJane: string = `Set tempo to 100 bpm
    Create beat A with layers:
      HAT: ({xxxx-x-xxxxxxxxx})*4
      SNR: (|-x-x|)*4
      KCK: ({x-----xx--x-----})*4
      OHT: ({------x---------})*4
    Play A`;

    public static twoSimpleBeatsA: string = `Set tempo to 120 bpm
    Rhythms:
      Define HAT1 as {xxxxxxxxxxxxxxxx}
      Define SNR1 as [--x---x-]
      Define KCK1 as |x-x-|
    Create beat A with layers:
      HAT: HAT1
      SNR: SNR1
      KCK: KCK1
    Create beat B with layers:
      HAT: KCK1
      SNR: SNR1
      KCK: HAT1
    Play A B`;

    public static twoSimpleBeatsB: string = `Set tempo to 120 bpm
    Rhythms:
      Define HAT1 as {xxxxxxxxxxxxxxxx}
      Define SNR1 as [--x---x-]
      Define KCK1 as |x-x-|
    Create beat A with layers:
      HAT: {xxxxxxxxxxxxxxxx}
      SNR: [--x---x-]
      KCK: KCK1
    Create beat B with layers:
      HAT: KCK1
      SNR: SNR1
      KCK: HAT1
    Play A B`;

    public static twoSimpleBeatsC: string = `Set tempo to 120 bpm
    Rhythms:
      Define HAT1 as {xxxxxxxxxxxxxxxx}
      Define SNR1 as [--x---x-]
      Define KCK1 as |x-x-|
    Create beat A with layers:
      HAT: ({xxxx-x-xxxxxxxxx})*4
      SNR: [--x---x-]
      KCK: (|-x-x|)*4
    Create beat B with layers:
      HAT: KCK1
      SNR: SNR1
      KCK: HAT1
    Play A B`;


    // should fail!
    public static case1: string = `Set tempo to 85 bpm
    Rhythms:
      Define HAT1 as {xxxx-x-xxxxxxxxx}
      Define INTROHAT as {xxxxxxxxxxxxxxxx}
    Create beat VERSE with layers:
      HAT: (HAT1)*4
      SNR: (|-x-x|)*4
      KCK: ({x-----xx--x-----})*2 ({x-----xx--x-x--x})*2
      OHT: ({----------------})*4
    Play INTRO VERSE`;

    public static case2: string =
    `Set tempo to 85 bpm
Rhythms:
  Define VERSEHAT as {xxxx-x-xxxxxxxxx}
  Define INTROHAT as {xxxxxxxxxxxxxxxx}
  Define BASICKICK as {x-----xx--x-----}
Create beat INTRO with layers:
  HAT: (INTROHAT)*8
Create beat VERSE with layers:
  HAT: (VERSEHAT)*4
  SNR: (|-x-x|)*4
  KCK: BASICKICK {x-----xx--x---x-} {x-----xx--x--x-x} BASICKICK
  OHT: ({------x---------})*4
Play VERSE`;

    public static case3: string = `Set tempo to 85 bpm
    Create beat VERSE with layers:
      HAT: (HAT1)*4
      SNR: (|-x-x|)*4
      KCK: ({x-----xx--x-----})*2 ({x-----xx--x-x--x})*2
      OHT: ({----------------})*4
    Play VERSE`;


}

