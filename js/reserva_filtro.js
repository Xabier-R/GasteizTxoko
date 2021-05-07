$(document).ready(function() {
    rellenarDatosUrl();
    cargarTxokosFiltrados();
});

function rellenarDatosUrl() {
    var ubicacionForm = $("#ubicacion");
    var fechaForm = $("#fecha");
    var mesasForm = $("#numeromesas");
    var precioForm = $("#precioreserva");
    var turnoForm = $("#turno");

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
            turnoForm.addClass("is-invalid");
        } else {
            turnoForm.val(turnoBuscar)
        }
    }
}
	var ubicacionBuscar = "";
    var fechaBuscar = "";
    var mesaBuscar = "";
    var precioBuscar = "";
    var turnoBuscar = "";
	
function cargarTxokosFiltrados() {

    //Url parametros
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);


    //Datos pasados en la url
    ubicacionBuscar = urlParams.get('UbicacionBuscar');
    fechaBuscar = urlParams.get('fechaBuscar');
    mesaBuscar = urlParams.get('mesaBuscar');
    precioBuscar = urlParams.get('precioBuscar');
    turnoBuscar = urlParams.get('turnoBuscar');

    var datos = "accion=filtraTxokos&ubicacion=" + ubicacionBuscar + "&fecha=" + fechaBuscar + "&num_mesas=" + mesaBuscar + "&precio=" + precioBuscar + "&turno=" + turnoBuscar;
    $.ajax({
        url: 'php/dao/ReservaDao.php',
        type: 'POST',
        data: datos,
        success: procesarTxokosFiltrados
    });
}

function procesarTxokosFiltrados(data) {
    //alert(data)
    var resp = JSON.parse(data);
    if (resp.txokos.length == 0) {
        alert("No se encontro ningun txoko disponible con el filtro de busqueda introducido")
    } else {
        resp.txokos.forEach(function(txoko, index) {
            //El primer txoko de la lista es el mejor valorado
            if (index == 0)
                cartaTxoko(txoko.ID_Txoko, txoko.ID, true)
            else
                cartaTxoko(txoko.ID_Txoko, txoko.ID, false)
        });
    }
}



function cartaTxoko(idTxoko, iDMesa, esDestacado) {
    var datos = "accion=infoTxoko&idTxoko=" + idTxoko;
    $.ajax({
        url: 'php/dao/ReservaDao.php',
        type: 'POST',
        data: datos,
        success: function(data) {
            var resp = JSON.parse(data);

            //Datos del txoko
            var idTxoko = resp.txokos[0].ID;
            var nombreTxoko = resp.txokos[0].Nombre;
            var descripcionTxoko = resp.txokos[0].Descripcion;
            var precio_reservaTxoko = resp.txokos[0].Precio_reserva;
            var ubicacionTxoko = resp.txokos[0].Ubicacion;
            var valoracionTxoko = resp.txokos[0].Valoracion;

            if (esDestacado) {
                var carta = `<div class="card mb-3 destacado">
                                <img class="card-img-top img-responsive" src="assets/img/portfolio/ciudades/Barakaldo.jpg" alt="Card image cap">
                                <div class="card-body">
                                    <h5 class="card-title">${nombreTxoko}</h5>
                                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                    <p class="card-text"><small class="text-muted">Precio Reserva: ${precio_reservaTxoko}€</small></p>
                                    <a class="btn btn-primary col-md-12">Confirmar</a>
                                </div>
                            </div>`
                var listaTxokosFiltrados = $("#listaTxokoFiltrados");
                listaTxokosFiltrados.append(carta);
                //alert("Destacado");
            } else {
                var carta = `<div class="card mb-3">
                                <div class="row">
                                    <div class="col-md-6">
                                        <img src="assets/img/portfolio/ciudades/Bilbao.jpg" alt="..." class="img-fluid" />
                                    </div>
                                    <div class="col-md-6">
                                        <div class="card-body">
                                            <h5 class="card-title">${nombreTxoko}</h5>
                                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                            <p class="card-text"><small class="text-muted">Precio Reserva: ${precio_reservaTxoko}€</small></p>
 					<a class="btn btn-primary col-md-12" onclick="guardarReserva('${nombreTxoko}', '${valoracionTxoko}', '${iDMesa}','${precio_reservaTxoko}')">Confirmar</a>
                                                                                   
					                              
				
                                    </div>
                                </div>
                            </div>`
                var listaTxokosFiltrados = $("#listaTxokoFiltrados");
                listaTxokosFiltrados.append(carta);
               // alert(nombreTxoko);
                //alert("No Destacado");
            }
        }
    });
}

function guardarReserva(nombreTxoko, valoracionTxoko, idMesa, precioReserva) {
		
	
	
	let url  = "pago.html?ubicacion="+ubicacionBuscar+"&nombreTxoko="+nombreTxoko+"&valoracionTxoko="+valoracionTxoko+"&fechaBuscar="+fechaBuscar+"&idMesa="+idMesa+"&precioReserva="+precioReserva+"&turnoBuscar="+turnoBuscar;
	
	
	
	window.location.href = url;
	
	
	
	
}
