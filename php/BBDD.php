<?php

    
    function conexion(){
	
		$servername = "localhost";
		$username = "u710925034_admin";      
		$password = "P@ssword123456";
		$database = "u710925034_bdtxoko";
		// Create connection
		$conn = mysqli_connect($servername, $username, $password, $database);
		
		// Check connection
		
		return $conn;
       

    }   
    
    
    
    function getUsuario($connn, $email){
        
		if (!$connn) {
			die("Connection failed: " . mysqli_connect_error());
		}
		
		$usuario=null;
        $sql ="select ID, Nombre, Email, Password from usuarios where Email = '$email'";
        $rs = mysqli_query($connn, $sql);

        if(mysqli_num_rows($rs)>0){

            $usuario=mysqli_fetch_object($rs);
			return $usuario;
        }
        else{
            return -1;
        }

    }
    

	
    
    function registro($connn, $nombre, $email, $pass){
        
		if (!$connn) {
			die("Connection failed: " . mysqli_connect_error());
		}
		
		if(getUsuario($connn, $email)!= -1){
			return -2;
		}
		
		else{
			
			$sql="Insert into usuarios (Nombre, Email, Password) values ('$nombre', '$email', '$pass')";
			 
			mysqli_query($connn, $sql);
			
			if(mysqli_affected_rows($connn)==1){
		   
				return mysqli_insert_id($connn);
			}
			else{
				return -1;
			}
		
		}
		
		
    }
   
?>
