const readlineSync = require('readline-sync');
const chalk = require('chalk');
const { execSync } = require('child_process');

// 发布流程：npm run release -> npm run build -> npm publish -> git push --tag -> git push

let headCommit; // head commitID
let preVersion; // 自动生成的版本号

const log = (msg, breakLineBefore = true, breakLineAfter = false, color = 'blue') => {
  breakLineBefore && console.log('\n');
  console.log(chalk[color](msg));
  breakLineAfter && console.log('\n');
};

const continuePublish = () => {
  // 执行build
  log('----- 2. build(start) -----');
  execSync('npm run build');
  log('----- build(end) -----');

  // 执行 publish
  log('----- 3. publish(start) -----');
  execSync('npm publish');
  log('----- publish(end) -----');

  // push 标签
  log('----- 4. push tag(start) -----');
  execSync('git push --tag');
  log('----- push tag(end) -----');

  // push 代码
  log('----- 5. push code(start) -----');
  execSync('git push');
  log('----- push code(end) -----');

  log('===== finish publish =====', true, false, 'green');
};

// 发布版本
const runRelease = (version) => {
  log('----- 1. release(start) -----', false);
  if (version) {
    log(`release version : ${version}`, false, false, 'yellowBright');
    execSync(`npm run release -- --release-as ${version}`);
  } else {
    const output = execSync('npm run release').toString('utf-8');
    const extractVersion = /tagging release (v[0-9]+\.[0-9]+\.[0-9]+)/.exec(output)[1];
    if (extractVersion) {
      preVersion = extractVersion;
      console.log(chalk.yellow(`preVersion: ${preVersion}`));
    }
  }
  log('----- release(end) -----', true, true);
};

// 清除副作用：commit、tag
const clearEffect = () => {
  // 回滚commit
  execSync(`git reset --hard ${headCommit}`);
  // 删除tag
  execSync(`git tag -d ${preVersion}`);
  preVersion = '';
};

// 停止发布
const stopPublish = () => {
  log('===== stop publish =====', true, false, 'red');
};

try {
  headCommit = execSync('git rev-parse --short HEAD').toString();
  console.log('HEAD: ', headCommit);

  log('===== start publish =====', true, true, 'green');

  // 开始release
  runRelease();

  if (readlineSync.keyInYN(chalk.yellowBright('Is this version ok？'))) {
    continuePublish();
  } else {
    clearEffect();
    // 手动输入版本号
    if (readlineSync.keyInYN(chalk.yellowBright('continue with input version？'))) {
      const version = readlineSync.question('verison(e.g. 1.1.1): ', {
        limit: /[0-9]+\.[0-9]+\.[0-9]+$/,
      });
      runRelease(version);
      preVersion = `v${version}`;
      continuePublish();
    } else {
      stopPublish();
    }
  }
} catch (error) {
  log('publish broken', false, false, 'redBright');
  console.log(error);
  clearEffect();
}
