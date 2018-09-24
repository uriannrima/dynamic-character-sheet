import Vue from 'vue'

Vue.filter('signed', function (value: any) {
  if (value === undefined || value === null) return '';
  const sign = value >= 0 ? '+' : '-';
  return sign + Math.abs(value).toString();
})

Vue.filter('capitalized', function (text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
})

Vue.filter('spaced', function slugify(text: string) {
  return text.toString().replace(/([A-Z])/g, ' $1');
});
