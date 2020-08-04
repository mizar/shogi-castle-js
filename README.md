# shogi-castle-js

- require
  - Node.js

## Install "Yarn" package manager (if needed)

```
npm install -g yarn
```

## Setup shogi-castle-js

- with Yarn

```
yarn install
```

- or, without Yarn (not recommended)

```
npm install
```

## Usage: load url

```
ts-node src/load https://golan.sakura.ne.jp/denryusen/dr1_test2/kifufiles/dr1test1test0+tu-9_suisho_aobazero-300-5F+suisho+aobazero+20200720011011.csa
```

## Usage: load url (simple output)

```
ts-node src/load_simp https://golan.sakura.ne.jp/denryusen/dr1_test2/kifufiles/dr1test1test0+tu-9_suisho_aobazero-300-5F+suisho+aobazero+20200720011011.csa
```

## Usage: floodgate games

```
ts-node src/floodgate
```

## Usage: denryusen (3rd pre-training match) games

```
ts-node src/denryusen
```
