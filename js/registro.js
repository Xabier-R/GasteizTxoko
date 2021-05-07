 function registrarse(){
	 
	 
	let nombre=document.getElementById("name").value;
	let email=document.getElementById("email").value;
	let pass=document.getElementById("password").value;
	let passwordCheck=document.getElementById("passwordCheck").value;

	if((nombre=="") || (email=="") || (pass=="") || (passwordCheck=="")){
		
		document.getElementById("mensajeError").removeAttribute("hidden"); 
		document.getElementById("mensajeError").innerHTML="Te falta algo por rellenar";
		
	}
	else{
		
		if(pass!=passwordCheck){
			
			document.getElementById("mensajeError").removeAttribute("hidden"); 
			document.getElementById("mensajeError").innerHTML="Las contraseñas no coinciden";
		}
		else
		{
			 
			$.ajax({
				url: "php/funciones.php",
				type: 'POST',
				data: { 
					"funcion": "registrarse",
					"nombre": nombre,
					"email": email,
					"pass": pass
				},
				success: function (data_key) {

					if(data_key == -2){
						document.getElementById("mensajeError").removeAttribute("hidden"); 
						document.getElementById("mensajeError").innerHTML="Ya existe una cuenta con ese correo";
					}
					else if(data_key == -1){
						document.getElementById("mensajeError").removeAttribute("hidden"); 
						document.getElementById("mensajeError").innerHTML="Ha ocurrido un error. Intentelo de nuevo mas tarde";
					}
					else{
						document.getElementById("mensajeBien").removeAttribute("hidden"); 
					}
				
				},	
				error: function (XMLhttpRequest, textStatus, errorThrown) {
				  //text_output.value=("ADD" + location + " -- some error: " + textStatus + " ; " + errorThrown);
				   alert("ERROR "+textStatus+" "+XMLhttpRequest +" "+errorThrown);
				}
				
			});
			 
		}
	}
 }
 

