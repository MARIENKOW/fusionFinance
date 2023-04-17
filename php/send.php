<?php
$name = $_POST['name'];
$surname = $_POST['surname'];
$mail = $_POST['mail'];
$phone = $_POST['phone'];
$question = $_POST['question'];

const TOKEN = '5961574191:AAEh7ELA8ja-2Vi6EOEGeC8MU69Vl_c8yvg';
const CHATID = '-1001611584440';
$post = "Имя: $name;\n
Фамилия: $surname;\n
Mail: $mail\n
Телефон: $phone\n
Вопрос: $question
";
$txt = strip_tags(urlencode($post));
$textSendStatus = @file_get_contents('https://api.telegram.org/bot'. TOKEN .'/sendMessage?chat_id=' . CHATID . '&parse_mode=html&text=' . $txt);
if($textSendStatus){
   echo "true";
}else{
   echo "false";
}
?>