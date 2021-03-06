export const drake = 
`Set tempo to 100 bpm 
Rhythms:
  Define REST as |----|
  Define HATS as |xxxx|
Create beat INTRO with layers: 
  SNR: {x-x-xx-x-xxxxxx-}
Create beat VERSE with layers: 
  SNR: (|-x-x|)*7
  OHT: (REST {---------------x})*3
  PED: (HATS)*7
  KCK: (|x-x-| {x-------x------x})*3 |x-x-|
  HAT: ({xxxxxxxxxxxxxxx-})*7
Play VERSE INTRO`;

export const nightmare = 
`Set tempo to 129 bpm
Rhythms:
  Define RIDEQUARTER as |xxxx|
  Define RIDESIXTEEN as {x---x---x-xx-xx-}
  Define REST as |----|
  Define CRASHEIGHT as [x-x-x-x-]
Create beat CHORUS1 with layers: 
  RDE: RIDEQUARTER RIDESIXTEEN RIDEQUARTER |xx--|
  KCK: ({xxxxxxxxxxxxxxxx})*3 {xxxxxxxxx-x-x---}
  SNR: (|-x-x|)*3 |-xx-|
  TM1: (REST)*3 [-----x--]
  TM3: (REST)*3 [------x-]
Create beat CHORUS2 with layers:
  CSH: (CRASHEIGHT)*3                   [x-x-x---]
  KCK: [x--x---x] [x--x-x-x] [x--x---x] {x-----x---xxxxxx}
  SNR: [----x---] [----x-x-] [----x---] {--------x-xxxxxx}
Create beat CHORUS3 with layers:
  KCK: [x--x---x] [x--x-x-x] [x--x---x] [x--x-x-x] [x-xxxxxx] |x---|
  SNR: [----x---] [----x-x-] [----x---] [----x-x-] [--xxxxxx] |x---|
  CSH: (CRASHEIGHT)*5                                         |x---|
  
Play CHORUS1 CHORUS2 CHORUS3`;

export const plainJane = 
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

export const getLow =
`Set tempo to 101 bpm 
Create beat INTRO with layers: 
  KCK: ([x--x--x-])*3 [x--x----]
  CLP: ([--x---x-])*3 [--x-----]
Create beat VERSE with layers:
  KCK: ([x--x--x-])*3 [x--x----]
  CLP: ([--x---x-])*3 [--x-----]
  HAT: ({xxxxxxxxxxxxxxxx})*4
Play INTRO VERSE`;