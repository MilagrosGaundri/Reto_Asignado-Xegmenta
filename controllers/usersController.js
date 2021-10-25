const fs = require('fs')
const path = require('path');
const dbUsers = require(path.join(__dirname,'..','data','dbUsers'));

module.exports = {
    index: (req,res) => {
        res.render('index',{
            title: "Home",
        })
    },
    list: (req,res) => {
        res.render('userList',{
            title: "Lista de Usuarios",
            users: dbUsers
        })
    },
    create : (req,res) =>{
        res.render('userCreate',{
            title:'Crear Usuario',
        })
        res.end()
    },
    processCreate : (req,res) => {
        let userID = 1;

        dbUsers.forEach(user =>{
            if(user.id > userID){
                userID = user.id
            }
        })
        userID = userID + 1;
        let newUser = {
            id: userID,
            name: req.body.name.trim(),
            last_name: req.body.last_name.trim(),
            email: req.body.email.trim(),
        }
        dbUsers.push(newUser)
        fs.writeFileSync(path.join(__dirname,'../data/dbUsers.json'),JSON.stringify(dbUsers),'utf-8')
        res.redirect('/userDetail/'+ userID)
        res.render('userCreate',{
            title:'Crear Usuario',
        })
    },
    detail:function(req,res) {
        let idUser= req.params.id;
        let users = dbUsers.filter(user => {
            return user.id == idUser
        });
        res.render('userDetail',{
            title:'Detalle de Usuario',
            user:users[0],
        })
    },
    edit : (req,res) =>{
        let idUser= req.params.id;
        let users = dbUsers.filter(user => {
            return user.id == idUser
        });
        res.render('userEdit',{
            title:'Editar usuario',
            user:users[0]
        })
        res.end()
    },
    processEdit: (req,res) => {
        let idUser = req.body.id;
        dbUsers.forEach(user => {
            if(user.id == idUser){
                user.id = Number(req.body.id),
                user.name = req.body.name.trim(),
                user.last_name = req.body.last_name.trim(),
                user.email = req.body.email.trim()
            }
        })
        fs.writeFileSync(path.join(__dirname,'../data/dbUsers.json'),JSON.stringify(dbUsers),'utf-8');
        res.redirect('/userDetail/'+ idUser)
    },
    delete_account : (req,res) => {
        let idUser= req.params.id;
        dbUsers.forEach(user => {
            if(user.id == idUser){
                let remove = dbUsers.indexOf(user)
                dbUsers.splice(remove,1)
            }
        })
        fs.writeFileSync(path.join(__dirname,'../data/dbUsers.json'),JSON.stringify(dbUsers),'utf-8');
        res.redirect('/userList')
    },
    search : (req,res) => {
        let search = req.query.search;
        if(search == ""){
            res.redirect('/')
        }
        let users = [];
        dbUsers.forEach(user => {
            if(user.name.toLowerCase().includes(search.toLowerCase())){
                users.push(user)
            }else if(user.last_name.toLowerCase().includes(search.toLowerCase())){
                users.push(user)
            }else if(user.email.toLowerCase().includes(search.toLowerCase())){
                users.push(user)
            }
        })
        console.log(users)
        if(users == 0){
            res.render('userList',{
                title: "No se encontro resultados",
                users:users, 
            })
        }else{
            res.render('userList',{
                title: "Resultado de la busqueda",
                users:users, 
            })
        }
        
    }
}