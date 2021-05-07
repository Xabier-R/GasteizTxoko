<?php
use PHPMailer\PHPMailer\PHPMailer;

require_once 'Exception.php';
require_once 'PHPMailer.php';
require_once 'SMTP.php';

$mail = new PHPMailer(true);

$alert = '';

if(isset($_POST['enviarAvisos'])){
  //$name = $_POST['name'];
  //$email = $_POST['email'];
  //$message = $_POST['message'];

  try{
    $mail->CharSet = 'UTF-8';
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'gasteiztxoko@gmail.com'; // Gmail address which you want to use as SMTP server
    $mail->Password = 'P@ssw0rd1234'; // Gmail address Password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = '587';

    $mail->setFrom('gasteiztxoko@gmail.com'); // Gmail address which you used as SMTP server
    $mail->addAddress('gianpierocontrerasramos@gmail.com'); // Email address where you want to receive emails (you can use any of your gmail address including the gmail address which you used as SMTP server)

    $mail->isHTML(true);
    $mail->Subject = '[Completa tu registro]';

    //Obtengo los datos del fichero html
    $shtml = file_get_contents('confirmacionregistro.html');

    //Reemplazar los datos del fichero html para personalizarlo
    $cuerpo = str_replace('confirmarcuentausuario','www.google.es',$shtml);
    $mail->Body = $cuerpo;

    $mail->send();
    $alert = '<div class="alert-success">
                 <span>Message Sent! Thank you for contacting us.</span>
                </div>';
  } catch (Exception $e){
    $alert = '<div class="alert-error">
                <span>'.$e->getMessage().'</span>
              </div>';
  }
}
?>