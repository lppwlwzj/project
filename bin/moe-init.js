#!/usr/bin/env node
const program = require("commander");
const chalk = require("chalk");
const ora = require("ora");
const download = require("download-git-repo");
const tplObj = require(`${__dirname}/../template`);
program.usage("<template-name> [project-name]");
program.parse(process.argv);
if (program.args.length < 1) return program.help();

// 好比 vue init webpack project-name 的命令一样，第一个参数是 webpack，第二个参数是 project-name
let templateName = program.args[0];
let projectName = program.args[1];
if (!tplObj[templateName]) {
  console.log(chalk.red("\n Template does not exit! \n "));
  return;
}
if (!projectName) {
    console.log(chalk.red('\n Project should not be empty! \n '))
    return
}
url = tplObj[templateName]
console.log("url", url)
console.log(chalk.white('\n Start generating... \n'))
// 出现加载图标
const spinner = ora("Downloading...");
spinner.start();
// 执行下载方法并传入参数
// download(repository, destination, options, callback)
// download第一个参数是github:
// repository 是远程仓库地址；destination 是存放下载的文件路径，也可以写文件名，默认当前目录；options 是选项，比如 { clone：boolean } 表示用 http download 还是 git clone 。
//  比如远程地址是https://github.com/yangzicheng/command-line   repository只要是yangzicheng/command-line 
download(
    url,
    projectName,
    err=>{
        if(err){
            spinner.fail();
            console.log(chalk.red(`Generation failed. ${err}`))
            return  
        }
        // 结束加载图标
        spinner.succeed();
        console.log(chalk.cyan('\n Generation completed!'))
        console.log(chalk.cyan('\n To get started'))
        console.log(chalk.cyan(`\n    cd ${projectName} \n`))
    }
)