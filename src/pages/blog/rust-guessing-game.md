---
layout: ../../components/PostLayout.astro
title: Rust Guessing Game
date: 2024-11-3
slug: rust-guessing-game
---

# Rust Guessing Game

As I said in my [previous post](/blog/learning-rust), I have been learning Rust in the past few weeks, and to be frank, I have been enjoying it quite a lot! Although I am still quite early in this **long** journey, I want to share my first Rust project: [rust-guess](https://github.com/kostaskoukos/rust-guess)!

## Impeccable Error Handling

Rust is famous for "making illegal states unrepresentable", but still its error handling just blew my mind. For instance, this little code snippet is responsible for reading the user's guess, handling any I/O that error may occur and making sure the guess is in the [1, 100] range. You can't get any more concise than that (in my opinion).

```rust
let guess = match io::stdin()
  .lines()
  .next()
  .and_then(|v| v.ok())
  .and_then(|input| input.trim().parse::<u8>().ok())
{
  Some(guess) if !(1..=100).contains(&guess) => {
    println!("guess should be in the range [1, 100]");
    continue;
  },
  Some(guess) => guess,
  _ => {
    println!("Invalid guess");
    continue;
  }
}
```

(See what I did there? The blog's first code snippet!)

The `guess` variable is assigned a valid number for the guess, which is read from the `io::stdin()` module, handled by the match statement, which does the heavy lifting in this snippet.

## Game Logic

The game logic is _very_ simple:

1. The program chooses a number from 1 to 100.
2. The player tries to guess it in the least number of attempts possible.
3. After each incorrect attempt, the game tells the player if the correct number in greater or less than the guess, leading to the infamous Binary Search pattern.
4. The game ends when the player finds the correct number.

## Portability

Rust compiles each crate, i.e project, to a single, statically linked executable, making easy to distribute, contrary to JS/Python/etc. For me this is a huge advantage, since it contributes to declarative, deterministic output.

## Conclusion

All in all, I am pretty amazed by Rust's features, especially the combination of functional and "traditional" programming paradigms. I hope to write even more of the language in the near future to understand it even more deeply.
