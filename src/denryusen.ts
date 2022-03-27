import fetch from 'node-fetch';
import jsyaml from 'js-yaml';
import { JKFPlayer } from 'json-kifu-format';
import { getTags } from './castle';

fetch('https://golan.sakura.ne.jp/denryusen/dr1_test3/kifulist.txt')
.then(res => res.text())
.then(log => {
  const gameList = log.split('\n')
  .map(s =>
      s.match(
          /^<div><a href="\.\/kifujs\/((?:[\w.-]+\+){4}\d+)\.html"[^>]*>([^<]+)<\/a>/
      )
  )
  .filter(s => s)
  .map(s => s as RegExpMatchArray)
  .map(s => ({
    gameId: s[1],
    gameUrl: `https://golan.sakura.ne.jp/denryusen/dr1_test3/kifufiles/${s[1]}.csa`,
    gameName: s[2].replace(/▲/g, '☗').replace(/△/g, '☖'),
    playerUrl: `https://lab.mzr.jp/shogi/denryusen/#${s[1]}`,
  }))
  .filter(
    (x, i, self) =>
      self.map((s) => s.gameId).lastIndexOf(x.gameId) === i
  )
  .sort(
    (a, b) =>
      parseFloat(a.gameId.substring(a.gameId.length - 14)) -
      parseFloat(b.gameId.substring(b.gameId.length - 14))
  );

  Promise.all(gameList.map(async gameObj => Object.assign(
    {},
    gameObj,
    { tags: getTags(JKFPlayer.parseCSA(await (await fetch(gameObj.gameUrl)).text())) },
  ))).then(values => {
    console.log(jsyaml.dump(values, {
      noRefs: true,
      skipInvalid: true,
    }));
  });

});
