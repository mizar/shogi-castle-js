// UTF-8 バイトパターン判定
export const isUtf8 = (buf: ArrayBuffer | Buffer, ptnLimit = Infinity): boolean => {
  const u8a = new Uint8Array(buf);
  const len = u8a.length;
  const eindex = Math.min(len, ptnLimit);
  let i = 0;
  while (i < eindex) {
    const b0 = u8a[i];
    if (b0 <= 0x7f) {
      // U+0000 - U+007F
      i += 1;
    }
    else if (b0 <= 0xc1) {
      return false;
    } else if (b0 <= 0xdf) {
      if (i + 1 >= len) {
        return false;
      }
      const b1 = u8a[i + 1];
      if (b1 <= 0x7f || b1 >= 0xc0) {
        return false;
      }
      // U+0080 - U+07FF
      i += 2;
    } else if (b0 <= 0xef) {
      if (i + 2 >= len) {
        return false;
      }
      const b1 = u8a[i + 1];
      const b2 = u8a[i + 2];
      if (
        b0 === 0xe0 && b1 <= 0x9f ||
        b1 <= 0x7f || b1 >= 0xc0 ||
        b2 <= 0x7f || b2 >= 0xc0
      ) {
        return false;
      }
      // U+0800 - U+FFFF
      i += 3;
    } else {
      if (i + 3 >= len) {
        return false;
      }
      const b1 = u8a[i + 1];
      const b2 = u8a[i + 2];
      const b3 = u8a[i + 3];
      if (
        b0 === 0xf0 && b1 <= 0x8f ||
        b0 === 0xf4 && b1 >= 0x90 ||
        b0 >= 0xf5 ||
        b1 <= 0x7f || b1 >= 0xc0 ||
        b2 <= 0x7f || b2 >= 0xc0 ||
        b3 <= 0x7f || b3 >= 0xc0
      ) {
        return false;
      }
      // U+10000 - U+10FFFF
      i += 4;
    }
  }
  return true;
}

// Shift_JIS バイトパターン判定
export const isSjis = (buf: ArrayBuffer | Buffer, ptnLimit = Infinity): boolean => {
  const u8a = new Uint8Array(buf);
  const len = u8a.length;
  const eindex = Math.min(len, ptnLimit);
  let i = 0;
  while (i < eindex) {
    const b0 = u8a[i];
    if (b0 <= 0x80 || 0xa0 <= b0 && b0 <= 0xdf || 0xfd <= b0) {
      i += 1;
    } else if (i + 1 >= len) {
      return false;
    } else {
      const b1 = u8a[i + 1];
      if (b1 <= 0x3f || b1 === 0x7f || b1 >= 0xfd) {
        return false;
      }
      i += 2;
    }
  }
  return true;
}
