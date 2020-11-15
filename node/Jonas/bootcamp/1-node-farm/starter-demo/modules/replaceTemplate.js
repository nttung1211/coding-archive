module.exports = (template, obj) => {
  for (let key in obj) {
    if (key === 'organic') {
      template = template.replace('{%notOrganic%}', obj[key] ? '' : 'not-organic');
    } else {
      const regex = new RegExp(`\{%${key}%\}`, 'g');
      template = template.replace(regex, obj[key]);
    }
  }

  return template;
}
// module.exports = function replaceTemplate(template, obj) {
//   for (let key in obj) {
//     if (key === 'organic') {
//       template = template.replace('{%notOrganic%}', obj[key] ? '' : 'not-organic');
//     } else {
//       const regex = new RegExp(`\{%${key}%\}`, 'g');
//       template = template.replace(regex, obj[key]);
//     }
//   }

//   return template;
// }