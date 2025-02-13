"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const express_1 = __importDefault(require("express"));
const todo_1 = __importDefault(require("./routes/todo"));
const body_parser_1 = require("body-parser");
const Mongo = require('mongoose');
exports.db = new Mongo();
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.listen(3000);
app.use('/todos', todo_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
