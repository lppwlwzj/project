#!/usr/bin/env node
// console.log('hello')
const  program = require('commander')
program.version(require('../package').version)
.usage('<command> [options]')
.command('add', 'add a new template')
.command('init', 'generate a new project from a template')

// 解析命令行参数
program.parse(process.argv)