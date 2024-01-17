const express = require('express');
const router = express.Router();
const { getDB } = require('../db');
const { ObjectId } = require('mongodb');

router.get('/test', async (req, res) => {
    try {
        const db = getDB();
        let list = await db.collection("product").find().toArray();
        console.log("---list---")
        console.log(list);
        res.status(201).send(list);
    } catch(error) {
        console.error(error);
        res.status(500).send('list 조회오류')
    }
});

router.get('/', async (req, res) => {
    try {
        const db = getDB();
        let result = await db.collection("product").find().toArray();
        console.log('result:', result);
        res.status(201).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('서버 오류');
    }
});

router.get('/detail/:id', async (req, res) => {
    try {
        const db = getDB();
        let result = await db.collection("product").findOne({_id:new ObjectId(req.params.id)});
        let LikeCount = await db.collection("like").find({"product_id" : req.params.id}).toArray();
        let UserInfo = await db.collection("user").find({_id : req.params.id}).toArray();
        console.log("------------result------------");
        console.log(result);
        console.log("------------LikeCount------------");
        console.log(LikeCount);
        console.log("------------UserInfo------------");
        console.log(UserInfo);
        res.status(201).send({ product: result, likes: LikeCount, user: UserInfo });
    } catch (error) {
        console.error(error);
        res.status(500).send('조회 오류');
    }
});

// router.post('/product/new'.upload.single('image'), (요청, 응답) => {
//         console.log(요청.file)
// })

// router.post('/product/new', upload.single('image'), async (요청, 응답) => {

//     console.log(요청.file)

//     // try {
//     //     if (
//     //         요청.body.title == '',
//     //         요청.body.comment == ''
//     //         ) {
//     //         응답.send('데이터를 모두 넣어주세요')
//     //     } else {
//     //         await db.collection('product').insertOne (
//     //             {
//     //                 title : 요청.body.title,
//     //                 comment : 요청.body.comment
//     //             }
//     //         )
//     //         응답.redirect('/product/new')
//     //     }
//     // } catch(error) {
//     //     console.log(error)
//     //     응답.status(500).send('서버에러')
//     // }
// })



module.exports = router;