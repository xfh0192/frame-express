
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

        let fileList = await getFileList()
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

// 删除指定的文件
router.post('/file/remove', async (req, res) => {
    let params = req.body || {}

    try {
        let response = await removeFile(params.fileName);
        console.log(response)
    } catch (err) {
        console.log(err)
        return;
    }

    let fileList = await getFileList()
    let list = fileList.map((item, index) => {
        return {key: index, label: item, disabled: false}
    })
    let data = {
        count: list.length,
        rows: list,
    }
    res.send(data);
})

router.post('/file/dir/clear', async (req, res) => {
    try {
        await clearDir()
    } catch (err) {
        console.log(err)
        return;
    }

    let fileList = await getFileList()
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
// fs模块中的方法好像没有返回promise，所以用promise包装一下。出错目前就直接抛出先，因为暂时不考虑阻止的情况

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

// 检查某文件是否文件夹
async function isDirectory (fileName) {
    return await new Promise((resolve, reject) => {
        fs.stat(fileName, (err, stats) => {
            if (err) {
                throw new Error(`打开文件失败：isDirectory`)
            }
            resolve(stats.isDirectory());
        })
    })
}

// 删除某文件
async function removeFile (fileName) {
    return await new Promise((resolve, reject) => {
        fs.unlink(`${config.fileStorePath}/${fileName}.txt`, (err) => {
            if (err) {
                reject(`删除文件出错：${fileName} 该文件不存在`)
            }
            resolve('删除文件夹内容完成')
        })
    })
}

// 清空某文件夹
async function clearDir (dirName) {
    let checkDirectory = await isDirectory(`${config.fileStorePath}`);
    let fileList = await getFileList();     // 获取目录中的文件列表

    if (!checkDirectory) {
        throw new Error('目标位置不是文件夹')
    }
    for (let file of fileList) {
        await fs.unlink(`${config.fileStorePath}/${file}`, (err) => {
            if (err) {
                throw new Error(`清除目录出错`)
            }
            console.log(`清除文件：${file}.txt`)
        })
    }

    console.log(`清除目录完成`)
    return await Promise.resolve(`清除目录完成`);
}

// 删除某目录
// fs.rmdir()