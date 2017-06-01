<?php

class formDnDGrids extends MForm {

    function __construct() {
        parent::__construct('Dnd Grids', "exemplos/main/controls/grids");
    }

    function createFields() {
        $this->setFieldsFromXML('formDnDGrids.xml');
        $this->addJsFile('formDnDGrids.js');
        $this->page->onLoad("dojo.connect(gridDestDnD, \"onDrop\", function(){orderGrid('gridDest');orderGrid('gridSource');});");
        $this->page->onLoad("dojo.connect(gridSourceDnD, \"onDrop\", function(){orderGrid('gridDest');orderGrid('gridSource');});");
        $this->onSubmit("gridDestSubmit()");
    }

    /**
     * Executed before line renderization.
     * Method to be executed before each line renderization.
     * @param $currentRow - line index
     * @param $rowData - array containing the row data - initial index = 0 - references the row query
     * @param $actions - array containing the action's data
     * @param $columns - array containing the column's data - index is the fieldName
     * @param $query - the query parameter of the grid
     * @param $grid - the grid object
     */
    public function rowMethod($currentRow, $rowData, $actions, $columns, $query, $grid) {
        $columns[0]->control[$currentRow]->setValue($currentRow + 1);
    }

}

?>
