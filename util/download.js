const download = require("download-git-repo");
module.exports = (repoAddr, proName) =>
  new Promise((resolve, reject) => {
    download(
      repoAddr,
      proName,
    //   {
    //     clone: true,
    //   },
      (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      }
    );
  });
