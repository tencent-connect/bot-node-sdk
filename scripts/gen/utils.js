module.exports.upperFirst = (str) => str.replace(str[0], str[0].toUpperCase());

module.exports.getKebabCase = (str) =>
  str.replace(/[A-Z]/g, (item) => {
    return '-' + item.toLowerCase();
  });
