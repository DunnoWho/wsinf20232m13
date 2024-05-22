const express = require('express');
const { Sequelize, Model, DataTypes } = require('sequelize');
const app = express();
app.use(express.urlencoded({ extended: true }));

const sequelize = new Sequelize("freedb_wsinf20232m13", "freedb_wsinf20232m13", "vu%Fv&D*8TkY936", {
    host: "sql.freedb.tech",
    port: 3306,
    dialect: "mysql"
});

class Post extends Model { };
Post.init({
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.STRING },
}, { sequelize, underscored: true, timestamps: false });

app.get("/api/post", async function (req, res) {
    return res.status(200).send(await Post.findAll());
})

const multer = require("multer");
const upload = multer({ dest: "./uploads" });
app.use("/uploads", express.static("./uploads"));
const fs = require("fs");
app.post("/api/upload-pic", upload.single("pic"), function (req, res) {
    fs.renameSync(`./uploads/${req.file.filename}`, `./uploads/${req.file.filename}.png`)
    return res.status(200).json({ img: `/uploads/${req.file.filename}.png` });
});

const port = 3000;
app.listen(port, function () {
    console.log(`listening on port ${port}...`);
});