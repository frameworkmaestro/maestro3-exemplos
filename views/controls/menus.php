<?php

class menus extends MActionPanel {

    public function __construct() {
        parent::__construct('barsPanel','Exemplos::Controles::Bars','>exemplos/main/controls');
        $this->addAction('MenuBar', 'exemplosIconForm', '>exemplos/controls/formMenuBar');
        $this->addAction('ToolBar', 'exemplosIconForm', '>exemplos/controls/formToolBar');
        $this->addAction('Breadcrumb', 'exemplosIconForm', '>exemplos/controls/formBreadCrumb');
        $this->addAction('Tree', 'exemplosIconForm', '>exemplos/controls/formTree');
}

}

