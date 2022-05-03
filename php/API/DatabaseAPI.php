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

        $date = date('d.m.Y', strtotime("-1 days"));
        $totalBurned = $current->getTotalBurned();
        $totalBurned = bcadd($totalBurned, '0', 2);
        if ($lastEntry) {
            $lastBurned = bcadd($lastEntry->getTotalBurned(), '0', 2);
            $burned = $totalBurned - $lastBurned;
        } else {
            $burned = $totalBurned;
        }
        $burned = bcadd($burned, '0', 2);
        $marketCap = $current->getMarketCap();
        $marketCap = bcadd($marketCap, '0', 2);
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

        $date = date('d.m.Y', strtotime("-1 days"));
        $totalSupply = $current->getTotalSupply();
        $totalSupply = bcadd($totalSupply, '0', 2);
        if ($lastEntry) {
            $lastSupply = bcadd($lastEntry->getTotalSupply(), '0', 2);
            $supply = $totalSupply - $lastSupply;
        } else {
            $supply = $totalSupply;
        }
        $supply = bcadd($supply, '0', 2);
        $marketCap = $current->getMarketCap();
        $marketCap = bcadd($marketCap, '0', 2);
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
