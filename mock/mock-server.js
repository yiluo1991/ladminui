/**
 * 代码由devServer执行
 */

const chokidar = require("chokidar");
const bodyParser = require("body-parser");
const chalk = require("chalk");
const path = require("path");
const Mock = require("mockjs");

//mock文件夹所在位置
const mockDir = path.join(process.cwd(), "mock");

/**
 * 注册api路由
 * @param app
 * @returns {{mockStartIndex: number, mockRoutesLength: number}}
 */
function registerRoutes(app) {  
  let mockLastIndex;
  const mocks= require("./index.js");
 
  const mocksForServer = mocks.map((route) => {
    return responseFake(route.url, route.type, route.response);
  });
 
  for (const mock of mocksForServer) {
   
    app[mock.type](mock.url, mock.response);
   
    mockLastIndex = app._router.stack.length;
  }
  const mockRoutesLength = Object.keys(mocksForServer).length;
  return {
    mockRoutesLength: mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength,
  };
}

/**
 *
 * @param url
 * @param type
 * @param respond
 * @returns {{response(*=, *=): void, type: (*|string), url: RegExp}}
 */
const responseFake = (url, type, respond) => {
  return {
    url: new RegExp(`${process.env.VUE_APP_SERVER_BASE_API}${url}`),
    type: type || "get", 
    response(req, res) {
      if (JSON.stringify(req.body) !== "{}"||JSON.stringify(req.query)!=='{}') {
        console.log(chalk.green(`> 请求地址：${req.path}`));
        console.log(chalk.green(`> query参数：${JSON.stringify(req.query)}`));
        console.log(chalk.green(`> body参数：${JSON.stringify(req.body)}\n`));
      } else {
        console.log(chalk.green(`> 请求地址：${req.path}\n`));
      }
      res.json(
        Mock.mock(respond instanceof Function ? respond(req, res) : respond)
      );
    },
  };
};
/**
 *
 * @param app
 */
module.exports = (app) => {
  require("@babel/register");
   
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  let insertIndex=app._router.stack.length;
  const mockRoutes = registerRoutes(app);
  let mockRoutesLength = mockRoutes.mockRoutesLength;
  let mockStartIndex = mockRoutes.mockStartIndex;
   
  chokidar
    .watch(mockDir, {
      ignored: /mock-server/,
      ignoreInitial: true,
    })
    .on("all", (event, path) => {
      if (event === "change" || event === "add") {
        try {

        
          app._router.stack.splice(mockStartIndex, mockRoutesLength);
          
          Object.keys(require.cache).forEach((item) => {
            if (item.includes(mockDir)) {
              delete require.cache[require.resolve(item)];
            }
          });
       
          const mockRoutes = registerRoutes(app); 
          mockRoutesLength = mockRoutes.mockRoutesLength;
          mockStartIndex = mockRoutes.mockStartIndex;
          var move= app._router.stack.splice(mockStartIndex, mockRoutesLength);
          app._router.stack.splice(insertIndex,0,...move);
          mockStartIndex=insertIndex;
          console.log(chalk.blue(`> Mock服务热更新成功：${path}`));
        } catch (error) {
          console.log(chalk.red(error));
        }
      } 
    });
};
