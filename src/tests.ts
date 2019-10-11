export default class tests {
    public static plainJane: string = `Set tempo to 100 bpm
    Create beat A with layers:
      HAT: ({xxxx-x-xxxxxxxxx})*4
      SNR: (|-x-x|)*4
      KCK: ({x-----xx--x-----})*4
      OHT: ({------x---------})*4
    Play A`;

    public static twoSimpleBeats: string = `Set tempo to 120 bpm
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
    Play beat A B`;

    public static case1: string = `Set tempo to 85 bpm 
    Rhythms:
      Define HAT1 as {xxxx-x-xxxxxxxxx}
      Define INTROHAT as {xxxxxxxxxxxxxxxx}
    Create beat VERSE with layers: 
      HAT: (HAT1)*4 
      SNR: (|-x-x|)*4 
      KCK: ({x-----xx--x-----})*2 ({x-----xx--x-x--x})*2 
      OHT: ({----------------})*4 
    Play beat INTRO VERSE`;
    
    public static case2: string = `Set tempo to 85 bpm 
    Rhythms:
      Define HAT1 as {xxxx-x-xxxxxxxxx}
      Define INTROHAT as {xxxxxxxxxxxxxxxx}
    Create beat INTRO with layers: 
      HAT: (INTROHAT)*4 
    Create beat VERSE with layers: 
      HAT: (HAT1)*4 
      SNR: (|-x-x|)*4 
      KCK: ({x-----xx--x-----})*2 ({x-----xx--x-x--x})*2 
      OHT: ({----------------})*4 
    Play beat INTRO VERSE`;

    public static case3: string = `Set tempo to 85 bpm 
    Create beat VERSE with layers: 
      HAT: (HAT1)*4 
      SNR: (|-x-x|)*4 
      KCK: ({x-----xx--x-----})*2 ({x-----xx--x-x--x})*2 
      OHT: ({----------------})*4 
    Play beat VERSE
    `;

    
}

