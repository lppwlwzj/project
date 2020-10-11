const Creator = require('./Creator')
const path = require("path");

async function create(projectName){
//  cwd 获取当前目录路径
  const cwd = process.cwd()
//   console.log("create -> cwd", cwd)
  const inCurrent = projectName === ".";
//   path.relative('../',cwd) 获取当前路径上面一级目录
  const name = inCurrent ? path.relative('../',cwd) : projectName
//   path.resolve(cwd, ".") 当前目录 targetDir返回文件创建的目录
  const targetDir = path.resolve(cwd, projectName || ".")

  const creator = new Creator(name,targetDir)
//   console.log("create -> targetDir", targetDir)
  return creator.create(targetDir)

}


module.exports = (...args) => {
  const [proName] = args;
  return create(proName) 
}