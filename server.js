import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Shape from './models/Shape'

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());  

mongoose.connect('mongodb://localhost:27017/shapes');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
})

router.route('/shapes').get((req,res) => {
    Shape.find((err, shapes) => {
        if(err){
            console.log(err);
        }else{
            res.json(shapes);
        }
    });
});

router.route('/shapes/:id').get((req, res) => {
    Shape.findById(req.params.id, (err, shape) => {
        if(err){
            console.log(err)
        } else{
            res.json(shape);
        }
    });
});

router.route('/shapes/add').post((req,res) => { 
    let shape = new Shape(req.body);
    shape.save()
        .then(shape => {
            res.status(200).json(shape);
        })
        .catch(err => {
            res.status(400).send('Faild to  create new record');
        });
});

router.route('/shapes/update/:id').put((req, res) => {
    console.log("Server put response: ", res);
    Shape.findById(req.params.id, (err, shape) => {
        console.log("Server put: ",shape);
        if(!shape){
            return next(new Error('Could not load document'));
        }else{ 
            console.log("Server req.body : ", req.body);                 
            if(req.body.text != null){
            shape.text = req.body.text;}
            if(req.body.color != null){
            shape.color = req.body.color;}
            if(req.body.borderColor != null){
            shape.borderColor = req.body.borderColor;}
            if(req.body.position.xBegin != null){
                console.log("ovde")
            shape.position.xBegin = req.body.position.xBegin;}
            if(req.body.position.yBegin != null){
            shape.position.yBegin = req.body.position.yBegin;}
            if(req.body.position.rectangleWidth != null){
            shape.position.rectWidth = req.body.position.rectWidth;}
            if(req.body.position.rectHeight != null){
            shape.position.rectHeight = req.body.position.rectHeight;}
            if(req.body.position.radius != null){
            shape.position.radius = req.body.position.radius;}     

            shape.save().then(shape => {
                console.log("Server put after save: ",shape)
                res.json(shape);
            }).catch(err => {
                res.status(400).send('Update faild');
            });
        }
        console.log("ovde shape",shape)
    });
});

router.route('/shapes/delete/:id').delete((req, res) => {
    Shape.findByIdAndRemove({_id: req.params.id}, (err, shape) => {
        if(err){
            res.json(err);
        }else{
            res.json('Remove successfully');
        }
    })
})

app.use('/', router);

app.listen(4000, ()=> console.log('Express server running on port 4000'));