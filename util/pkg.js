const fs = require("fs");
const path = require("path");
const readPkg = require("read-pkg");
exports.resolvePkg = function (context) {
  console.log("exports.resolvePkg -> context", context);
  //  这个命令执行在download 后面 这个时候项目已经不是空的
  if (fs.existsSync(path.join(context, "package.json"))) {
    // 存在就把package.json返回
    return readPkg.sync({
      cwd: context
    });
  }
  return {};
};
