// UNICERSIDAD ICEL
// MARIO ALCÁNTARA CORTÉS
// ATRACTOR DE LORENZ

// VALIDAR LOS CAMPOS SOLICITADOS
function validar(){
    var sigma = document.getElementById("sigma").value;
    var rho = document.getElementById("rho").value;
    var beta = document.getElementById("beta").value;
    var time = document.getElementById("time").value;

    if((sigma!=0)&&(rho!=0)&&(beta!=0)&&(time!="")){
        iniciar();
    }else{
        alert("Los valores solicitados no han sido asignados, nosotros asignaremos valores por ti.");

        document.getElementById("sigma").value = 10;
        document.getElementById("rho").value = 28;
        document.getElementById("beta").value = 8.0 / 3.0;
        document.getElementById("time").value = 0;
    }
}

// INICIAR EL PROGRAMA
function iniciar(){
    var xt = 0.1,
        yt = 0,
        zt = 0;
    var t = 0.01;
    var count = 0;

    // INGRESO DE VALORES
    var sigma = document.getElementById("sigma").value;
    var rho = document.getElementById("rho").value;
    var beta = document.getElementById("beta").value;
    var time = document.getElementById("time").value;

    // MÉTODO RURGE-KUTTA
    function iterate() {
        var x = xt + t * sigma * (yt - xt);
        var y = yt + t * (xt * (rho - zt) - yt);
        var z = zt + t * (xt * yt - beta * zt);

        var texto = "I = " + (count + 1) + "\n" + 
                    "X = " + x + "\n" + 
                    "Y = " + y + "\n" + 
                    "Z = " + z + "\n\n";

        document.getElementById("X-Y-Z").innerHTML += texto;
        document.getElementById("X-Y-Z").scrollTop = document.getElementById("X-Y-Z").scrollHeight;

        xt = x;
        yt = y;
        zt = z;
        count++;
    }

    // ATRACTOR DE LORENZ
    function update() {
        var svg = document.getElementById("atractorDeLorenz");

        if (count > 10000) {
            while (svg.lastChild && svg.lastChild.tagName == "circle") {
                svg.removeChild(svg.lastChild);
            }
            count = 0;
            xt = 0.1;
            yt = zt = 0;
        }

        iterate();

        var cir = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        cir.setAttribute("cx", 325 + 10 * xt);
        cir.setAttribute("cy", 50 + 10 * zt);
        cir.setAttribute("r", 1);
        cir.setAttribute("fill", "url(#lg)");
        cir.setAttribute("stroke", "#943126");
        // cir.setAttribute("stroke", "#49FCF2");
        cir.setAttribute("stroke-width", "2");
        svg.appendChild(cir);

        var circle = "CX = " + (325 + 10 * xt) + "\n" + 
                     "CY = " + (50 + 10 * zt) + "\n\n";
                     
        document.getElementById("circle").innerHTML += circle;
        document.getElementById("circle").scrollTop = document.getElementById("circle").scrollHeight;
    }

    var windowInterval = window.setInterval(update, time);
}
