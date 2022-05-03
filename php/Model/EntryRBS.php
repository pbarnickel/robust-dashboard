<?php

namespace BPS\RobustDashboard\Model;

class EntryRBS
{
    protected $totalSupply;
    protected $supply;

    public function __construct($id, $date, $totalSupply, $supply, $marketCap, $holders)
    {
        $this->id = $id;
        $this->date = $date;
        $this->totalSupply = $totalSupply;
        $this->supply = $supply;
        $this->marketCap = $marketCap;
        $this->holders = $holders;
    }

    public function getTotalSupply()
    {
        return $this->totalSupply;
    }

    public function getSupply()
    {
        return $this->supply;
    }

    public function setTotalSupply($totalSupply)
    {
        $this->totalSupply = $totalSupply;
    }

    public function setSupply($supply)
    {
        $this->supply = $supply;
    }
}
