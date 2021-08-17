const express = require('express')
const EmailPrueba = express()
const ejs = require("ejs");
const path = require('path');
const Colors = require('../../Global/Colors.json')
const Links = require('../../Global/Links.json')
const Names = require('../../Global/Names.json')

EmailPrueba.get('/emailV/mkt', async (req, res) => {

    const informationList = [{
        col1: 6,
        title1: "CUIT",
        content1: "20350925148",
        col2: 6,
        title2: "Persona",
        content2: "Fisica"
    }, {
        col1: 12,
        title1: "Razón Social",
        content1: "Retondo Javier Edgardo"
    }, {
        col1: 12,
        title1: "Dirección",
        content1: "Av. Emilio Olmos 324, Córdoba"
    }]

    const productsList = [{
        image1: "https://cordobabaitcast.com.ar/NodeServer/Public/Imagenes/Productos/156.jpg",
        link1: "https://mant.cordobabaitcast.com.ar/product/58",
        text1: "Reel Tech Volcan manija izquierda $7.183,00",
        image2: "https://cordobabaitcast.com.ar/NodeServer/Public/Imagenes/Productos/156.jpg",
        link2: "https://mant.cordobabaitcast.com.ar/product/58",
        text2: "Reel Tech Volcan manija izquierda $7.183,00"
    }, {
        image1: "https://cordobabaitcast.com.ar/NodeServer/Public/Imagenes/Productos/156.jpg",
        link1: "https://mant.cordobabaitcast.com.ar/product/58",
        text1: "Reel Tech Volcan manija izquierda $7.183,00",
        image2: "https://cordobabaitcast.com.ar/NodeServer/Public/Imagenes/Productos/156.jpg",
        link2: "https://mant.cordobabaitcast.com.ar/product/58",
        text2: "Reel Tech Volcan manija izquierda $7.183,00"
    }, {
        image1: "https://cordobabaitcast.com.ar/NodeServer/Public/Imagenes/Productos/156.jpg",
        link1: "https://mant.cordobabaitcast.com.ar/product/58",
        text1: "Reel Tech Volcan manija izquierda $7.183,00",
        image2: "https://cordobabaitcast.com.ar/NodeServer/Public/Imagenes/Productos/156.jpg",
        link2: "https://mant.cordobabaitcast.com.ar/product/58",
        text2: "Reel Tech Volcan manija izquierda $7.183,00"
    }]

    const parrafosHead = [
        "ContaNET le da la bienvenida a la plataforma herramienta para contadores."
    ]

    const datos2 = {
        Colors,
        Links,
        Names,
        //Particular
        //Head
        titlePage: "Productos",
        titleHead: "Hola Retondo Javier",
        parrafosHead: parrafosHead,

        //ActionBtn
        titleButton: "Haga click en el siguiente botón para confirmar su correo electrónico",
        textCall: "Confirmar Correo",
        textCall2: "Ver",
        redirectCall: "https://nekonet.com.ar",

        //InfoForm
        titleInfoForm: "Sus Datos",
        informationList: informationList,

        //News
        textSubtitle: "Producto tanto $15.650,50",
        imageNews: "https://cordobabaitcast.com.ar/NodeServer/Public/Imagenes/Productos/156.jpg",
        textNews: "Producto tanto $15.650,50",
        titleNews: "Nuevo Producto",

        //Products
        productsList: productsList
    }

    ejs.renderFile(path.join(__dirname, '..', '..', '..', "views", "registrado.ejs"), function (err, data) {

        //res.render('Emails/Templates/ConfirmEmail.ejs', datos2);
        //res.render('Emails/Templates/NewsPlatform.ejs', datos2);
        res.render('Emails/Templates/EmailMarketing.ejs', datos2);
    });

})

module.exports = EmailPrueba