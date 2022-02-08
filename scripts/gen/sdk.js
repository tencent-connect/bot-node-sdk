const Handlebars = require('handlebars');
const { upperFirst, getKebabCase } = require('./utils');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const parser = require('@babel/parser');
const t = require('@babel/types');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const cloneDeep = require('lodash.clonedeep');

// AST操作参考文档
// https://babeljs.io/docs/en/babel-types
// https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md#toc-pushing-a-variable-declaration-to-a-parent-scope

let apiClassName; // 类 名称
let apiClassType; // 类 类型
let methodName; // 方法名称 默认一个
let uriName; // 接口url名称
let uriValue = 'xxx'; // 接口url值
let apiFileName; // 新增文件名
let apiInstanceName; // 示例名字

/**
 *  根据模板生成文件内容并写入对应文件
 *
 * @param {*} tplFileName
 * @param {*} targetFilePath
 * @param {*} tplArgs
 */
const genFileByTemplate = (tplFileName, targetFilePath, tplArgs) => {
  try {
    const templateContent = fs.readFileSync(path.join(__dirname, `./template/${tplFileName}`));
    const template = Handlebars.compile(templateContent.toString());
    const apiFileContent = template(tplArgs);
    fs.existsSync(targetFilePath);
    fs.writeFileSync(targetFilePath, apiFileContent);
  } catch (error) {
    console.log(chalk.red(`从模板${tplFileName}生成文件失败`));
    console.log(error);
  }
};

/**
 * 传入文件路径，读取文件内容 生成ast，支持修改ast，最后根据ast生成代码
 *
 * @param {*} filePath
 * @param {*} patch
 */
const genCodeByAST = (filePath, patch) => {
  const fileContent = fs.readFileSync(filePath);
  let ast = parser.parse(fileContent.toString(), {
    sourceType: 'module',
    plugins: ['typescript'],
  });
  traverse(ast, {
    enter(path) {
      patch(path);
    },
  });
  const newContent = generate(ast, {
    // retainFunctionParens:true,
    comments: false,
  }).code;
  fs.writeFileSync(filePath, newContent);
};

/**
 * 新增文件
 * @param {*} name
 */
const genApiFiles = (name) => {
  // 1. src/openapi/v1下文件生成
  const apiFilePath = path.join(__dirname, `../../src/openapi/v1/${apiFileName}.ts`);
  genFileByTemplate('api.handlebars', apiFilePath, {
    className: apiClassName,
    classType: apiClassType,
    methodName,
    uriName,
  });
  // 2. src/types/openapi/v1类型文件生成
  const typeFilePath = path.join(__dirname, `../../src/types/openapi/v1/${apiFileName}.ts`);
  genFileByTemplate('type.handlebars', typeFilePath, {
    className: apiClassName,
    classType: apiClassType,
    methodName,
  });
};

/**
 * 更新 src/openapi/v1/resource.ts 文件
 * 新增 apiURI 映射
 */
const pathResourceFile = () => {
  const resourceFilePath = path.resolve(__dirname, '../../src/openapi/v1/resource.ts');
  genCodeByAST(resourceFilePath, (path) => {
    if (path.isObjectExpression()) {
      const newNode = cloneDeep(path.node.properties[0]);
      newNode.key.name = uriName;
      newNode.value.value = uriValue;
      path.node.properties.push(newNode);
    }
  });
};

/**
 * 更新src/types/openapi/index.ts文件
 * 类型定义补充
 */
const patchTypeDefinitionFile = () => {
  const typeFilePath = path.resolve(__dirname, '../../src/types/openapi/index.ts');
  genCodeByAST(typeFilePath, (path) => {
    // import语句
    if (path.isImportDeclaration() && path.getNextSibling().isExportNamedDeclaration()) {
      let importNode = t.importDeclaration(
        [t.importSpecifier(t.identifier(apiClassType), t.identifier(apiClassType))],
        t.stringLiteral(`./v1/${apiFileName}`),
      );
      path.insertBefore(importNode);
    }
    // IOpenAPI属性
    if (path.isIdentifier({ name: 'IOpenAPI' }) && path.parent.type === 'TSInterfaceDeclaration') {
      path.parentPath
        .get('body')
        .pushContainer(
          'body',
          t.tSPropertySignature(
            t.identifier(apiInstanceName),
            t.tsTypeAnnotation(t.tsTypeReference(t.identifier(apiClassType))),
          ),
        );
    }
    // 添加导出
    if (path.type === 'ExportAllDeclaration' && !path.getNextSibling().node) {
      path.insertBefore(t.exportAllDeclaration(t.stringLiteral(`./v1/${apiFileName}`)));
    }
  });
};

/**
 * 更新 src/openapi/v1/openapi.ts 文件
 * API类定义补充
 */
const patchDefinitionFile = () => {
  const definitionFilePath = path.resolve(__dirname, '../../src/openapi/v1/openapi.ts');
  genCodeByAST(definitionFilePath, (path) => {
    // 导入类名
    if (path.isImportDeclaration() && path.node.source.value === 'resty-client') {
      path.insertAfter(
        t.importDeclaration(
          [t.importDefaultSpecifier(t.identifier(apiClassName))],
          t.stringLiteral(`./${apiFileName}`),
        ),
      );
    }
    // 导入类型
    if (path.isImportDeclaration() && path.node.source.value === '@src/types') {
      path.node.specifiers.push(t.importSpecifier(t.identifier(apiClassType), t.identifier(apiClassType)));
    }
    // 成员变量声明
    if (path.isClassProperty() && path.getNextSibling().isClassMethod()) {
      let newNode = cloneDeep(path.node);
      newNode.key.name = apiInstanceName;
      newNode.typeAnnotation.typeAnnotation.typeName.name = apiClassType;
      path.insertBefore(newNode);
    }
    // api实例对象创建
    if (path.isClassMethod() && path.node.key.name === 'register') {
      path
        .get('body')
        .pushContainer(
          'body',
          t.expressionStatement(
            t.assignmentExpression(
              '=',
              t.memberExpression(t.identifier('client'), t.identifier(apiInstanceName)),
              t.newExpression(t.identifier(apiClassName), [
                t.memberExpression(t.thisExpression(), t.identifier('request')),
                t.memberExpression(t.thisExpression(), t.identifier('config')),
              ]),
            ),
          ),
        );
      console.log(10);
    }
  });
};

/**
 * 更新各种需要补充的文件
 */
const patchApiFiles = () => {
  pathResourceFile();
  patchTypeDefinitionFile();
  patchDefinitionFile();
};

module.exports = (name) => {
  apiClassName = upperFirst(name);
  apiClassType = `${apiClassName}API`;
  methodName = name;
  uriName = `${methodName}URI`;
  apiFileName = getKebabCase(name);
  apiInstanceName = `${name}Api`;

  genApiFiles(name);
  patchApiFiles();
};
