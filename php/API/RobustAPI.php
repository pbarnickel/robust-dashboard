<?php

namespace BPS\RobustDashboard\API;

use BPS\RobustDashboard\Constants;
use BPS\RobustDashboard\Model\EntryRBT;
use BPS\RobustDashboard\Model\EntryRBS;

class RobustAPI extends API implements Constants
{
    public static function removeSubtr($result, $find)
    {
        $pos = strpos($result, $find);
        return substr($result, $pos + strlen($find));
    }

    public static function extractData($result, $findEnd, $isFloat)
    {
        $pos = strpos($result, $findEnd, 0);
        $data = substr($result, 0, $pos);
        if($isFloat){
            $data = trim(str_replace(',', '', $data));
        }
        return $data;
    }

    public static function requestDataRBT()
    {
        set_time_limit(1);

        $curl = curl_init();

        curl_setopt($curl, CURLOPT_URL, Constants::API_ROBUST_RBT);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

        ob_implicit_flush(true);
        if (ob_get_contents()) {
            ob_end_clean();
            ob_end_flush();
        }

        $result = curl_exec($curl);

        curl_close($curl);

        return RobustAPI::mapResultToEntryRBT($result);
    }

    private static function mapResultToEntryRBT($result)
    {
        //Total Burned
        $result = RobustAPI::removeSubtr($result, Constants::API_RBT_TOTAL_BURNED);
        $totalBurned = RobustAPI::extractData($result, Constants::API_END_RBT, true);

        //Market Cap
        $result = RobustAPI::removeSubtr($result, Constants::API_RBT_MARKET_CAP);
        $marketCap = RobustAPI::extractData($result, Constants::API_END_USD, true);

        //Holders
        $result = RobustAPI::removeSubtr($result, Constants::API_RBT_HOLDERS);
        $holders = RobustAPI::extractData($result, Constants::API_END_LINE, true);

        return new EntryRBT(NULL, date('d.m.Y'), $totalBurned, NULL, $marketCap, $holders);
    }

    public static function requestDataRBS()
    {
        set_time_limit(1);

        $curl = curl_init();

        curl_setopt($curl, CURLOPT_URL, Constants::API_ROBUST_RBS);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

        ob_implicit_flush(true);
        if (ob_get_contents()) {
            ob_end_clean();
            ob_end_flush();
        }

        $result = curl_exec($curl);

        curl_close($curl);

        return RobustAPI::mapResultToEntryRBS($result);
    }

    private static function mapResultToEntryRBS($result)
    {
        //Total Supply
        $result = RobustAPI::removeSubtr($result, Constants::API_RBS_TOTAL_SUPPLY);
        $totalSupply = RobustAPI::extractData($result, Constants::API_END_RBS, true);

        //Market Cap
        $result = RobustAPI::removeSubtr($result, Constants::API_RBS_MARKET_CAP);
        $marketCap = RobustAPI::extractData($result, Constants::API_END_USD, true);

        //Holders
        $result = RobustAPI::removeSubtr($result, Constants::API_RBS_HOLDERS);
        $holders = RobustAPI::extractData($result, Constants::API_END_CIRCULATION_SUPPLY, true);

        return new EntryRBS(NULL, date('d.m.Y'), $totalSupply, NULL, $marketCap, $holders);
    }
}
