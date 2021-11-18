import { QQBot } from './qqbot';

const testConfig = {
  BotAppID: '101934825',
  BotToken: 'BcnzkI99QUkFkRzBq237eQGvI4zooul1',
};

const QQ = new QQBot();
QQ.newClient(testConfig);

// export {
//   qqBot,
// }
