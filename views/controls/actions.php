<?php

class actions extends MActionPanel {

    public function __construct() {
        parent::__construct('actionsPanel','Exemplos::Controles::Actions','>exemplos/main/controls');
        $this->addAction('Buttons', 'exemplosIconForm', '>exemplos/controls/formButtons');
        $this->addAction('Links', 'exemplosIconForm', '>exemplos/controls/formLinks');
        $this->addAction('Event XML', 'exemplosIconForm', '>exemplos/controls/formEvent');        
        $this->addAction('Javascript Helpers', 'exemplosIconForm', '>exemplos/controls/formJavascript');
        $this->addAction('Tools', 'exemplosIconForm', '>exemplos/controls/formTool');
    }

}

