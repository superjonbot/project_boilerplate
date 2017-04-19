<?PHP
ini_set('display_errors', false);
// Script: Simple PHP Proxy: Get external HTML, JSON and more!
//
// *Version: 1.6, Last updated: 1/24/2009*
//
// Project Home - http://benalman.com/projects/php-simple-proxy/
// GitHub       - http://github.com/cowboy/php-simple-proxy/
// Source       - http://github.com/cowboy/php-simple-proxy/raw/master/ba-simple-proxy.php
//
// About: License
//
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
//
// About: Examples
// modified

//usage http://~/proxy.php?mode=JSON&full_status=1&full_headers=1&url=www.somerestservice.com

// Change these configuration options if needed, see above descriptions for info.
$enable_jsonp    = false;
$enable_native   = false;
$valid_url_regex = '/.*/';

// ############################################################################



$url = urldecode ( $_GET['url'] );

if (strtolower(substr($url, 0, 4)) !== 'http') {
  $url = "http://{$url}";
}

if ( !$url ) {

 // Passed url not specified.
 $contents = 'ERROR: url not specified';
 $status = array( 'http_code' => 'ERROR' );

} else if ( !preg_match( $valid_url_regex, $url ) ) {

 // Passed url doesn't match $valid_url_regex.
 $contents = 'ERROR: invalid url';
 $status = array( 'http_code' => 'ERROR' );

} else {
 $ch = curl_init( $url );

 if ( strtolower($_SERVER['REQUEST_METHOD']) == 'post' ) {
  curl_setopt( $ch, CURLOPT_POST, true );
  curl_setopt( $ch, CURLOPT_POSTFIELDS, $_POST );
 }

 if ( $_GET['send_cookies'] ) {
  $cookie = array();
  foreach ( $_COOKIE as $key => $value ) {
   $cookie[] = $key . '=' . $value;
  }
  if ( $_GET['send_session'] ) {
   $cookie[] = SID;
  }
  $cookie = implode( '; ', $cookie );

  curl_setopt( $ch, CURLOPT_COOKIE, $cookie );
 }

 curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, true );
 // curl_setopt( $ch, CURLOPT_HEADER, true );
 curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );

 curl_setopt( $ch, CURLOPT_USERAGENT, $_GET['user_agent'] ? $_GET['user_agent'] : $_SERVER['HTTP_USER_AGENT'] );

$contents = curl_exec( $ch );
$header = '';

 // list( $header, $contents ) = preg_split( '/([\r\n][\r\n])\\1/', , 2 );


 $status = curl_getinfo( $ch );

 curl_close( $ch );
}

// Split header text into an array.
$header_text = preg_split( '/[\r\n]+/', $header );

if ( $_GET['mode'] == 'native' ) {
 if ( !$enable_native ) {
  $contents = 'ERROR: invalid mode';
  $status = array( 'http_code' => 'ERROR' );
 }

 // Propagate headers to response.
 foreach ( $header_text as $header ) {
  if ( preg_match( '/^(?:Content-Type|Content-Language|Set-Cookie):/i', $header ) ) {
   header( $header );
  }
 }

 print $contents;

} else {

 // $data will be serialized into JSON data.
 $data = array();

 // Propagate all HTTP headers into the JSON data object.
 if ( $_GET['full_headers'] ) {
  $data['headers'] = array();

  foreach ( $header_text as $header ) {
   preg_match( '/^(.+?):\s+(.*)$/', $header, $matches );
   if ( $matches ) {
    $data['headers'][ $matches[1] ] = $matches[2];
   }
  }
 }

 // Propagate all cURL request / response info to the JSON data object.
 if ( $_GET['full_status'] ) {
  $data['status'] = $status;
 } else {
  $data['status'] = array();
  $data['status']['http_code'] = $status['http_code'];
 }

 // Set the JSON data object contents, decoding it from JSON if possible.
 $decoded_json = json_decode( $contents );
 $data['contents'] = $decoded_json ? $decoded_json : $contents;

 // Generate appropriate content-type header.
 $is_xhr = strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
 header( 'Content-type: application/' . ( $is_xhr ? 'json' : 'x-javascript' ) );

 // Get JSONP callback.
 $jsonp_callback = $enable_jsonp && isset($_GET['callback']) ? $_GET['callback'] : null;

 // Generate JSON/JSONP string
 $json = json_encode( $data );

 print $jsonp_callback ? "$jsonp_callback($json)" : $json;

}

?>