<?php

class formJSON extends MForm {

    function __construct(){
        parent::__construct('Obtém dados via JSON', 'exemplos/main');
    }

    function createFields() {
        $this->setFieldsFromXML('formJSON.xml');
    }
}

?>
