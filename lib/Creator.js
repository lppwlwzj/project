const chalk = require("chalk");
const validateProjectName = require("validate-npm-package-name");
const { log } = require("../util/logger");
const fs = require("fs-extra");
const emoji = require("node-emoji");
const inquirer = require("inquirer");
const { promotes } = require("../config/index");
const { resolvePkg } = require("../util/pkg");
const ora = require("ora");
const path = require("path");
const downloadRepo = require("../util/download");
const promisify = require("util").promisify; //将node 模块的回调函数( fs.readFile )转成promise异步函数。
const writeFile = promisify(fs.writeFile);
module.exports = class Creator {
  constructor(name, context) {
    this.name = name;
    this.context = context;
  }
  async create() {
    const { name, context } = this;
    if (!validateProjectName(name).validForNewPackages) {
      log(chalk.yellow(`${emoji.get("x")} wrong project name: "${name}"`));
      process.exit(1);
    }

    if (fs.existsSync(context)) {
    const { action } = await inquirer.prompt([
        {
          name: "action",
          type: "list",
          message: `project  ${chalk.cyan(
            context
          )} already exits.please choose operational:`,
          choices: [
            {
              name: "rebuild",
              value: "overwrite",
            },
            {
              name: "cancel build",
              value: false,
            },
          ],
        },
      ]);
      if (!action) {
        process.exit(1);
      } else if (action === "overwrite") {
        log(`\n old project  ${chalk.cyan(context)} is cleaning...\n`);
        await fs.remove(context);
        log(`${chalk.green(`Clean up start build ... \n`)}`);
      }
    }
    log(chalk.white("\n start build project ... \n"));
    const { tpl } = await inquirer.prompt(promotes);
    // console.log("Creator -> create -> promotes", promotes)
    const spinner = ora(" building ... \n");
    try {
      spinner.start();
      await downloadRepo(tpl, name);
      const pkg = {
        ...resolvePkg(context),
        name,
        version: "1.0.0",
        private: true,
      };
      console.log("Creator -> create -> pkg", pkg);
      const pkgPath = path.join(context, "package.json");
      console.log("Creator -> create -> pkgPath", pkgPath);
      const pkgData = JSON.stringify(pkg, null, 2);
      //   更新package.json到下载的项目中
      await writeFile(pkgPath, pkgData, "utf-8");
      spinner.succeed();
      log(
        `${emoji.get("white_check_mark")}  build success ${chalk.yellow(name)}.`
      );
      log(
        `${emoji.get("zap")}  Run the following command to start :\n\n` +
          chalk.cyan(`        ${chalk.gray("$")} cd ${name}\n\n`) +
          chalk.cyan(
            `       ${chalk.gray("$")} npm install && npm run serve  \n\n`
          )
      );
    } catch (error) {
      spinner.fail();
      log(error);
      log(chalk.red(`\n ${emoji.get("x")} build fail ! \n`));
      console.log("Creator -> create -> error", error);
    }
    process.exit(1);
  }
};
