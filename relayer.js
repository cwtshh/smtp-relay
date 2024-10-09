
require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 5980;
const app = express();
const nodemailer = require('nodemailer');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/test', (req, res) => {
    res.status(200).send('Server is running');
})
app.post('/sendMail', (req, res) => {
    const { smtp, dest, rem, auth, pass, conteudo, assunto, porta, secure } = req.body;
    const mailOption = {
        from: rem,
        to: dest,
        subject: assunto,
        text: conteudo
    };
    const transporter = nodemailer.createTransport({
        host: smtp,
        port: porta,
        secure: secure,
        auth: {
            user: auth,
            pass: pass
        }
    });
    transporter.sendMail(mailOption, (err, info) => {
        if (err) {
            console.log(err);
            res.status(400).send
            return;
        }
        console.log(info);
        res.status(200).send(info);
    });
});


app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});
