<?php

namespace BPS\RobustDashboard\Model;
use BPS\RobustDashboard\Constants;

class History implements Constants
{
    protected $entries;

    public function __construct()
    {
        $this->entries = array();
    }

    public function getSize()
    {
        return sizeof($this->entries);
    }

    public function getEntries()
    {
        return $this->entries;
    }

    public function getEntry($id)
    {
        $len = $this->getSize();
        for ($i = 0; $i < $len; $i++) {
            if ($this->entries[$i]->getID() === $id) {
                return $this->entries[$i];
            }
        }
    }

    public function getLastEntry()
    {
        if($this->getSize() === 0){
            return FALSE;
        }
        return $this->entries[0];
    }

    public function addEntry($entry){
        array_push($this->entries, $entry);
    }

    public function addNewEntry($entry){
        array_unshift($this->entries, $entry);
    }
}
