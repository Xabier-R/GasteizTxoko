<?php

include "BBDD.php";

if(isset($_POST['funcion'])){
    
    $funcion=$_POST['funcion'];

    if($funcion=="obtenerUsuario"){
        obtenerUsuario();
		   
    }
	else if($funcion=="registrarse"){
		registrarse();
		
	}
	else{
		 echo "No existe esa funcion";
		
	}

}


function obtenerUsuario(){
    
    if(($_POST['email']!="")&&($_POST['pass']!="")){

        $email=$_POST['email'];
        $pass=$_POST['pass'];

		$connn = conexion();  
		
		
		$user = getUsuario($connn, $email);
		
		if($user!= -1){
			if (password_verify($pass, $user->Password)) {
				
				echo $user->Nombre."-".$user->Email."-".$user->Password;
			}
			else{
				echo "ERROR Has introducido la contraseña mal";
			}
			
		}
		else{
			echo "ERROR No existe ninguna cuenta con ese usuario";
		}

    }
	else{
		echo "ERROR Te falta un campo por rellenar";
	}

}

  function registrarse(){
    
    if(($_POST['nombre']!="")&&($_POST['email']!="")&&($_POST['pass']!="")){

        $nombre=$_POST['nombre'];
		$email=$_POST['email'];
        $pass=$_POST['pass'];

        $connn = conexion();  
		
		$pass = password_hash($pass, PASSWORD_BCRYPT);
		
		$result = registro($connn, $nombre, $email, $pass);
		
		
        echo $result;

    }
	else{
		echo "Te falta un campo por rellenar";
	}


}
    
    
	
	
	
	
  
   
?>