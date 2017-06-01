<?php

class grid extends MActionPanel {

    public function __construct() {
        parent::__construct('gridPanel','Exemplos::Controles::Grids','>exemplos/main/controls');
        $this->addAction('MDataGrid XML', 'exemplosIconForm', '>exemplos/controls/formGridXML');
        $this->addAction('MDataGrid XML usando DGrid', 'exemplosIconForm', '>exemplos/controls/formDGridXML');
        $this->addAction('Array Grid', 'exemplosIconForm', '>exemplos/controls/formArrayGrid');
        $this->addAction('Two Grids', 'exemplosIconForm', '>exemplos/controls/formTwoGrids');
        $this->addAction('DnD Grids', 'exemplosIconForm', '>exemplos/controls/formDnDGrids');
        $this->addAction('Scroll Grid', 'exemplosIconForm', '>exemplos/controls/formScrollGrid');
        $this->addAction('Full Grid', 'exemplosIconForm', '>exemplos/controls/formFullGrid');        
    }

}

