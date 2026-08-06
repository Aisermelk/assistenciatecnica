/* =================================
   SCRIPT.JS
   LANDING PAGE ASSISTÊNCIA TÉCNICA
================================= */


/* ===============================
   ROLAGEM SUAVE
================================ */


document.querySelectorAll('a[href^="#"]').forEach(link => {


    link.addEventListener("click", function(e){


        e.preventDefault();


        const destino = document.querySelector(
            this.getAttribute("href")
        );


        if(destino){

            destino.scrollIntoView({

                behavior:"smooth"

            });

        }


    });


});





/* ===============================
   FORMULÁRIO ORÇAMENTO
================================= */


const formulario = document.getElementById("leadForm");



if(formulario){


formulario.addEventListener(
"submit",
function(e){


e.preventDefault();



const nome =
document.getElementById("nome").value;



const email =
document.getElementById("email").value;




const mensagem = `

Olá, meu nome é ${nome}.

Gostaria de solicitar um orçamento
para assistência técnica.

Meu email:
${email}

`;



const numeroWhatsApp =
"5500000000000";



const url = 
"https://wa.me/" +
numeroWhatsApp +
"?text=" +
encodeURIComponent(mensagem);



window.open(url,"_blank");



});


}





/* ===============================
   HEADER NO SCROLL
================================= */


const header =
document.querySelector(".header");



window.addEventListener(
"scroll",
()=>{


if(window.scrollY > 50){


header.classList.add("scrolled");


}else{


header.classList.remove("scrolled");


}


});






/* ===============================
   ANIMAÇÃO AO APARECER
================================= */


const elementos =
document.querySelectorAll(
".card, .service, .capture-box"
);



const observer =
new IntersectionObserver(
(entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


entry.target.classList.add(
"show"
);


}


});


},
{

threshold:0.15

});




elementos.forEach(
(el)=>{

observer.observe(el);

});






/* ===============================
   ANO AUTOMÁTICO FOOTER
================================= */


const ano =
document.getElementById("ano");


if(ano){

ano.textContent =
new Date().getFullYear();

}
