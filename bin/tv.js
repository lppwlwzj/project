#!/usr/bin/env node
const  program = require('commander')
program.version(require('../package.json').version)
  .usage("<command>[options]")
//   定义tv create 这个命令
  .command("create [options <app-name>", "Create a new project");
//解析命令行参数
program.parse(process.argv);
