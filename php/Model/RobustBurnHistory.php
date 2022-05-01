<?php

/**
 * Copyright bp-sol.de 2021
 * 
 * Model for RobustBurnHistory
 * 
 */

namespace BPS\RobustDashboard\Model;

use BPS\RobustDashboard\Constants;

class RobustBurnHistory implements Constants
{

    protected $aEntries;

    public function __construct()
    {
        $this->aEntries = array();
    }

    public function getSize()
    {
        return sizeof($this->aEntries);
    }

    public function getEntries()
    {
        return $this->aEntries;
    }

    public function getEntry($sID)
    {
        $iLen = $this->getSize();
        for ($i = 0; $i < $iLen; $i++) {
            if ($this->aEntries[$i]->getID() === $sID) {
                return $this->aEntries[$i];
            }
        }
    }

    public function getLastEntry()
    {
        if($this->getSize() === 0){
            return FALSE;
        }
        return $this->aEntries[0];
    }

    public function addEntry($oEntry){
        array_push($this->aEntries, $oEntry);
    }

    public function addNewEntry($oEntry){
        array_unshift($this->aEntries, $oEntry);
    }

    public function getHTML(RobustBurnHistoryEntry $oCurrentSituation){

        //table and header row
        $sOutput = '<table id="bpsRbtMainTable" class="table"><thead><tr class="table-dark">';
        $sOutput = $sOutput . '<th scope="col" class="align-middle">Date</th>';
        $sOutput = $sOutput . '<th scope="col" class="align-middle">RBT Burned Total</th>';
        $sOutput = $sOutput . '<th scope="col" class="align-middle">RBT Burned at Day</th>';
        $sOutput = $sOutput . '<th scope="col" class="align-middle">RBT Current Supply</th>';
        $sOutput = $sOutput . '<th scope="col" class="align-middle">RBT Available Supply</th>';
        $sOutput = $sOutput . '</tr></thead><tbody>';
        
        //data today     
        $oDate = date_create($oCurrentSituation->getDate());
        $sOutput = $sOutput . '<tr id="bpsPrimaryRow" class="table-primary"><th scope="row">' . date_format($oDate,"Y/m/d") . '</th>';
        $sOutput = $sOutput . '<td class="align-middle">' . number_format($oCurrentSituation->getTotalBurned(),2,".",",") . '</td>';
        $sOutput = $sOutput . '<td class="align-middle">' . number_format($oCurrentSituation->getDifferenceBurned(),2,".",",") . '</td>';
        $sCurrentSupply = Constants::RBT_INIT_TOTAL_SUPPLY - $oCurrentSituation->getTotalBurned();
        $sOutput = $sOutput . '<td class="align-middle">'. number_format($sCurrentSupply,2,".",",");
        $sAvailableSupply = $sCurrentSupply - Constants::RBT_LOCKED_SUPPLY;
        $sOutput = $sOutput . '<td class="align-middle">' . number_format($sAvailableSupply,2,".",",") . '</td></tr>';

        //historic data
        $iLen = $this->getSize();
        for ($i = 0; $i < $iLen; $i++) {
            $oEntry = $this->aEntries[$i];
            $oDate = date_create($oEntry->getDate());
            $sOutput = $sOutput . '<tr><th scope="row">' . date_format($oDate,"Y/m/d") . '</th>';
            $sOutput = $sOutput . '<td class="align-middle">' . number_format($oEntry->getTotalBurned(),2,".",",") . '</td>';
            $sOutput = $sOutput . '<td class="align-middle">' . number_format($oEntry->getDifferenceBurned(),2,".",",") . '</td>';
            $sCurrentSupply = Constants::RBT_INIT_TOTAL_SUPPLY - $oEntry->getTotalBurned();
            $sOutput = $sOutput . '<td class="align-middle">' . number_format($sCurrentSupply,2,".",",") . '</td>';
            $sAvailableSupply = $sCurrentSupply - Constants::RBT_LOCKED_SUPPLY;
            $sOutput = $sOutput . '<td class="align-middle">' . number_format($sAvailableSupply,2,".",",") . '</td></tr>';
        }

        $sOutput = $sOutput . '</tbody></table>';

        return $sOutput;
    }
}
