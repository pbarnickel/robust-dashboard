<?php

/**
 * Copyright bp-sol.de 2021
 * 
 * Model for RobustBurnHistoryEntry
 * 
 */

namespace BPS\RobustDashboard\Model;

class RobustBurnHistoryEntry
{

    protected $sID;
    protected $sDate;
    protected $dTotalBurned;
    protected $dDifferenceBurned;

    public function __construct($sID, $sDate, $dTotalBurned, $dDifferenceBurned)
    {
        $this->sID = $sID;
        $this->sDate = $sDate;
        $this->dTotalBurned = $dTotalBurned;
        $this->dDifferenceBurned = $dDifferenceBurned;
    }

    public function getID()
    {
        return $this->sID;
    }

    public function getDate()
    {
        return $this->sDate;
    }

    public function getTotalBurned()
    {
        return $this->dTotalBurned;
    }

    public function getDifferenceBurned()
    {
        return $this->dDifferenceBurned;
    }

    public function setDate($sDate)
    {
        $this->sDate = $sDate;
    }

    public function setTotalBurned($dTotalBurned)
    {
        $this->dTotalBurned = $dTotalBurned;
    }

    public function setDifferenceBurned($dDifferenceBurned)
    {
        $this->dDifferenceBurned = $dDifferenceBurned;
    }
}
