
/**
 * 该处用于做fs相关
 * 文件编辑、存取、移动、上传下载等
 */

// 目前文件设置为全部保存在 /fileStore/* 中 

 
const express = require('express')
const fs = require('fs')
const url = require('url')

const config = require('../config')

const router = express.Router()

router.post('/file/set', async (req, res) => {
    let fileName = req.body && req.body.fileName || 'default'
    let content = req.body && req.body.content || ''

    // 异步写入
    // 文件写入。如果文件不存在，则创建文件；如果文件存在，则覆盖文件内容；
    fs.writeFile(`${config.fileStorePath}/${fileName}.txt`, content, 'utf8', async function (err) {
        if (err) throw err;
        console.log('文件写入：' + './' + fileName)

        let fileList = await getsFileList()
        let list = fileList.map((item, index) => {
            return {key: index, label: item, disabled: false}
        })
        let data = {
            count: list.length,
            rows: list,
        }
        res.send(data);
    })
})

// 读取文件，异步
router.get('/file/get', async (req, res) => {
    // let fileName = req.body && req.body.fileName || 'default'
    let params = url.parse(req._parsedUrl.href, true);      // 第二个参数，表示search用对象形式返回
    let fileName = params.query.fileName || 'default';
    let content = '';

    fs.readFile(`${config.fileStorePath}/${fileName}.txt`, 'utf8', function (err, data) {
        if(err){
            return console.error('读取文件出错: ' + err.message);
        }
        console.log(`文件内容： ${data}`);

        let resData = {fileName: fileName, content: data || content}
        res.send(resData);
    })
})

// 读取目标文件夹中的所有文件
router.get('/file/list/get', async (req, res) => {
    let params = url.parse(req._parsedUrl.href, true);
    // let dirName = params.dirName || '../fileStore/';
    // let dirName = `${config.fileStorePath}/${params.dirName || ''}/`;
    
     let fileList = await getFileList(params.dirName)
    // 处理格式
    /**
     * 返回的 fileList = [fileName1, fileName2]...
     * 格式化为 [{
     *      key: 0,
     *      label: fileName1,
     *      disabled: false
     * }]
     */
    let list = fileList.map((item, index) => {
        return {key: index, label: item, disabled: false}
    })
    let data = {
        count: list.length,
        rows: list,
    }
    res.send(data);
})

module.exports = router;



// ---------------------------------------------
// 公共逻辑
// fs模块中的方法好像没有返回promise，所以

// 获取某文件夹中的文件名列表
// 暂时利用函数变量提升特性，后面重构进独立模块
async function getFileList (dirName) {
    let dir = `${config.fileStorePath}/${dirName || ''}/`;
    return await new Promise((resolve, reject) => {
        fs.readdir(dir, 'utf8', (err, fileList) => {
            if (err) {
                // console.log(`读取文件目录出错: ${err.message}`)
                throw new Error(`读取文件目录出错: ${err.message}`);
                // reject(err.message)
            }
            resolve(fileList)
        })
    })
}