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

function GetPublications(){
    fetch('http://localhost:3000/Publications')
    .then(response => response.json())
    .then(json => json.reverse().forEach(Publications => {CreerPublication(Publications)}))
    .catch(err => console.log(err));
}
GetPublications();

function dialog() {
    $(".btn.btn-primary").click(function(ev) {
        ev.preventDefault();
        $("<div></div>").dialog({
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            title: "Confirmer l'envoi",
            buttons: {
                "Confirmer": function() {
                    const form = document.getElementById('AddPublication');
                    fetch('http://localhost:3000/Publications', {
                        method: 'POST',
                        body: JSON.stringify({
                            titre: document.getElementById('titre').value,
                            auteur: document.getElementById('auteur').value,
                            date: document.getElementById('datepicker').value,
                            contenu: document.getElementById('contenu').value,
                        }),
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8',
                        }
                    })
                    .then(response => {
                        if (response.ok) {
                            window.location.href = 'http://127.0.0.1:5502/Maquette/index.html';
                        } 
                        else {
                            alert('Une erreur est survenue');
                        }
                    })
                    .catch(error => {   
                        alert('Une erreur est survenue');
                    });
                    $(this).dialog("close");
                    },
                },
                Annuler: function() {
                    $(this).dialog("close");
                }
            }
        );
    })
}
dialog();   

