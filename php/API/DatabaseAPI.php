<?php

namespace BPS\RobustDashboard\API;

use BPS\RobustDashboard\Constants;
use BPS\RobustDashboard\Model\EntryRBT;

class DatabaseAPI extends API implements Constants
{
    protected $connection;

    protected function openConnection()
    {
        $this->connection = mysqli_connect(Constants::DB_SERVER, Constants::DB_USER, Constants::DB_PASSWORD, Constants::DB_NAME);
        if ($this->connection->connect_error) {
            die('Connection failed: ' . $this->connection->connect_error);
        }
    }

    protected function closeConnection()
    {
        $this->connection->close();
    }

    public function readHistory($query)
    {
        $this->openConnection();
        return $this->connection->query($query);
    }

    public function updateHistoryRBT($lastEntry, $current)
    {
        $this->openConnection();

        $date = date('d.m.Y');
        $totalBurned = $current->getTotalBurned();
        $burned = $totalBurned;
        if ($lastEntry) {
            $burned = $totalBurned - $lastEntry->getTotalBurned();
        }
        $marketCap = $current->getMarketCap();
        $holders = $current->getHolders();

        $query = Constants::DB_RBT_INSERT_ENTRY . ' ("' . $date . '", ' . $totalBurned . ', ' . $burned . ', ' . $marketCap . ', ' . $holders . ')';

        if ($this->connection->query($query) === TRUE) {
            $id = $this->connection->insert_id;
            $entry = new EntryRBT($id, $date, $totalBurned, $burned, $marketCap, $holders);
        } else {
            $entry = FALSE;
        }

        $this->closeConnection();

        return $entry;
    }

    public function updateHistoryRBS($lastEntry, $current)
    {
        $this->openConnection();

        $date = date('d.m.Y');
        $totalSupply = $current->getTotalSupply();
        $supply = $totalSupply;
        if ($lastEntry) {
            $supply = $totalSupply - $lastEntry->getTotalSupply();
        }
        $marketCap = $current->getMarketCap();
        $holders = $current->getHolders();

        $query = Constants::DB_RBS_INSERT_ENTRY . ' ("' . $date . '", ' . $totalSupply . ', ' . $supply . ', ' . $marketCap . ', ' . $holders . ')';

        if ($this->connection->query($query) === TRUE) {
            $id = $this->connection->insert_id;
            $entry = new EntryRBT($id, $date, $totalSupply, $supply, $marketCap, $holders);
        } else {
            $entry = FALSE;
        }

        $this->closeConnection();

        return $entry;
    }
}
