# binary-beats

project doc: https://docs.google.com/document/d/1pXFMwa_RV8snXHQbCD4V427rB7FA4Ny0S2IkgWzWXtM/edit#heading=h.tq1b2yrt6f1m
demo link: https://binary-beats.firebaseapp.com/

## Usage Instructions

To start web app:

- `yarn start`

## Internal Beat API Summary

Here is a summary of how midi-sounds-react represents their sequences

- uses array of arrays
- top level array represents a bar (AKA measure)
- top level array is split by the pre-defined subdivisions
- so a one bar array for a 16th note subdivided track, would have 16 entries
- a 2 bar array for a 16th note subdivided track would have 32 entries
- a 2 bar array for an 8th note subdivided track would have 16 entries, etc.
- each inner array represents a beat
- the reason it is an array instead of just a value is so we can specify multiple instruments to play at the same beat
- each beat is an array with two entries
- the first entry is where you put the drum sounds you want to play
- the second entry is where you put the melodic sounds you want to play (we'll always leave this empty)
- each entry is itself an array
- confused yet? Check out the examples!

### Examples

Here is a very simple drum beat (the video is long but just get the gist):

[Click me](https://www.youtube.com/watch?v=4SDBJp_B5qQ)

We can represent this beat like so, notice each second entry is an empty array, because we're only doing drums:

```js
const KICK = 5;
const SNARE = 15;
const HIHAT = 35;

const simpleBeat8 = [
  [[HIHAT, KICK], []],     // 1
  [[HIHAT], []],           // and
  [[HIHAT, SNARE], []],    // 2
  [[HIHAT], []],           // and
  [[HIHAT, KICK], []],     // 3
  [[HIHAT], []],           // and
  [[HIHAT, SNARE], []],    // 4
  [[HIHAT], []],           // and
]
```

And run it like this: `midiSounds.startPlayLoop(simpleBeat8, 120, 1 / 8);`

We could also represent this with 16th note subdivisions (without variables):

```js
const simpleBeat16 = [
  [[35, 5], []],        // 1
  [[], []],             // e
  [[35], []],           // and
  [[], []],             // a
  [[35, 15], []],       // 2
  [[], []],             // e
  [[35], []],           // and
  [[], []],             // a
  [[35, 5], []],        // 3
  [[], []],             // e
  [[35], []],           // and
  [[], []],             // a
  [[35, 15], []],       // 4
  [[], []],             // e
  [[35], []],           // and
  [[], []],             // a
]
```

And run it like this: `midiSounds.startPlayLoop(simpleBeat16, 120, 1 / 16);`
