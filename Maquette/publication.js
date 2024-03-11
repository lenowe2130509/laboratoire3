
const params = new URLSearchParams(window.location.search);

const id = params.get('id');

function Blog(publicationId) {
fetch(`http://localhost:3000/Publications/${publicationId}`)
.then(response => response.json())
.then(json => CreationBlog(json))
.catch(err => console.log(err));  
}
Blog(id);

function CreationBlog(Publications)
{
const logo = `      
        <img src="image/planete.png" class="img-fluid mx-auto d-block" width="210" height="172">
        <h1 class="display-4">${Publications.titre}</h1>
    `;
    $('#logo').append(logo);
    $('#texting').append(Publications.contenu);

}

fetch('http://localhost:3000/Commentaires')
.then(response => response.json())
.then(json => json.filter(commentaire => commentaire.publication == id).forEach(commentaire => {
    const profile = `
    <div class="col-md-4" id="profile-comment">
            <img src="image/connection.png" width="120" height="96">
            <h5 class="card-title">${commentaire.auteur}</h5>
        </div>  
        <div class="col-md-12">
            <div class="card-body">
                <p class="card-text">${commentaire.contenu}</p>
                <div class="form-group">
                    <label for="exampleFormControlTextarea1"><h3>Réponse :</h3></label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    <div class="text-right">
                        <button type="submit" class="btn btn-dark" id"envoierCommentaire">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    `; 
    $('#comments').append(profile);
}))

.catch(err => console.log(err));


function CreerPublication(Publications){
    let article = `
    <div class="col-lg-4 col-md-6 mb-4">
        <div class="card" >
        <img src="image/cepi1.png" class="img-fluid mx-auto d-block" width="120" height="96" alt="Article 1">
        <div class="card-body">
            <h5 class="card-title">${Publications.titre}</h5>
            <p class="card-text">${Publications.contenu}</p>  
            <a href="blog.html?id=${Publications.id}" class="btn btn-primary">Lire la suite</a>
        </div>
        </div>
    </div>
    `;
    $('#Publications').append(article);
}

function dialogue() {
    $("envoyerCommentaire").click(function(ev) {
        ev.preventDefault();
        $("<div></div>").dialogue({
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            title: "Confirmer l'envoi",
            buttons: {
                "Confirmer": function() {
                    const form = document.getElementById('envoyerCommentaire');
                    fetch('http://localhost:3000/Commentaires', {
                        method: 'POST',
                        body: JSON.stringify({
                            publication: id,
                            date : new Date(),
                            contenu: document.getElementById('exampleFormControlTextarea1').value
                        }),
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8',
                        }
                    })
                    .then(response => {
                        if (response.ok) {
                            window.location.href = 'http://127.0.0.1:5502/Maquette/blog.html';
                        } 
                        else {
                            alert('Une erreur est survenue');
                        }
                    })
                    .catch(error => {   
                        alert('Une erreur est survenue');
                    });
                    $(this).dialogue("close");
                    },
                },
                Annuler: function() {
                    $(this).dialogue("close");
                }
            }
        );
    })
}
dialogue(); 




/*const newComment = document.getElementById('envoyerCommentaire').value;

// Envoyer le nouveau commentaire au serveur
fetch('http://localhost:3000/Commentaires', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
        publication: id,
        date : new Date(),
        contenu: newComment,
    })
})
.then(response => response.json())
.then(() => {
    // Rafraîchir la liste des commentaires pour inclure le nouveau commentaire
    $('#comments').empty(); // Effacer le contenu précédent des commentaires
    fetch(`http://localhost:3000/Publications/${id}`)
    .then(response => response.json())
    .catch(err => console.log(err));  
    })
    .catch(err => console.log(err));

//post avec le contenu du commentaire dans le json un peu comme ajouter un blog */