import fetch from 'node-fetch';
import jsyaml from 'js-yaml';
import * as iconv from 'iconv-lite';
import { JKFPlayer } from 'json-kifu-format';
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
  console.log(jsyaml.dump({
    url,
    kifu,
    tags: getTags(JKFPlayer.parse(kifu)),
  }, {
    noRefs: true,
  }));
});
