#!/usr/bin/env node

// 执行tv create 这个命令时就会执行此文件
const create = require('../lib/create')
const program = require("commander");
program.usage("<project-name>");

program.parse(process.argv);

if (program.args.length < 1) {
  program.help();
} else {
  const [proName] = program.args;
  console.log("proName", proName);
  create(proName)
}
