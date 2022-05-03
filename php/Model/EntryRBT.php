<?php

namespace BPS\RobustDashboard\Model;
use BadFunctionCallException;

class EntryRBT extends Entry implements \JsonSerializable
{
    protected $totalBurned;
    protected $burned;

    public function __construct($id, $date, $totalBurned, $burned, $marketCap, $holders)
    {
        $this->id = $id;
        $this->date = $date;
        $this->totalBurned = $totalBurned;
        $this->burned = $burned;
        $this->marketCap = $marketCap;
        $this->holders = $holders;
    }

    public function getTotalBurned()
    {
        return $this->totalBurned;
    }

    public function getBurned()
    {
        return $this->burned;
    }

    public function setTotalBurned($totalBurned)
    {
        $this->totalBurned = $totalBurned;
    }

    public function setBurned($burned)
    {
        $this->burned = $burned;
    }

    public function jsonSerialize()
    {
        return [
            'Date' => $this->date,
            'TotalBurned' => $this->totalBurned,
            'Burned' => $this->burned,
            'MarketCap' => $this->marketCap,
            'Holders' => $this->holders
        ];
    }
}
