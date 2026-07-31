import xss from "xss";

// Strips HTML/script tags from free-text fields submitted by
// anonymous public visitors (contact form, inspection booking) —
// defense-in-depth against stored XSS. React already escapes text by
// default when rendering, so this isn't the only thing standing
// between an attacker and a real exploit, but there's no reason to
// store raw <script> tags in the database at all when the field is
// supposed to be plain text.
export function stripXss(value) {
  if (typeof value !== "string") return value;
  return xss(value, { whiteList: {}, stripIgnoreTag: true, stripIgnoreTagBody: ["script"] });
}
