<?php

/**
 * Copyright bp-sol.de 2021
 * 
 * Model for RobustBurnHistory
 * 
 */

namespace BPS\RobustDashboard\Model;

class RobustBurnHistory
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

        $sOutput = '<table class="table"><thead><tr class="table-dark"><th scope="col">Date</th><th scope="col">RBT Burned Total</th><th scope="col">Difference</th></tr></thead><tbody>';
        $sOutput = $sOutput . '<tr class="table-primary"><th scope="row">' . $oCurrentSituation->getDate() . '</th><td>' . $oCurrentSituation->getTotalBurned() . '</td><td>' . $oCurrentSituation->getDifferenceBurned() . '</td></tr>';
        $iLen = $this->getSize();
        for ($i = 0; $i < $iLen; $i++) {
            $oEntry = $this->aEntries[$i];
            $sOutput = $sOutput . '<tr><th scope="row">' . $oEntry->getDate() . '</th>';
            $sOutput = $sOutput . '<td>' . $oEntry->getTotalBurned() . '</td>';
            $sOutput = $sOutput . '<td>' . $oEntry->getDifferenceBurned() . '</td></tr>';
        }

        $sOutput = $sOutput . '</tbody></table>';

        return $sOutput;
    }
}
