<?php

// Enter the path that the oauth library is in relation to the php file
require_once('lib/OAuth.php');
// Set your OAuth credentials here  
// These credentials can be obtained from the 'Manage API Access' page in the
// developers documentation (http://www.yelp.com/developers)
$CONSUMER_KEY = "mK6sVIVw-32BCT6xaihHlg";
$CONSUMER_SECRET = "4o-gw6LxZWqtIPuezbqwRDghKJI";
$TOKEN = "6rBcCA_X4FTmgVW5V_0NP2R_jlgxInzB";
$TOKEN_SECRET = "idwXLc7a-NjsOonYYL9QSQMylp4";


$API_HOST = 'api.yelp.com';
$DEFAULT_TERM = 'dinner';
$DEFAULT_LOCATION = 'Detroit, MI';
$SEARCH_LIMIT = 10;
$SEARCH_PATH = '/v2/search/';
$BUSINESS_PATH = '/v2/business/';
$RADIUS_LIMIT = 16093;

/** 
 * Makes a request to the Yelp API and returns the response
 * 
 * @param    $host    The domain host of the API 
 * @param    $path    The path of the APi after the domain
 * @return   The JSON response from the request      
 */
function request($host, $path) {
    $unsigned_url = "http://" . $host . $path;

    // // Token object built using the OAuth library
    $token = new OAuthToken($GLOBALS['TOKEN'], $GLOBALS['TOKEN_SECRET']);

    // // Consumer object built using the OAuth library
    $consumer = new OAuthConsumer($GLOBALS['CONSUMER_KEY'], $GLOBALS['CONSUMER_SECRET']);

    // // Yelp uses HMAC SHA1 encoding
    $signature_method = new OAuthSignatureMethod_HMAC_SHA1();

    $oauthrequest = OAuthRequest::from_consumer_and_token(
        $consumer, 
        $token, 
        'GET', 
        $unsigned_url
    );
    
    // // Sign the request
    $oauthrequest->sign_request($signature_method, $consumer, $token);
    
    // // Get the signed URL
    $signed_url = $oauthrequest->to_url();

    // // // Send Yelp API Call
    $ch = curl_init($signed_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $data = curl_exec($ch);
    curl_close($ch);
    
    return $data;
}

/**
 * Query the Search API by a search term and location 
 * 
 * @param    $term        The search term passed to the API 
 * @param    $location    The search location passed to the API 
 * @return   The JSON response from the request 
 */
function search($term, $location) {
    $url_params = array();
    $url_params['term'] = $term ?: $GLOBALS['DEFAULT_TERM'];
    $url_params['location'] = $location ?: $GLOBALS['DEFAULT_LOCATION'];
    $url_params['radius_limit'] = $GLOBALS['RADIUS_LIMIT'];
    $url_params['limit'] = $GLOBALS['SEARCH_LIMIT'];
    $search_path = $GLOBALS['SEARCH_PATH'] . "?" . http_build_query($url_params);
    
    return request($GLOBALS['API_HOST'], $search_path);
}

/**
 * Query the Business API by business_id
 * 
 * @param    $business_id    The ID of the business to query
 * @return   The JSON response from the request 
 */
function get_business($business_id) {
    $business_path = $GLOBALS['BUSINESS_PATH'] . $business_id;
    
    return request($GLOBALS['API_HOST'], $business_path);
}

/**
 * Queries the API by the input values from the user 
 * 
 * @param    $term        The search term to query
 * @param    $location    The location of the business to query
 */
function query_api($term,$location) {     
    
    //$response = json_decode(search($term,$location));
    //$business_id = $response->businesses[0]->id;
    
    // print sprintf(
    //      "%d businesses found, querying business info for the top result \"%s\"\n\n",         
    //      count($response->businesses),
    //      $business_id
    //  );
    
   //$response = get_business($business_id);
    
    return search($term,$location);
   // print sprintf("Result for business \"%s\" found:\n", $business_id);
   // print "$response\n";
}
header('Content-Type: application/json');
 if(isset($_GET['category']) && isset($_GET['location'])){
    echo query_api($_GET["category"],$_GET['location']);
}else{
    echo "Missing Inputs";
}
//
?>