<?php

class formTree extends MForm {

    function __construct() {
        parent::__construct('Form Tree', ">main/controls");
    }

    function createFields() {
        $array = array(
            array(0, 'BaseControl', 'ctlr/action1', 'root'),
            array(1, 'Control1', 'ctlr/action2', 0),
            array(2, 'Control2', 'ctlr/action3', 0),
            array(3, 'Control3', '', 0),
            array(4, 'Control4', '', 0),
            array(5, 'Control5', 'controls/treeSelect', 0),
            array(6, 'Control11', '', 1),
            array(7, 'Control21', '', 2),
            array(8, 'Control22', '', 2),
            array(9, 'Control23', '', 2),
            array(10, 'Control41', '', 4),
            array(11, 'Control111', '', 6),
            array(12, 'Control112', '', 6),
            array(13, 'Control113', '', 6),
            array(14, 'Control12', '', 1),
            array(15, 'Control121', '', 14),
            array(16, 'Control122', '', 14),
            array(17, 'Control123', '', 14)
        );

        $fields = array(
            new MLabel("Selected = " . $this->data->id),
            new MTree('tree1'),
        );
        $this->setFields($fields);
        $this->tree1->setItemsFromArray($array);
        $this->tree1->setAction('>controls/formTree/#0#');
    }

}

?>
