import fs from 'fs';
import jsyaml from 'js-yaml';
import { castle } from './castle';

// data/castle.yaml を元にして別形式のデータファイルをビルド

// export data/castle.json
fs.writeFileSync(
  'data/castle.json',
  JSON.stringify(jsyaml.safeLoad(fs.readFileSync('data/castle.yaml', 'utf8')), undefined, 2),
);

// export data/castle_dist.json
fs.writeFileSync(
  'data/castle_dist.json',
  JSON.stringify(castle, undefined, 2),
);

// export data/castle_dist.yaml
fs.writeFileSync(
  'data/castle_dist.yaml',
  jsyaml.dump(castle),
);
