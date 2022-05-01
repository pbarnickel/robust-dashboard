<?php

/**
 * Copyright bp-sol.de 2021
 * 
 * Model for RbsHistory
 * 
 */

namespace BPS\RobustDashboard\Model;

use BPS\RobustDashboard\Constants;

class RbsHistory implements Constants
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

    public function getHTML(RbsHistoryEntry $oCurrentSituation){

        //table and header row
        $sOutput = '<table id="bpsRbsMainTable" class="table"><thead><tr class="table-dark">';
        $sOutput = $sOutput . '<th scope="col" class="align-middle">Date</th>';
        $sOutput = $sOutput . '<th scope="col" class="align-middle">RBS Total Supply</th>';
        $sOutput = $sOutput . '<th scope="col" class="align-middle">RBS Difference Supply</th>';
        $sOutput = $sOutput . '<th scope="col" class="align-middle">Market Cap</th>';
        $sOutput = $sOutput . '<th scope="col" class="align-middle">Holders</th>';
        $sOutput = $sOutput . '</tr></thead><tbody>';
        
        //data today     
        $oDate = date_create($oCurrentSituation->getDate());
        $sOutput = $sOutput . '<tr id="bpsRbsPrimaryRow" class="table-primary"><th scope="row">' . date_format($oDate,"Y/m/d") . '</th>';
        $sOutput = $sOutput . '<td class="align-middle">' . number_format($oCurrentSituation->getTotalSupply(),2,".",",") . '</td>';
        $sOutput = $sOutput . '<td class="align-middle">' . number_format($oCurrentSituation->getDifferenceSupply(),2,".",",") . '</td>';
        $sOutput = $sOutput . '<td class="align-middle">' . number_format($oCurrentSituation->getMarketCap(),2,".",",") . '</td>';
        $sOutput = $sOutput . '<td class="align-middle">' . $oCurrentSituation->getHolders() . '</td></tr>';

        //historic data
        $iLen = $this->getSize();
        for ($i = 0; $i < $iLen; $i++) {
            $oEntry = $this->aEntries[$i];
            $oDate = date_create($oEntry->getDate());
            $sOutput = $sOutput . '<tr><th scope="row">' . date_format($oDate,"Y/m/d") . '</th>';
            $sOutput = $sOutput . '<td class="align-middle">' . number_format($oEntry->getTotalSupply(),2,".",",") . '</td>';
            $sOutput = $sOutput . '<td class="align-middle">' . number_format($oEntry->getDifferenceSupply(),2,".",",") . '</td>';
            if($oEntry->getMarketCap() === ""){
                $sMarketCap = $oEntry->getMarketCap();
            } else {
                $sMarketCap = number_format($oEntry->getMarketCap(),2,".",",");
            }
            $sOutput = $sOutput . '<td class="align-middle">' . $sMarketCap . '</td>';
            $sOutput = $sOutput . '<td class="align-middle">' . $oEntry->getHolders() . '</td></tr>';
        }

        $sOutput = $sOutput . '</tbody></table>';

        return $sOutput;
    }
}
