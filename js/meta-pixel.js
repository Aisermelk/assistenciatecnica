/* =====================================
   META PIXEL
   LANDING PAGE ASSISTÊNCIA TÉCNICA
===================================== */


/*
   SUBSTITUA O ID ABAIXO
   PELO ID DO SEU PIXEL
*/


const META_PIXEL_ID = "SEU_ID_PIXEL";



if(
META_PIXEL_ID !== "SEU_ID_PIXEL"
){


/* Código oficial Meta Pixel */


!function(f,b,e,v,n,t,s)
{

if(f.fbq)
return;

n=f.fbq=function(){

n.callMethod ?

n.callMethod.apply(
n,arguments
) :

n.queue.push(arguments)

};


if(!f._fbq)
f._fbq=n;


n.push=n;

n.loaded=true;

n.version='2.0';


n.queue=[];


t=b.createElement(e);

t.async=true;


t.src=v;


s=b.getElementsByTagName(e)[0];


s.parentNode.insertBefore(
t,
s
);


}
(
window,
document,
'script',
'https://connect.facebook.net/en_US/fbevents.js'
);



fbq(
'init',
META_PIXEL_ID
);



fbq(
'track',
'PageView'
);



console.log(
"✅ Meta Pixel carregado"
);



}





/* =====================================
   EVENTO BOTÃO WHATSAPP
===================================== */


document.addEventListener(
"click",
function(e){


const botao =
e.target.closest(
".btn-primary"
);



if(botao){


if(
typeof fbq === "function"
){


fbq(
'track',
'Contact'
);


}



}


});





/* =====================================
   EVENTO FORMULÁRIO
===================================== */


document.addEventListener(
"submit",
function(e){


if(
e.target.id === "leadForm"
){


if(
typeof fbq === "function"
){


fbq(
'track',
'Lead'
);


}



}


});
