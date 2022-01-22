const { execSync } = require('child_process');

try {
  execSync('npm link');
  execSync('cd example && npm link qq-guild-bot');
} catch (error) {}
