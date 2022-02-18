
const fs=require("fs");
const db= require("./application/models/db.js")
const express = require('express');
const app = express();
const port = 4000;



app.use( express.static( "public" ) );
app.use('/CSS', express.static(__dirname + 'CSS'))
app.use('./public/images', express.static(__dirname + 'images'))

app.set('view engine', 'ejs');


//profil fait Mohamed Wafi
app.get('/profils/:profil', (req, res) => {
    //Tout d'abord il faut déclarer la variable idProfil extraite de l'URL saisi
    var idProfil=req.params.profil;
    //Déclaration de la requête SQL dans le format suivant (très important) pour chercher les infos du profil relié à l'ID saisi
    let requeteSQL='SELECT * FROM utilisateurs WHERE id=' + "'" + idProfil + "'"; 
    //ON FAIT LA REQUÊTE !!         
    db.query(requeteSQL,(err, result) => {
        if(err) throw err;
        //La réponse est la page profil.ejs
        //On déclare 'profil' ci-bas, car on va le reprendre dans la page profil.ejs
        res.render('profil.ejs', {profil: result});
    });
    
    

});

/**
 * Pages d'ouverture
 */

app.get('/login', async (req, res) => {
    //show all users
    //const users = await User.find()
    //console.log(users)
    res.render('login');
});

//register and login
app.post('/login', async (req, res) => {
    const dataReceived = req.body
    //console.log(dataReceived);

    //register
 

    //login

    res.redirect("/")
        //end of login
    

 
});//end of post

//acceuil
app.get('/',(req,res) => {
    res.render('Acceuil');
});

//recherche liste de donnee
app.get('/recherche', (req, res) => {  
    res.render('recherche')  
})

//livre
app.get('/livres/:livre', (req, res) => {
    res.render('livres')
});



require("./application/routes/livre.routes.js")(app);
require("./application/routes/utilisateur.routes.js")(app);
app.listen(port, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", port);
});


