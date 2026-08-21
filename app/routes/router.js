const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

router.get("/", (req, res)=>{
    res.render("pages/index", {perfil:null});
})

router.get("/login", (req, res)=>{
    res.render("pages/login", {perfil:null});
})

router.post("/login", (req, res)=>{
    let nomeUser = req.body.nome;
    let senhaUser = req.body.senha;

    if(nomeUser == "joca" && senhaUser == "1234"){
        res.render("pages/perfil", {perfil:true});
    }else{
        res.send("Nome de usuário e/ou senha inválidos!");
    }
})

router.post("/cadastro", [
    check("nome", "O nome é obrigatório").notEmpty(),
    check("email", "Digite um e-mail válido").isEmail(),
    check("senha", "A senha deve ter no mínimo 6 caracteres").isLength({ min: 6 }),
    check("cSenha", "A confirmação de senha é obrigatória").notEmpty()
], (req, res)=>{

    const erros = validationResult(req);

    if (!erros.isEmpty()) {
        return res.render("pages/cadastro", { 
            erros: erros.array(), 
            perfil: null,
            dados: req.body 
        });
    }

    let nome = req.body.nome;
    let email = req.body.email;
    let senha = req.body.senha;
    let cSenha = req.body.cSenha;

    res.send(`Nome: ${nome}, e-mail: ${email} senha: ${senha} confirmação de senha ${cSenha}`);
});

router.get("/cadastro", (req, res)=>{
    res.render("pages/cadastro", {perfil:null});
})

router.post("/perfil", (req, res)=>{
    res.render("pages/perfil", {perfil:true});
})
module.exports = router;