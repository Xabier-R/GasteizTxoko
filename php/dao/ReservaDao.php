<?php

    //Incluir la clase de base de datos
    include_once("../coneccion/class.Database.php");
    Class ReservaDao{
        public static function txokosPopulares(){
            $sql = "SELECT * FROM txokos ORDER BY Valoracion DESC LIMIT 6";
            $txokos = Database::get_arreglo( $sql );
            $respuesta = array(
                'error' => false,
                'txokos' => $txokos
            );
            echo json_encode( $respuesta );
        }
        

        public static function datosCiudades(){
            $sql = "SELECT DISTINCT(Ubicacion), (select count(*) from txokos t where t.Ubicacion = txokos.Ubicacion) num_txokos FROM txokos";
            $txokos = Database::get_arreglo( $sql );
            $respuesta = array(
                'error' => false,
                'txokos' => $txokos
            );
            echo json_encode( $respuesta );
        }
        
        public static function filtraTxokos(){
            if ( isset($_POST['ubicacion']) && isset($_POST['fecha'])  && isset($_POST['num_mesas'])   && isset($_POST['precio'])   && isset($_POST['turno'])) {
                //Datos filtro
                $ubicacion = $_POST['ubicacion'];
                $fecha = $_POST['fecha'];
                $numeroasientos = $_POST['num_mesas'];
                $precio = $_POST['precio'];
                $trozosPrecio = explode('-', $precio);
                $precioMin = $trozosPrecio[0];
                $precioMax = $trozosPrecio[1];
                $turno = $_POST['turno'];

                //No estaba del todo bien ya no coge la mesa mas adecuada al numero de asientos solicitado por el usuario
                $sql = "SELECT mesas.ID_Txoko, mesas.ID
                        FROM mesas
                        INNER JOIN txokos
                        ON txokos.ID = mesas.ID_txoko
                        WHERE mesas.Sillas >= $numeroasientos
                        AND txokos.Precio_reserva>=$precioMin
                        AND txokos.Precio_reserva<=$precioMax
                        AND txokos.Ubicacion = '$ubicacion'
                        AND NOT EXISTS
                            (SELECT *
                            FROM reservas
                            WHERE reservas.ID_Mesa = mesas.ID
                            AND reservas.Fecha_reserva = '$fecha'
                            AND reservas.Turno = '$turno')
                        GROUP BY(mesas.ID_Txoko)
                        ORDER BY txokos.Valoracion DESC";

                $txokos = Database::get_arreglo( $sql );
                $respuesta = array(
                            'error' => false,
                            'txokos' => $txokos 
                );
                echo json_encode( $respuesta );
            }
        }

        public static function infoTxoko(){
            if (isset($_POST['idTxoko'])){
                $idTxoko = $_POST['idTxoko'];
                $sql = "SELECT * from txokos WHERE txokos.ID = '$idTxoko'";
                $txokos = Database::get_arreglo( $sql );
                $respuesta = array(
                    'error' => false,
                    'txokos' => $txokos
                );
                echo json_encode( $respuesta );
            }
        }

    }

    if (isset($_POST['accion'])){
        $accion = $_POST['accion'];
        switch ($accion){
            case "txokospopulares":
                ReservaDao::txokosPopulares();
                break;
            case "datosCiudades":
                ReservaDao::datosCiudades();
                break;
            case "filtraTxokos":
                ReservaDao::filtraTxokos();
                break;
            case "infoTxoko":
                ReservaDao::infoTxoko();
                break;
        }
    }

?>