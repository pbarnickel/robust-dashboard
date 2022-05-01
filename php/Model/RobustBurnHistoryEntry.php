<?php

/**
 * Copyright bp-sol.de 2021
 * 
 * Model for RobustBurnHistoryEntry
 * 
 */

namespace BPS\RobustDashboard\Model;

use BadFunctionCallException;

class RobustBurnHistoryEntry implements \JsonSerializable
{

    protected $sID;
    protected $sDate;
    protected $dTotalBurned;
    protected $dDifferenceBurned;
    protected $dMarketCap;
    protected $dHolders;

    public function __construct($sID, $sDate, $dTotalBurned, $dDifferenceBurned, $dMarketCap, $dHolders)
    {
        $this->sID = $sID;
        $this->sDate = $sDate;
        $this->dTotalBurned = $dTotalBurned;
        $this->dDifferenceBurned = $dDifferenceBurned;
        $this->dMarketCap = $dMarketCap;
        $this->dHolders = $dHolders;
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

    public function getMarketCap()
    {
        return $this->dMarketCap;
    }

    public function getHolders()
    {
        return $this->dHolders;
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

    public function setMarketCap($dMarketCap)
    {
        $this->dMarketCap = $dMarketCap;
    }

    public function setHolders($dHolders)
    {
        $this->dHolders = $dHolders;
    }

    public function jsonSerialize()
    {
        return [
            'Date' => $this->getDate(),
            'Burned' => $this->getDifferenceBurned(),
            'Total' => $this->getTotalBurned(),
            'MarketCap' => $this->getMarketCap(),
            'Holders' => $this->getHolders()
        ];
    }
}
