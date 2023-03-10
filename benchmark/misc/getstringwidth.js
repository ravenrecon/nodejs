'use strict';

const common = require('../common.js');

const bench = common.createBenchmark(main, {
  type: ['ascii', 'mixed', 'emojiseq', 'fullwidth'],
  n: [10e4],
}, {
  flags: ['--expose-internals'],
});

function main({ n, type }) {
  const { getStringWidth } = require('internal/util/inspect');

  const str = ({
    ascii: 'foobar'.repeat(100),
    mixed: 'foo'.repeat(100) + '๐' + 'bar'.repeat(100),
    emojiseq: '๐จโ๐จโ๐งโ๐ฆ๐จโ๐ฉโ๐ฆโ๐ฆ๐จโ๐ฉโ๐งโ๐ง๐ฉโ๐ฉโ๐งโ๐ฆ'.repeat(10),
    fullwidth: 'ไฝ ๅฅฝ'.repeat(150),
  })[type];

  bench.start();
  for (let j = 0; j < n; j += 1)
    getStringWidth(str);
  bench.end(n);
}
