const inquirer = require('inquirer');
const genSDK = require('./sdk');

const promptList = [
  {
    type: 'input',
    message: '请输入API名称（如：mute，多个单词使用驼峰形式，如：channelPermission）:',
    name: 'name',
    validate: function (val) {
      if (val.match(/^\w+$/g)) {
        return true;
      }
      return '请输入合法的API名称';
    },
  },
];

inquirer
  .prompt(promptList)
  .then((answers) => {
    const { name } = answers;
    genSDK(name);
  })
  .catch((err) => {
    console.log(err);
  });
