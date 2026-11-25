import express from "express";
// variável para acessar os métodos express
const app = express();
// ativa o leitor json
app.use(express.json())

// controller e routes

// simula banco de dados
let usuario = [];
// rota saida de dados
app.get('/usuarios',(req, res)=>{
    const nomeBusca = req.query.nome;
    if(nomeBusca){
        const nomes = usuario.filter( (i)=>{
            return i.nome.toLowerCase().includes(nomeBusca.toLowerCase());  
        } )
        return res.status(200).json(nomes);
    }
    res.json([...usuario]);
})
app.post('/usuarios',(req, res)=> {
    console.log(req.body);
    usuario.push(req.body)
    res.status(201).json({mensagem:"Cliente Cadastrado!"})
})
app.delete('/usuarios/:id',(req,res)=>{
    const idDelete =parseInt(req.params.id);
    console.log(idDelete);
    const index = usuario.findIndex((i)=>{
        return i.id == idDelete;
    })
    if(index==-1){
        return res.status(404).json({msg:"id não encontrado!"});
    }
    usuario.splice(index,1);
    return res.status(200).json({msg:"usuário excluido!"})
})



app.listen(3000, ()=>{
   console.log("Servidor Rodando! ") 
})
// http://localhost:3000