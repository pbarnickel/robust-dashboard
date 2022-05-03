<?php

namespace BPS\RobustDashboard\API;

use BPS\RobustDashboard\Constants;
use BPS\RobustDashboard\Model\EntryRBT;
use BPS\RobustDashboard\Model\EntryRBS;

class RobustAPI extends API implements Constants
{
    public static function requestDataRBT()
    {
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
        $entry = new EntryRBT(NULL, date('d.m.Y'), NULL, NULL, NULL, NULL);
        return $entry;
    }

    public static function requestDataRBS()
    {
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
        $entry = new EntryRBS(NULL, date('d.m.Y'), NULL, NULL, NULL, NULL);
        return $entry;
    }
}
