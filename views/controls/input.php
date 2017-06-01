<?php

class input extends MActionPanel {

    public function __construct() {
        parent::__construct('inputPanel','Exemplos::Controles::Input','>exemplos/main/controls');
        $this->addAction('Text Fields', 'exemplosIconForm', '>exemplos/controls/formTextField');
        $this->addAction('Input Fields', 'exemplosIconForm', '>exemplos/controls/formInputField');
        $this->addAction('Input Grid', 'exemplosIconForm', '>exemplos/controls/formInputGrid');
        $this->addAction('Selection Fields', 'exemplosIconForm', '>exemplos/controls/formSelection');
        $this->addAction('Choice Fields', 'exemplosIconForm', '>exemplos/controls/formChoice');
        $this->addAction('Lookup', 'exemplosIconForm', '>exemplos/controls/formLookup');
        $this->addAction('GridField', 'exemplosIconForm', '>exemplos/controls/formGridField');
        $this->addAction('GridInput', 'exemplosIconForm', '>exemplos/controls/formGridInput');
        $this->addAction('File Upload', 'exemplosIconForm', '>exemplos/controls/formFileUpload');
        $this->addAction('TransferBox', 'exemplosIconForm', '>exemplos/controls/formTransferBox');
    }

}

