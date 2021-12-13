<?php

/**
 * Copyright bp-sol.de 2021
 * 
 * API for Robust-API- and BSC-API-Requests in relation to Robust Dashboard
 * 
 */

namespace BPS\RobustDashboard\API;

use BPS\RobustDashboard\Constants;

class RequestAPI extends BaseAPI
{

    public static function getTotalBurned()
    {
        $oCurl = curl_init();

        curl_setopt($oCurl, CURLOPT_URL, Constants::API_ROBUST_BURNED);
        curl_setopt($oCurl, CURLOPT_RETURNTRANSFER, 1);

        ob_implicit_flush(true);
        ob_end_flush();

        $sResult = curl_exec($oCurl);

        curl_close($oCurl);

        return $sResult + "4950.00";
    }
}
