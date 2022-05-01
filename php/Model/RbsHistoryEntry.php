<?php

/**
 * Copyright bp-sol.de 2021
 * 
 * Model for RbsHistoryEntry
 * 
 */

namespace BPS\RobustDashboard\Model;

use BadFunctionCallException;

class RbsHistoryEntry implements \JsonSerializable
{

    protected $sID;
    protected $sDate;
    protected $dTotalSupply;
    protected $dDifferenceSupply;
    protected $dMarketCap;
    protected $dHolders;

    public function __construct($sID, $sDate, $dTotalSupply, $dDifferenceSupply, $dMarketCap, $dHolders)
    {
        $this->sID = $sID;
        $this->sDate = $sDate;
        $this->dTotalSupply = $dTotalSupply;
        $this->dDifferenceSupply = $dDifferenceSupply;
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

    public function getTotalSupply()
    {
        return $this->dTotalSupply;
    }

    public function getDifferenceSupply()
    {
        return $this->dDifferenceSupply;
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

    public function setTotalSupply($dTotalSupply)
    {
        $this->dTotalSupply = $dTotalSupply;
    }

    public function setDifferenceSupply($dDifferenceSupply)
    {
        $this->dDifferenceSupply = $dDifferenceSupply;
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
            'Supply' => $this->getDifferenceSupply(),
            'Total' => $this->getTotalSupply(),
            'MarketCap' => $this->getMarketCap(),
            'Holders' => $this->getHolders()
        ];
    }
}
