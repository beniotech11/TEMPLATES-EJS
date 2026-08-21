const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

router.get("/", (req, res)=>{
    res.render("pages/index-adm");
})

router.get("/adm-cliente", (req, res)=>{
    res.render("pages/adm-cliente");
})

router.get("/adm-cliente-novo", (req, res)=>{
    res.render("pages/adm-cliente-novo");
})

router.post("/adm-cliente-novo", [



    check("nome", "O nome é obrigatório").notEmpty(),
    check("email", "Digite um e-mail válido").isEmail(),
    check("senha", "A senha deve ter no mínimo 6 caracteres").isLength({ min: 6 })
], (req, res)=>{

    const erros = validationResult(req);

    if (!erros.isEmpty()) {
        return res.render("pages/adm-cliente-novo", { 
            erros: erros.array(),
            dados: req.body 
        });
    }

    let nome = req.body.nome;
    let email = req.body.email;
    let senha = req.body.senha;

    res.send(`Cliente cadastrado com sucesso! Nome: ${nome}, E-mail: ${email}`);
})

router.get("/adm-cliente-edit", (req, res)=>{
    res.render("pages/adm-cliente-edit");
})

router.get("/adm-cliente-list", (req, res)=>{
    res.render("pages/adm-cliente-list");
})

router.get("/adm-cliente-del", (req, res)=>{
    res.render("pages/adm-cliente-del");
})

module.exports = router;