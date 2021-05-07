$(document).ready(function() {
    txokosPopulares();
    datosCiudades();
    recuperarDatosBusqueda();
});

function datosCiudades() {
    var datos = "accion=datosCiudades";
    $.ajax({
        url: 'php/dao/ReservaDao.php',
        type: 'POST',
        data: datos,
        success: procesaDatosCiudades

    });
}

function procesaDatosCiudades(data) {
    var resp = JSON.parse(data);
    var listaDatosTxokos = $(".ciudadesTxokos");
    resp.txokos.forEach(function(txoko, index) {
        listaDatosTxokos.append(cartaCiudad(txoko.Ubicacion, txoko.num_txokos, index))
    });
}

function enviarAviso() {
    var datos = "enviarAvisos=1";
    $.ajax({
        url: 'php/phpmailer/sendemail.php',
        type: 'POST',
        data: datos,
        success: avisoEnviado
    });
}

function avisoEnviado() {
    alert("Enviado");
}

function cartaCiudad(ubicacion, num_txokos, index) {
    var carta = `<div class="col-lg-`
    if (index == 0 || index == 3)
        carta += `12 col-md-6">`
    else
        carta += `6 col-md-6">`
    carta += `<div class="card" style="background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.2)), url('assets/img/portfolio/ciudades/${ubicacion}.jpg');">
                    <div class="card-category">${ubicacion}</div>
                    <div class="card-description">
                        <h2>+ <span data-purecounter-start="0" data-purecounter-end="${num_txokos}" data-purecounter-decimals="0" data-purecounter-once="true" class="purecounter">${num_txokos}</span> Txoko(s)</h2>
                        <p>Lovely house</p>
                    </div>
                    <img class="card-user avatar avatar-large" src="assets/img/pais-vasco.png">
                    <a class="card-link" href="reserva_filtro.html?UbicacionBuscar=${ubicacion}&fechaBuscar=2021-05-06&mesaBuscar=2&precioBuscar=10-20&turnoBuscar=M"></a>
                    </div>
                </div>`
    return carta;
}

function txokosPopulares() {
    var datos = "accion=txokospopulares";
    $.ajax({
        url: 'php/dao/ReservaDao.php',
        type: 'POST',
        data: datos,
        success: procesaTxokosPopulares

    });
}

function procesaTxokosPopulares(data) {
    var resp = JSON.parse(data);
    var listaTxokoPopulares = $(".txokospopulares");
    resp.txokos.forEach(function(txoko, index) {
        listaTxokoPopulares.append(carta(txoko.ID, txoko.Nombre, index, resp.txokos))
    });

}

function carta(idTxoko, nombreTxoko, index, txokos) {

    if (index == 0) {
        var colum = $("<div></div>").addClass("carousel-item active");
    } else {
        var colum = $("<div></div>").addClass("carousel-item");
    }

    /*
    1 2 3
    2 3 4
    3 4 5
    4 5 6 
    5 6 1	
    6 1 2
    */

    for (var i = 0; i < 3;) {
        var indice = i + index
        if (indice > 5) {
            indice = indice - txokos.length
        }

        //Datos del txoko
        var txokoActual = txokos[indice];
        var idTxoko = txokoActual.ID;
        var nombreTxoko = txokoActual.Nombre;
        var mediaValoracion = txokoActual.Valoracion

        var carta = $("<div></div>").addClass("col-md-4");
        var imgCarta = $("<img>").addClass("img-fluid");
        imgCarta.attr("src", "assets/img/portfolio/fullsize/" + idTxoko + ".jpg");

        var cartaInfo = $("<div></div>").addClass("card card-body");
        var cartaInfo2 = $("<ul></ul>").addClass("list-group list-group-flush");


        //Datos del txoko
        var nombreTxoko = $("<h5></h5>").text(nombreTxoko);
        var descripcionTxoko = $("<p></p>").addClass("card-text");
        descripcionTxoko.text("Some quick example text to build on the card title and make up the bulk of the card's content.");
        var valoracionTxoko = $("<li></li>").addClass("list-group-item");

        var infoValoracion = $("<span></span>").addClass("stars");
        infoValoracion.attr("id", "valoracion");
        infoValoracion.text("Valoracion general: [" + mediaValoracion + "]");
        var estrellas = $('<span />').width(Math.max(0, (Math.min(5, parseFloat(mediaValoracion)))) * 30);

        //Aniadir el contenido
        infoValoracion.append(estrellas);
        valoracionTxoko.append(infoValoracion);
        cartaInfo2.append(valoracionTxoko);
        cartaInfo.append(nombreTxoko, descripcionTxoko, cartaInfo2);
        carta.append(imgCarta, cartaInfo);

        colum.append(carta);
        i++;
    }
    return colum;
}


function validarBusqueda() {

    var esValido = true;

    //Datos busqueda
    var ubicacion = $("#ubicacion");
    var fecha = $("#fecha");
    var nummesas = $("#numeromesas");
    var precioreserva = $("#precioreserva");
    var turnoreserva = $("#turno");

    //Comprueba si alguno esta vacio o es la primera opcion del select
    if (ubicacion.val() == "" || fecha.val() == "" || nummesas.val() == 0 || precioreserva.val() == 0 || turnoreserva.val() == "") {
        esValido = false;
    } else
        var datos = "?UbicacionBuscar=" + ubicacion.val() + "&fechaBuscar=" + fecha.val() + "&mesaBuscar=" + nummesas.val() + "&precioBuscar=" + precioreserva.val() + "&turnoBuscar=" + turnoreserva.val();

    if (esValido == true) {
        alert("valido");
        window.location = "reserva_filtro.html" + datos;
        return false;
    }
}

function recuperarDatosBusqueda() {
    var ubicacionForm = $("#ubicacion");
    var fechaForm = $("#fecha");
    var mesasForm = $("#numeromesas");
    var precioForm = $("#precioreserva");
    var turnorform = $("#turno");

    //Url parametros
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if (queryString != "") {
        //Datos pasados en la url
        const ubicacionBuscar = urlParams.get('UbicacionBuscar');
        const fechaBuscar = urlParams.get('fechaBuscar');
        const mesaBuscar = urlParams.get('mesaBuscar');
        const precioBuscar = urlParams.get('precioBuscar');
        const turnoBuscar = urlParams.get('turnoBuscar');


        //Comprobar
        if (ubicacionBuscar == "") {
            ubicacionForm.addClass("is-invalid");
        } else {
            ubicacionForm.val(ubicacionBuscar)
        }

        if (fechaBuscar == "") {
            fechaForm.addClass("is-invalid");
        } else {
            fechaForm.val(fechaBuscar)
        }

        if (mesaBuscar == 0) {
            mesasForm.addClass("is-invalid");
        } else {
            mesasForm.val(mesaBuscar)
        }

        if (precioBuscar == 0) {
            precioForm.addClass("is-invalid");
        } else {
            precioForm.val(precioBuscar)
        }

        if (turnoBuscar == 0) {
            turnorform.addClass("is-invalid");
        } else {
            turnorform.val(turnoBuscar)
        }
    }
}