# Welcome to Binary Beats!

Binary Beats is a DSL which is made in order for users to create various beats using a sequence of x's and dashes.

## Beats

Beats are the atomic components of Binary Beats. A **beat** is simply an `x`, which represents a hit beat, or a `-` (dash), which represents a missed beat (rest).

```
 x : Hit beat
 - : Missed beat (rest)
```


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

### Percussion Elements
The percussion elements that we currently support are:

| Percussion element   | Element code |
| --------- | ------- |
| Hi-hat    | HAT |
| Snare | SNR |
| Bass      | BAS |
| Kick      | KCK |
| Forgot what this one was called...      | OHT |
... add more pls

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
