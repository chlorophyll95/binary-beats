# Welcome to Binary Beats!

Binary Beats is a DSL which is made in order for users to create various beats using a sequence of x's and dashes.

## Setting a tempo

It is very simple to set up the tempo of your beat. All you have to write at the top of your file is:

```
Set tempo to <NUMBER_OF_BEATS> bpm
```
## Beats

Beats are the atomic components of Binary Beats. A **beat** is simply an `x`, which represents a hit beat, or a `-` (dash), which represents a missed beat (rest). 

```
 x : Hit beat
 - : Missed beat (rest)
```

### Percussion Elements
The percussion elements that we currently support are:

|Drum Type             | Drum code |
|:---------------------|:----------|
| Hi-hat               | HAT |
| Snare                | SNR |
| Kick                 | KCK |
| Tom 1                | TM1 |
| Tom 2                | TM2 |
| Tom 3                | TM3 |
| Open Hi-hat          | OHT |
| Pedal Hi-hat         | PED |
| Crash                | CSH |
| Ride                 | RDE |
| Ride bell            | RBL |
| Tambourine           | TMB |
| Cabasa               | CAB |
| Maraca               | MAR |
| Mute High Conga &nbsp; | MHC |
| Clap                 | CLP |


## Creating Bars

Sequences of beats can be combined to create **bars**. Bars can consist of either _quarter_ notes, _eighth notes_, or _sixteenth_ notes. (insert pictures of notes here)

A bar can have either 4 quarter notes, 8 eighth notes, or, you guessed it... 16 sixteenth notes.
So how do we distinguish between which bars contain quarters, eighths or sixteenths?

We use different types of brackets in order to make this distinction:

BARS:
```
|xxxx| - Quarter notes 
(4 beats per bar)

[xxxxxxxx] - Eighth notes 
(8 beats per bar)

{xxxxxxxxxxxxxxxx} - Sixteenth notes 
(16 beats per bar)
```

Note that you will get an error if you put an insufficient number of beats within a bar.

## Creating Rhythms
**Rhythms** are basically bars in which you can save to variables. For example, if you want to create a rhythm of name `STEADY` that represents a steady beat, you can define it as so:

```
Define STEADY as [x-x-x-x-]
```

... or an irregular rhythm named `IRR`

```
Define IRR as {--x--x---xxx--x-}
```

... or simply a rhythm that doesn't play anything named `REST`

```
Define REST as |----|
```


**Ultimately, your rhythm definitions go in a RHYTHM block like so:**
```
Rhythms:
	Define STEADY as [x-x-x-x-]
	Define IRR as {--x--x---xxx--x-}
	Define REST as |----|
```

Having a rhythms block is **not necessary**, but is necessary if you want to save rhythms to variables.

## Let's Create a Beat Sequence!
So far, we have gained extensive knowledge about rhythms and bars. We can combine these to create beat sequences! This is where we map the percussion elements, or **layers**, to the rhythms we want them to play!

### Creating Beat Sequences
A beat sequence can be created like so:

```
Create beat INTRO with layers:
```

What follows this line are the various layers that you want to put. Say that you want to have a hi-hat playing the steady rhythm that we defined earlier. We can add this below our beat sequence definition like so:

```
Create beat INTRO with layers:
	HAT: STEADY
```

What if we want the hi-hat to play for four bars? Easy! We just wrap the variable name in a `*4` like so:

```
Create beat INTRO with layers:
	HAT: (STEADY)*4
```

### Adding More Layers

Suppose we want to add a snare drum on top of our hi-hat beat. Or even a kick. We can add more drum 'layers' like so:

```
Create beat INTRO with layers:
	HAT: (STEADY)*4
   	SNR: (IRR)*4
   	KCK: |x-x-| [xx--xx--] ({xxxx----x-x-xx--})*2
```

**Notice that in the `KCK` layer, we didn't necessarily have to represent the bars as variables. We can directly inject the rhythm into the layer.**

## Playing Your Beat Sequences

You can play your beat sequences in whatever order you would like. Say that alongside your beat sequence `INTRO` you have others called `VERSE` and `CHORUS`. You can play them like so:

```
Play INTRO VERSE CHORUS VERSE
```

## Bringing It All Together

Finally, you have all of the right tools to play your beat.

A binary beat program has the following components, in this order:
- Setting tempo
- Rhythm definitions (optional)
- Beat definitions
- Playing commands

Here is our composition all put together:

```
Set tempo to 85 bpm

Rhythms:
  Define STEADY as [x-x-x-x-]
  Define IRR as {--x--x---xxx--x-}
  Define REST as |----|

Create beat INTRO with layers:
  HAT: (STEADY)*4
  SNR: (IRR)*4
  KCK: |xxxx| [xxxxxxxx] ({xxxxxxxxxxxxxxxx})*2

Create beat VERSE with layers:
  HAT: (IRR)*4
  SNR: (|xx--|)*2 ([xx--xx--])*2
  KCK: STEADY REST (STEADY)*2

Create beat CHORUS with layers:
  HAT: (STEADY)*4
  SNR: (STEADY)*2 (IRR)*2
  KCK: ([----x---])*4

Play INTRO VERSE CHORUS VERSE
```

Try this example out! Sounds crappy, I know - but now you try and make something better!

### Examples
Here are some other examples from songs you might know:

A$AP Ferg - Plain Jane (verse)

```
Set tempo to 85 bpm
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
Play VERSE
```

Drake - Hold On, We're Going Home

