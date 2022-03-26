const path = require('path');//引入path模块
function resolve(dir) {
    return path.join(__dirname, dir)//path.join(__dirname)设置绝对路径
}
module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = '医检大师'
                return args
            });
        config.resolve.alias
            .set('@', resolve('./src'))
            .set('components', resolve('./src/components'))
            .set('views', resolve('src/views'))
            .set('assets', resolve('src/assets'))
        //set第一个参数：设置的别名，第二个参数：设置的路径
    },
    //去除验证
    lintOnSave: false,
    devServer: {
        disableHostCheck: true,
        // open: true, //编译后默认打开浏览器
        // host: 'localhost',  //域名
        port: 80,  // 端口
        https: false,  //是否https
        //显示警告和错误
        overlay: {
            warning: false,
            errors: false
        }
    }
};