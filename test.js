// test_sale.js - Le cauchemar des linters
var x = 10; // Utilisation de 'var' (déconseillé en JS moderne)
const y=20    // Mauvaise indentation + manque de point-virgule

function  calcul(a,b){
    if(a==b){ // Utilisation de '==' au lieu de '==='
        return a+b; // Mauvaise indentation
    }
    console.log("Calcul terminé") // Console.log souvent interdit
}

calcul(x , y);