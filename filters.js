// filters.js - فلتر الكلمات والروابط
const BAD_WORDS = [
  "زامل", "قحبة", "نيك", "ترمة", "زب", "منيوك",
  "حمار", "كلب", "قواد", "شرموطة"
];

const ALLOWED_WORDS = ["زعما", "زعيم", "زاملنا فالطريق"]; // استثناءات

const LINK_REGEX = /(https?:\/\/|www\.|chat\.whatsapp\.com\/|wa\.me\/|t\.me\/)/i;
const GROUP_LINK_REGEX = /chat\.whatsapp\.com\/[A-Za-z0-9]+/i;

function containsBadWord(text) {
  const low = text.toLowerCase();
  // خلي الكلمات المسموحة ما تتمسحش
  for (let ok of ALLOWED_WORDS) if (low.includes(ok)) return false;
  return BAD_WORDS.some(w => low.includes(w));
}

function containsLink(text) {
  return LINK_REGEX.test(text) || GROUP_LINK_REGEX.test(text);
}

module.exports = { BAD_WORDS, containsBadWord, containsLink, GROUP_LINK_REGEX };
