import fetch from 'node-fetch';
import { JKFPlayer } from 'json-kifu-format';
import * as iconv from 'iconv-lite';
import { getTags } from './castle';
import { isUtf8, isSjis } from './detect_encode';

const url = process.argv[2];

fetch(url)
.then(res => res.buffer())
.then(buf => {
  if (isUtf8(buf)) {
    return iconv.decode(buf, 'utf8');
  } else if (isSjis(buf)) {
    return iconv.decode(buf, 'shift-jis');
  }
  throw '';
})
.then(kifu => {
  console.log(
    getTags(JKFPlayer.parse(kifu))
    .map(tag =>
      `${tag.name.ja_JP}:${tag.tesuu}`
    ).join(',')
  );
});
