const express = require('express')
const EmailPrueba = express()
const ejs = require("ejs");
const path = require('path');
const Colors = require('../../Global/Colors.json')
const Links = require('../../Global/Links.json')
const Names = require('../../Global/Names.json')

EmailPrueba.get('/emailV/news', async (req, res) => {

    const parrafosHead = [
        "ContaNET le da la bienvenida a la plataforma herramienta para contadores."
    ]

    const datos2 = {
        Colors,
        Links,
        Names,
        //Particular
        //Head
        titlePage: "Noticias",
        titleHead: "Hola Retondo Javier",
        parrafosHead: parrafosHead,

        //ActionBtn       
        textCall: "Confirmar Correo",
        redirectCall: "https://nekonet.com.ar",

        //News
        textSubtitle: "Everything is moving at a fast pace, where things are changing daily. People are consuming content so quickly that whatever happened yesterday becomes the news of the past. ",
        imageNews: "https://youngfreeflorida.com/wp-content/uploads/2019/06/Marketplace-Lending-News-300x176.jpg",
        textNews: "Everything is moving at a fast pace, where things are changing daily. People are consuming content so quickly that whatever happened yesterday becomes the news of the past. To stay updated at all times, news apps and digital subscriptions should push out content based on the latest happenings that will spark an interest in their audience. A feature that is highly appreciated by the younger audience is keeping the news articles short and simple, for quick consumption. Incorporating short news items and articles can attract a lot of young people as your new users. To make things even easier, many apps have the news in audio and video form! Another great tactic would be to localise your app! Making your content available in many languages can have a great impact while trying to expand your app’s reach. Being able to choose the content users are interested in and want to read about and to share it must also be another feature that should be considered while trying to make a news app. Shortpedia, an app that we recently discovered and that has these amazing features has changed the way I read the news! With the help of this app, you get to read up on things that you were probably never aware of before. ",
        titleNews: "Nuevo Producto"
    }

    ejs.renderFile(path.join(__dirname, '..', '..', '..', "views", "registrado.ejs"), function (err, data) {

        res.render('Emails/Templates/NewsPlatform.ejs', datos2);
    });

})

module.exports = EmailPrueba