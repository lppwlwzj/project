// 交互式命令行
const inquirer = require("inquirer");
// 修改控制台字符串的样式
const chalk = require("chalk");
// node 内置文件模块
const fs = require("fs");
// 读取根目录下的 template.json
const tplObj = require(`${__dirname}/../template`);

// 自定义交互式命令行的问题及简单的校验
let question = [
  {
    name: "name",
    type: "input",
    message: "请输入模板名称",
    // 验证输入的模板名称
    validate (val) {
      if (val === '') {
        return 'Name is required!'
      } else if (tplObj[val]) {
        return 'Template has already existed!'
      } else {
        return true
      }
    }



  },
  {
    name: "url",
    type: "input",
    message: "请输入模板地址",
    validate(val) {
      if (val === "") return "The url is required!";
      return true;
    },
  },
  {
    type: "list",
    name: "testchoice",
    message: "What do you want to do?",
    choices: [
      {
        name: "PC",
        value: "pc",
        short: "PC",
      },
      {
        name: "mobile",
        value: "mobile",
        short: "mobile",
      },
    ],
  },
];

inquirer.prompt(question).then((answers) => {
  console.log("answers", answers);
  // answers 就是用户输入的内容，是个对象
  let { name, url } = answers;
  // 过滤 unicode 字符
  tplObj[name] = url.replace(/[\u0000-\u0019]/g, "");
  // 把模板信息写入 template.json 文件中
  fs.writeFile(
    `${__dirname}/../template.json`,
    JSON.stringify(tplObj),
    "utf-8",
    (err) => {
      if (err) console.log(err);
      console.log("\n");
      console.log(chalk.green("Added successfully!\n"));
      console.log(chalk.grey("The latest template list is: \n"));
      console.log(tplObj);
      console.log("\n");
    }
  );
});

// 其实当我们执行moe add时，commander会尝试在入口文件的目录内寻找可执行文件，找到形如program-command的命令来执行（moe-add）
