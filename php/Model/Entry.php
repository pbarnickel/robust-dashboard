<?php

namespace BPS\RobustDashboard\Model;

class Entry
{
    protected $id;
    protected $date;
    protected $marketCap;
    protected $holders;

    public function getID()
    {
        return $this->id;
    }

    public function getDate()
    {
        return $this->date;
    }

    public function getMarketCap()
    {
        return $this->marketCap;
    }

    public function getHolders()
    {
        return $this->holders;
    }

    public function setDate($date)
    {
        $this->date = $date;
    }

    public function setMarketCap($marketCap)
    {
        $this->marketCap = $marketCap;
    }

    public function setHolders($holders)
    {
        $this->holders = $holders;
    }
}
