

// Stylisation de la section Mes Projets 

const modal1 = document.getElementById("projet-modal1");
const modal2 = document.getElementById("projet-modal2");
const modal3 = document.getElementById("projet-modal3");
const modal4 = document.getElementById("projet-modal4");
const closeBtn1 = modal1.querySelector(".close");
const closeBtn2 = modal2.querySelector(".close");
const closeBtn3 = modal3.querySelector(".close");
const closeBtn4 = modal4.querySelector(".close");
const projet1 = document.getElementById("projet1");
const projet2 = document.getElementById("projet2");
const projet3 = document.getElementById("projet3");
const projet4 = document.getElementById("projet4");


// Ouvrir la modale lorsque l'utilisateur clique sur le projet

projet1.onclick = function(){
    modal1.style.display = "block";
};

projet2.onclick = function(){
    modal2.style.display = "block";
};

projet3.onclick = function(){
    modal3.style.display = "block";
};

projet4.onclick = function(){
    modal4.style.display = "block";
};

// Fermer la modale lorsque l'utilisateur clique sur le "x"

closeBtn1.onclick = function(){
    modal1.style.display = "none";
};

closeBtn2.onclick = function(){
    modal2.style.display = "none";
};

closeBtn3.onclick = function(){
    modal3.style.display = "none";
};

closeBtn4.onclick = function(){
    modal4.style.display = "none";
};

// Fermer le modale si l'utilisateur clique à l'exterieur de la modale

window.onclick = function(event)
{
    if(event.target == modal1)
    {
        modal1.style.display = "none";
    }
    else if(event.target == modal2)
    {
        modal2.style.display = "none";
    }
    else if(event.target == modal3)
    {
        modal3.style.display = "none";
    }
    else if(event.target == modal4)
    {
        modal4.style.display = "none";
    }
}


// stylisation de la section contact
const form = document.getElementById("contact-form");
form.addEventListener("submit", function(event){

    const nom = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Vérification des champs
    if(nom === "" || email === "" || message === "")
    {
        alert("Tous les champs doivent être remplis !");
        event.preventDefault();
    }

    // Vérification du format de l'email
    
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if(!emailPattern.test(email))
    {
        alert("Veuillez entrer une email valide !");
        event.preventDefault();
    }
});
