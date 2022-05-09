<?php

namespace BPS\RobustDashboard\Model;
use BadFunctionCallException;

class EntryRBS extends Entry implements \JsonSerializable
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

    public function jsonSerialize()
    {
        return [
            'Date' => $this->date,
            'TotalSupply' => number_format($this->totalSupply, 2),
            'Supply' => number_format($this->supply, 2),
            'MarketCap' => number_format($this->marketCap, 2),
            'Holders' => number_format($this->holders),
        ];
    }
}
