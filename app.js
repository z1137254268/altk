const superagent = require('superagent');
const express = require('express');
const app = express();
app.use(express.json({ limit: '30MB' }));

app.use(express.static('./h5'));

app.put('/api/upload', async (req, res) => {
    try {
        req.body.file = Buffer.from(req.body.file.split('base64,')[1], 'base64')
        let s = await superagent.post('https://cloud.qianshouapp.cn/v2/message-img/upload')
            .set({
                "CSC-VisitId": "access-ba00ca3b-fa67-4a4f-b5d5-4522e8788ba5"
            })
            .attach('file', req.body.file, req.body.name)

        res.json({
            data: s.body.data.media[0].url
        })
    } catch (error) {
        res.json({
            data: null
        })
    }
})

app.listen(5600)