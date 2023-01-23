import * as mongoose from 'mongoose';


export const ArticleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    comments: {type: Array<String>, required:false},
    bewertung: {type: Array<String>, required:false},
    updatedAt: { type: Date, default: Date.now },
})