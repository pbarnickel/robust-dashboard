<?php

/**
 * Copyright bp-sol.de 2021
 * 
 * Main-Controller for Robust Dashboard
 * 
 */

namespace BPS\RobustDashboard;

use BPS\RobustDashboard\Constants;
use BPS\RobustDashboard\API\RequestAPI;
use BPS\RobustDashboard\API\DatabaseAPI;
use BPS\RobustDashboard\Model\RobustBurnHistory;
use BPS\RobustDashboard\Model\RobustBurnHistoryEntry;

class Main implements Constants
{

    protected $oDatabaseAPI;
    protected $oRobustBurnHistory;
    protected $oCurrentSituation;

    public function __construct()
    {
        $this->oDatabaseAPI = new DatabaseAPI();
        $this->oRobustBurnHistory = new RobustBurnHistory();
    }

    public function initDashboard()
    {

        $this->initRobustBurnHistory();
        $this->initCurrentSituation();
        $this->printRobustBurnHistory();
        $this->initRobustBurnHistoryChart();
    }

    public function runDailyScript()
    {
        $this->initRobustBurnHistory();
        $this->updateRobustBurnHistory();
    }

    public function initRobustBurnHistory()
    {

        $oRobustBurnHistory = $this->oDatabaseAPI->readRobustBurnHistory();

        if ($oRobustBurnHistory->num_rows > 0) {
            while ($oRow = $oRobustBurnHistory->fetch_assoc()) {
                $oEntry = new RobustBurnHistoryEntry(
                    $oRow[Constants::DB_TABLE_ROBUST_BURNED_HISTORY_ID],
                    $oRow[Constants::DB_TABLE_ROBUST_BURNED_HISTORY_DATE],
                    $oRow[Constants::DB_TABLE_ROBUST_BURNED_HISTORY_TB],
                    $oRow[Constants::DB_TABLE_ROBUST_BURNED_HISTORY_DB],
                    $oRow[Constants::DB_TABLE_ROBUST_BURNED_HISTORY_MC],
                    $oRow[Constants::DB_TABLE_ROBUST_BURNED_HISTORY_HOLDERS]
                );
                $this->oRobustBurnHistory->addEntry($oEntry);
            }
        }
    }

    public function initCurrentSituation()
    {
        $oLastEntry = $this->oRobustBurnHistory->getLastEntry();
        $sCurrentBurned = RequestAPI::getTotalBurned();
        $dCurrentBurned = bcadd($sCurrentBurned, '0', 2);
        if ($oLastEntry) {
            $dLastBurned = bcadd($oLastEntry->getTotalBurned(), '0', 2);
            $dDifferenceBurned = $sCurrentBurned - $dLastBurned;
        } else {
            $dDifferenceBurned = $dCurrentBurned;
        }
        $dDifferenceBurned = bcadd($dDifferenceBurned, '0', 2);
        $sMarketCap = RequestAPI::getMarketCap();
        $dMarketCap = bcadd($sMarketCap, '0', 2);
        $sHolders = RequestAPI::getHolders();

        $this->oCurrentSituation = new RobustBurnHistoryEntry(NULL, date('d.m.Y'), $dCurrentBurned, $dDifferenceBurned, $dMarketCap, $sHolders);
    }

    public function printRobustBurnHistory()
    {
        $sOutput = $this->oRobustBurnHistory->getHTML($this->oCurrentSituation);
        echo $sOutput;
    }

    public function updateRobustBurnHistory()
    {
        $oLastEntry = $this->oRobustBurnHistory->getLastEntry();
        $newEntry = $this->oDatabaseAPI->updateRobustBurnHistory($oLastEntry);
        if ($newEntry) {
            $this->oRobustBurnHistory->addNewEntry($newEntry);
        }
    }

    public function runMigrationScript()
    {

        $sJsonFileContents = file_get_contents(Constants::JSON_ROBUST_BURNED_HISTORY_URL);
        $aHistory = json_decode($sJsonFileContents, true);

        $iLen = sizeof($aHistory);
        $dTotalBurned = "4950.00";
        for ($i = 0; $i < $iLen; $i++) {
            $dTotalBurned =  bcadd($dTotalBurned, '0', 2) + bcadd($aHistory[$i]["Amount"], '0', 2);
            $oEntry = new RobustBurnHistoryEntry(NULL, $aHistory[$i]["Day"], $dTotalBurned, $aHistory[$i]["Amount"], NULL, NULL);
            $this->oRobustBurnHistory->addEntry($oEntry);
        }

        $this->oDatabaseAPI->migrateRobustBurnHistory($this->oRobustBurnHistory);
    }

    public function initRobustBurnHistoryChart()
    {
        $aHistory = $this->oRobustBurnHistory->getEntries();
        array_unshift($aHistory, $this->oCurrentSituation);
        $oJSON = json_encode($aHistory);
        if (file_put_contents("js/data.json", $oJSON)) {
            //Success
        } else {
            //Error
        }
    }
}
