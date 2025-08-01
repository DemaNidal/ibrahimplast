// components/product/color/translateColor.js

export const translateArabicColorToCss = (arabicColor) => {
  const map = {
    'احمر': '#FF0000',
    'أحمر': '#FF0000',
    'ازرق': '#87cefa',
    'أزرق': '#87cefa',
    'اخضر': '#008000',
    'أخضر': '#008000',
    'اصفر': '#FFFF00',
    'أصفر': '#FFFF00',
    'اسود': '#000000',
    'أسود': '#000000',
    'ابيض': '#FFFFFF',
    'أبيض': '#FFFFFF',
    'ذهبي': '#ffc113',
    'فضي': '#C0C0C0',
    'زهر': '#FFC0CB',
    'شفاف': '#1C00ff00',
    'بنفسجي': '#800080',
    'برتقالي':'#FFA500',
    'بني':'#A52A2A',
    'كحلي':'#000080',
    'تركواز': '#30d5c8'
  };

  return map[arabicColor] || '#999999';
};
