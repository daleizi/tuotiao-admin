const path = require("path"); //引入path模块
function resolve(dir) {
  return path.join(__dirname, dir); //path.join(__dirname)设置绝对路径
}
module.exports = {
  //关闭语法自动检测
  lintOnSave: false,
  // css: {
  //   requireModuleExtension: false,
  //   loaderOptions: {
  //     scss: {
  //       prependData: `@import "~@/styles/index.scss";`
  //     }
  //   }
  // },
  // pages: {
  // index: {
  // page 的入口
  // entry: `src/project/${process.env.VUE_APP_PROJECT}/main.js`
  // }
  // 当使用只有入口的字符串格式时，
  // 模板会被推导为 `public/subpage.html`
  // 并且如果找不到的话，就回退到 `public/index.html`。
  // 输出文件名会被推导为 `subpage.html`。
  // bbb: "src/project/bbb/main.js",
  // },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("./src"))
      .set("@a", resolve("./src/assets"))
      .set("@c", resolve("./src/components"));
    // 这里只写了两个，你可以自己再加，按这种格式.set('', resolve(''))
  }
};
