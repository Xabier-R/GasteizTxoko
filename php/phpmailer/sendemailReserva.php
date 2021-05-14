<?php
use PHPMailer\PHPMailer\PHPMailer;

require_once 'Exception.php';
require_once 'PHPMailer.php';
require_once 'SMTP.php';

$mail = new PHPMailer(true);

$alert = '';

if(isset($_POST['pdf'])){
  //$name = $_POST['name'];
  //$email = $_POST['email'];
  //$message = $_POST['message'];

    $pdfStr = str_replace('data:application/pdf;filename=generated.pdf;base64,','',$_POST['pdf']);
    $pdfStr = str_replace(' ','+',$pdfStr);
    //$pdfStr = str_replace('+','',$pdfStr);
    $pdf_decoded = base64_decode ($pdfStr);
    //Write data back to pdf file
    $pdf = fopen ('factura.pdf','w');
    fwrite ($pdf,$pdf_decoded);
    //close output file
    fclose ($pdf);


	$email = $_POST['email'];


  try{
    $mail->CharSet = 'UTF-8';
    $mail->isSMTP();
    $mail->Host = 'smtp.hostinger.es';
    $mail->SMTPAuth = true;
    $mail->Username = 'info@gasteiztxoko.es'; // Gmail address which you want to use as SMTP server
    $mail->Password = 'P@ssword123456'; // Gmail address Password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = '587';

    $mail->setFrom('info@gasteiztxoko.es'); // Gmail address which you used as SMTP server
    $mail->addAddress($email); // Email address where you want to receive emails (you can use any of your gmail address including the gmail address which you used as SMTP server)

    $mail->isHTML(true);
    $mail->Subject = 'Pedido';

    //Obtengo los datos del fichero html
    $shtml = file_get_contents('confirmacionCompra.html');

    //Reemplazar los datos del fichero html para personalizarlo

	$cuerpo = $shtml;

    $mail->Body = $cuerpo;

    $file_to_attach = 'factura.pdf';

    $mail->AddAttachment( $file_to_attach , 'factura.pdf' );

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