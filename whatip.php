<?php
header('Content-type: application/json');

$return['ip'] = $_SERVER['REMOTE_ADDR'];
$return['sip'] = $_SERVER['SERVER_ADDR'];
//$return['ipa'] = $_SERVER['HTTP_CLIENT_IP'];
//$return['ipb'] = $_SERVER['HTTP_X_FORWARDED_FOR'];
$localIP = getHostByName(getHostName());

$results = array(
      'ip' => $return['ip'],'sip' => $return['sip'],'lip' => $localIP/*, 'ipa' => $return['ipa'],'ipb' => $return['ipb']*/
);
echo json_encode($results);
?>