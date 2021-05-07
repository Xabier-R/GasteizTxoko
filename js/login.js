 function logearse(){
	 
	let email=document.getElementById("email").value;
	let pass=document.getElementById("password").value;
	 
	$.ajax({
		url: "php/funciones.php",
		type: 'POST',
		data: { 
			"funcion": "obtenerUsuario",
			"email": email,
			"pass": pass
		},
		success: function (data_key) {

			if(data_key.includes("ERROR")){
				document.getElementById("mensajeError").removeAttribute("hidden"); 
				document.getElementById("mensajeError").innerHTML=data_key;
			}
			console.log(data_key);

		},	
		error: function (XMLhttpRequest, textStatus, errorThrown) {
		  //text_output.value=("ADD" + location + " -- some error: " + textStatus + " ; " + errorThrown);
		   alert("ERROR "+textStatus+" "+XMLhttpRequest +" "+errorThrown);
		}
		
	});
	 
	

 }
 

