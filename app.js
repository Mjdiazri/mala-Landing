// const imagenPrincipal = document.getElementById("imagenPrincipal");
// const nombrePlato = document.getElementById("nombrePlato");
// const descripcionPlato = document.getElementById("descripcionPlato");

// const tarjeta1 = document.getElementById("tarjeta1");
// const tarjeta2 = document.getElementById("tarjeta2");





// //cuando el usuario de click en cada tarjeta

// tarjeta1.addEventListener("click", function () {
//     imagenPrincipal.src = "img/img/NiúyóuMálà.png";
//     nombrePlato.textContent = "1. 牛油麻辣火锅 (Niúyóu Málà Huǒguō)";
//     descripcionPlato.textContent = "Caldo tradicional de Sichuan preparado con manteca de res, chiles secos y pimienta de Sichuan.";
// });

// tarjeta2.addEventListener("click", function () {
//     imagenPrincipal.src = "img/img/YuānyāngHuǒguō.png";
//     nombrePlato.textContent = "2. 鸳鸯火锅 (Yuānyāng Huǒguō)";
//     descripcionPlato.textContent = "Hot Pot de doble caldo: una mitad intensamente picante y otra de sabor suave.";
// });



const imagenPrincipal = document.getElementById("imagenPrincipal");
const nombrePlato = document.getElementById("nombrePlato");
const descripcionPlato = document.getElementById("descripcionPlato");

const btnHotPot = document.getElementById("btnHotPot");
const btnFideos = document.getElementById("btnFideos");
const btnClasicos = document.getElementById("btnClasicos");

const flechaAnterior = document.getElementById("flechaanterior");
const flechaSiguiente = document.getElementById("flechasiguiente");

const imagenPlato1 = document.getElementById("imagenplato1");
const nombrePlato1 = document.getElementById("nombreplato1");
const descripcionPlato1 = document.getElementById("descripcionPlato1");

const imagenPlato2 = document.getElementById("imagenplato2");
const nombrePlato2 = document.getElementById("nombreplato2");
const descripcionPlato2 = document.getElementById("descripcionPlato2");

console.log("JavaScript conectado");   //muestra que si quedo conectado js y botones si funcionan
console.log(btnHotPot);    //muestra que si quedo conectado js y botones si funcionan
console.log(btnFideos);  //muestra que si quedo conectado js y botones si funcionan
console.log(btnClasicos);  //muestra que si quedo conectado js y botones si funcionan



const categorias = {
    hotpot: [
        {imagen: "img/img/NiúyóuMálà.png",
            nombre: "牛油麻辣火锅 (Niúyóu Málà Huǒguō)",
            descripcion: "Caldo tradicional de Sichuan preparado con manteca de res, chiles secos y pimienta de Sichuan."
        },
        {imagen: "img/img/YuānyāngHuǒguō.png",
            nombre: "鸳鸯火锅 (Yuānyāng Huǒguō)",
            descripcion: "Hot Pot de doble caldo: una mitad intensamente picante y otra de sabor suave."
        }
    ],

    fideos: [
        {imagen: "img/img/dananmian.png",
            nombre: "担担面 (Dàndàn Miàn)",
            descripcion: "Fideos servidos con carne de cerdo picada, aceite de chile, pasta de sésamo y pimienta de Sichuan."
        },

        {
            imagen: "img/img/YíbīnRánmiàn.png",
            nombre: "宜宾燃面 (Yíbīn Ránmiàn)",
            descripcion: "Fideos secos mezclados con aceite de chile, maní tostado, cebollín y especias tradicionales."
        }
    ],

    clasicos: [
        {imagen: "img/img/MápóDòufu.png",
            nombre: "麻婆豆腐 (Mápó Dòufu)",
            descripcion: "Tofu sedoso cocinado con carne de cerdo picada, pasta de frijol fermentado y el característico sabor málà."
        },

        {imagen: "img/img/GōngbǎoJīdīng.png",
            nombre: "宫保鸡丁 (Gōngbǎo Jīdīng)",
            descripcion: "Pollo salteado con cacahuates, chiles secos y una salsa ligeramente dulce y picante."
        }
    ]
};


let categoriaActual = "hotpot";
let platoActual = 0;


function mostrarPlato() {
    const plato = categorias[categoriaActual][platoActual];
    imagenPrincipal.src = plato.imagen;
    nombrePlato.textContent = plato.nombre;
    descripcionPlato.textContent = plato.descripcion;
}

function mostrarTarjetas() {

    const plato1 = categorias[categoriaActual][0];
    const plato2 = categorias[categoriaActual][1];

    imagenPlato1.src = plato1.imagen;
    nombrePlato1.textContent = plato1.nombre;
    descripcionPlato1.textContent = plato1.descripcion;

    imagenPlato2.src = plato2.imagen;
    nombrePlato2.textContent = plato2.nombre;
    descripcionPlato2.textContent = plato2.descripcion;
}


btnHotPot.addEventListener("click", function () {
    console.log("Hot Pot presionado");   //si funciona el boton
    categoriaActual = "hotpot";
    platoActual = 0;
    mostrarPlato();
    mostrarTarjetas();
});


btnFideos.addEventListener("click", function () {
    console.log("Fideos presionado");   //si funciona el boton
    categoriaActual = "fideos";
    platoActual = 0;
    mostrarPlato();
    mostrarTarjetas();
});


btnClasicos.addEventListener("click", function () {
    console.log("Clásicos presionado");     //si funciona el boton
    categoriaActual = "clasicos";
    platoActual = 0;
    mostrarPlato();
    mostrarTarjetas();
});


flechaSiguiente.addEventListener("click", function () {
    platoActual++;
    if (platoActual >= categorias[categoriaActual].length) {
        platoActual = 0;
    }
    mostrarPlato();
});



flechaAnterior.addEventListener("click", function () {
    platoActual--;
    if (platoActual < 0) {
        platoActual = categorias[categoriaActual].length - 1;
    }
    mostrarPlato();
});


mostrarPlato();
mostrarTarjetas();



