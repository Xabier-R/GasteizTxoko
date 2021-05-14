 function logearse(){
	 
	let email=document.getElementById("email").value;
	let pass=document.getElementById("password").value;
	 
	$.ajax({
		url: "php/dao/LoginRegistroDao.php",
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
			//console.log(data_key);
			var data = JSON.parse(data_key);

			sessionStorage.setItem('ID', data[0].ID);
			sessionStorage.setItem('Nombre', data[0].Nombre);
			sessionStorage.setItem('Email', data[0].Email);
			
			window.location.href = 'index.html';
			
		},	
		error: function (XMLhttpRequest, textStatus, errorThrown) {
		  //text_output.value=("ADD" + location + " -- some error: " + textStatus + " ; " + errorThrown);
		   alert("ERROR "+textStatus+" "+XMLhttpRequest +" "+errorThrown);
		}
		
	});
	 
	

 }
 

