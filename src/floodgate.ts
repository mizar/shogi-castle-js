import fetch from 'node-fetch';
import jsyaml from 'js-yaml';
import { JKFPlayer } from 'json-kifu-format';
import { getTags } from './castle';

fetch('https://p.mzr.jp/wdoor-latest/shogi-server.log')
.then(res => res.text())
.then(log => {
  const gameList = log.split('\n')
  .map(s =>
    (s.match(
      /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d \[INFO\] game (?:started|finished) ((?:[\w.-]+\+){4}\d+)/
    ) || { 1: '' })[1]
  )
  .filter(s => s)
  .map(s => ({
    gameId: s,
    gameUrl: `http://wdoor.c.u-tokyo.ac.jp/shogi/LATEST/${
      s.substring(s.length - 14, s.length - 10)
    }/${
      s.substring(s.length - 10, s.length - 8)
    }/${
      s.substring(s.length - 8, s.length - 6)
    }/${s}.csa`,
    gameName: `☗${s.split('+')[2]} ☖${s.split('+')[3]} : ${s.split('+')[4]}`,
    playerUrl: `https://lab.mzr.jp/shogi/floodgate/#${s}`,
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
    console.log(jsyaml.dump(values, { noRefs: true }));
  });

});
