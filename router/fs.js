
/**
 * 该处用于做fs相关
 * 文件编辑、存取、移动、上传下载等
 */

const express = require('express')
const fs = require('fs')

const router = express.Router()

router.get('/save', async (req, res) => {
    let fileName = req.body && req.body.fileName || 'default'
    let content = req.body && req.body.body || ''

    // fs.open(fileName)
})

module.exports = router;