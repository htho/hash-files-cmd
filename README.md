# hash-files-cmd

A wrapper around [hash-files](https://github.com/mac-/hash-files/issues).

* designed to be used for scripting in the windows shell (cmd)
* compares the calculated hash with a stored hash
* exits with a non-zero exit code if the hashes are not equal

## Installation

    npm install hash-files

## Usage

    ./bin/hash-files-cmd --files package.json --hash-file .package.json.hash

Specify one or more globs to create the hash for: `--files fileOrGlob1, [fileOrGlob2, ...]`

Define a filename for the hash: `--hash-file fileName`

## Approach

1. calculates the hash for the given `--files` (file(s)/glob(s)()
2. tries to read the old hash from the given `--hash-file`
3. stores the calculated hash in the given hash-file
4. exits with an error code of -1 if
   1. hash-file did not exist before
   2. the old hash differs from the current hash
5. exits without an error if the hashes are equal

## Limitations

Commandline parameters for `hash-files` are not exposed.

Feel free to make a PR.
