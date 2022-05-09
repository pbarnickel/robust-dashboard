<?php

namespace BPS\RobustDashboard;

use BPS\RobustDashboard\Constants;
use BPS\RobustDashboard\API\DatabaseAPI;
use BPS\RobustDashboard\API\RobustAPI;
use BPS\RobustDashboard\Model\EntryRBT;
use BPS\RobustDashboard\Model\EntryRBS;
use BPS\RobustDashboard\Model\HistoryRBT;
use BPS\RobustDashboard\Model\HistoryRBS;

class Main implements Constants
{
    protected $databaseAPI;
    protected $historyRBT;
    protected $historyRBS;
    protected $currentRBT;
    protected $currentRBS;

    public function __construct()
    {
        $this->databaseAPI = new DatabaseAPI();
        $this->initHistoryRBT();
        $this->initHistoryRBS();
        $this->initCurrentRBT();
        $this->initCurrentRBS();
    }

    public function initHistoryRBT()
    {
        $this->historyRBT = new HistoryRBT();
        $history = $this->databaseAPI->readHistory(Constants::DB_RBT_SELECT_HISTORY);
        if ($history->num_rows > 0) {
            while ($row = $history->fetch_assoc()) {
                $entry = new EntryRBT(
                    $row[Constants::DB_ENTRY_ID],
                    $row[Constants::DB_ENTRY_DATE],
                    $row[Constants::DB_ENTRY_RBT_TOTAL_BURNED],
                    $row[Constants::DB_ENTRY_RBT_BURNED],
                    $row[Constants::DB_ENTRY_MARKET_CAP],
                    $row[Constants::DB_ENTRY_HOLDERS]
                );
                $this->historyRBT->addEntry($entry);
            }
        }
    }

    public function initHistoryRBS()
    {
        $this->historyRBS = new HistoryRBS();
        $history = $this->databaseAPI->readHistory(Constants::DB_RBS_SELECT_HISTORY);
        if ($history->num_rows > 0) {
            while ($row = $history->fetch_assoc()) {
                $entry = new EntryRBS(
                    $row[Constants::DB_ENTRY_ID],
                    $row[Constants::DB_ENTRY_DATE],
                    $row[Constants::DB_ENTRY_RBS_TOTAL_SUPPLY],
                    $row[Constants::DB_ENTRY_RBS_SUPPLY],
                    $row[Constants::DB_ENTRY_MARKET_CAP],
                    $row[Constants::DB_ENTRY_HOLDERS]
                );
                $this->historyRBS->addEntry($entry);
            }
        }
    }

    public function initCurrentRBT()
    {
        $lastEntry = $this->historyRBT->getLastEntry();
        $current = RobustAPI::requestDataRBT();
        $burned = $current->getTotalBurned();
        if ($lastEntry) {
            $burned = $burned - $lastEntry->getTotalBurned();
        }
        $current->setBurned($burned);
        $this->currentRBT = $current;
    }

    public function initCurrentRBS()
    {
        $lastEntry = $this->historyRBS->getLastEntry();
        $current = RobustAPI::requestDataRBS();
        $supply = $current->getTotalSupply();
        if ($lastEntry) {
            $supply = $supply - $lastEntry->getTotalSupply();
        }
        $current->setSupply($supply);
        $this->currentRBS = $current;
    }

    public function updateDataRBT()
    {
        $lastEntry = $this->historyRBT->getLastEntry();
        $entry = $this->databaseAPI->updateHistoryRBT($lastEntry, $this->currentRBT);
        if ($entry) {
            $this->historyRBT->addNewEntry($entry);
        }
    }

    public function updateDataRBS()
    {
        $lastEntry = $this->historyRBS->getLastEntry();
        $entry = $this->databaseAPI->updateHistoryRBS($lastEntry, $this->currentRBS);
        if ($entry) {
            $this->historyRBS->addNewEntry($entry);
        }
    }

    public function exportDataRBT()
    {
        $history = $this->historyRBT->getEntries();
        array_unshift($history, $this->currentRBT);
        $json = json_encode($history);
        file_put_contents("./../../js/data/RBT.json", $json);
    }

    public function exportDataRBS()
    {
        $history = $this->historyRBS->getEntries();
        array_unshift($history, $this->currentRBS);
        $json = json_encode($history);
        file_put_contents("./../../js/data/RBS.json", $json);
    }
}
