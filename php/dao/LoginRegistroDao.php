<?php

    //Incluir la clase de base de datos
    include_once("../coneccion/class.Database.php");
    Class LoginRegistroDao{
		
       /* public static function txokosPopulares(){
            $sql = "SELECT * FROM txokos ORDER BY Valoracion DESC LIMIT 6";
            $txokos = Database::get_arreglo( $sql );
            $respuesta = array(
                'error' => false,
                'txokos' => $txokos
            );
            echo json_encode( $respuesta );
        }*/
        

       public static function obtenerUsuario(){
    
			if(($_POST['email']!="")&&($_POST['pass']!="")){

				$email=$_POST['email'];
				$pass=$_POST['pass'];
				$sql ="select ID, Nombre, Email, Password from usuarios where Email = '$email'";
				
				$user = Database::get_arreglo( $sql );
				
				
				
				if(sizeof($user)==1){
					if (password_verify($pass, $user[0]['Password'])) {
						
						echo json_encode($user);
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



		public static function registrarse(){
    
			if(($_POST['nombre']!="")&&($_POST['email']!="")&&($_POST['pass']!="")){

				$nombre=$_POST['nombre'];
				$email=$_POST['email'];
				$pass=$_POST['pass'];

				$sql ="select ID, Nombre, Email, Password from usuarios where Email = '$email'";
				
				$user = Database::get_arreglo( $sql );
				
				
				if(sizeof($user)!=0){
					return -2;
				}
				else{					
					$pass = password_hash($pass, PASSWORD_BCRYPT);
					
					$sql="Insert into usuarios (Nombre, Email, Password) values ('$nombre', '$email', '$pass')";
					
					$result = Database::ejecutar_idu( $sql );
					
					//$result = registro($connn, $nombre, $email, $pass);
					
					echo $result;
				}

			}
			else{
				echo "Te falta un campo por rellenar";
			}

		}

    }

	if(isset($_POST['funcion'])){
    
		$funcion=$_POST['funcion'];

		if($funcion=="obtenerUsuario"){
			LoginRegistroDao::obtenerUsuario();
		}
		else if($funcion=="registrarse"){
			LoginRegistroDao::registrarse();
		}
		else{
			echo "No existe esa funcion";
		}

	}

?>