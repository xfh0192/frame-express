
/**
 * 该处用于做fs相关
 * 文件编辑、存取、移动、上传下载等
 */

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
    fs.writeFile(`${config.fileStorePath}/${fileName}.txt`, content, 'utf8', function (err) {
        if (err) throw err;
        console.log('文件写入：' + './' + fileName)
    })
})

// 读取文件，异步
router.get('/file/get', async (req, res) => {
    // let fileName = req.body && req.body.fileName || 'default'
    let params = url.parse(req._parsedUrl.href, true);
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

module.exports = router;