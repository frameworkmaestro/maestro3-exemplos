<?php

return array(
    'exemplos' => array('mainPanel', 'exemplos/main/main', 'exemplosIconForm', '', A_ACCESS, array(
            'controles' => array('Controles', 'exemplos/main/controls', 'exemplosIconForm', '', A_ACCESS, array(
                    'actions' => array('Actions', 'exemplos/controls/actions', 'exemplosIconForm', '', A_ACCESS, array()),
                    'menus' => array('Menus', 'exemplos/controls/menus', 'exemplosIconForm', '', A_ACCESS, array()),
                    'input' => array('Input', 'exemplos/controls/input', 'exemplosIconForm', '', A_ACCESS, array()),
                    'output' => array('Output', 'exemplos/controls/output', 'exemplosIconForm', '', A_ACCESS, array()),
                    'forms' => array('Forms', 'exemplos/controls/forms', 'exemplosIconForm', '', A_ACCESS, array(
                        'formxml' => array('Form XML', 'exemplos/controls/formXML','exemplosIconForm',  '', A_ACCESS, array()),
                        'formviewxml' => array('Form View XML', 'exemplos/controls/formViewXML','exemplosIconForm',  '', A_ACCESS, array()),
                        'formsimple' => array('Simple Form', 'exemplos/controls/formSimple','exemplosIconForm',  '', A_ACCESS, array()),
                        'formpartialview' => array('Form Partial View', 'exemplos/controls/formPartialView','exemplosIconForm',  '', A_ACCESS, array()),
                        'formpartialviewxml' => array('Form Partial View XML', 'exemplos/controls/formPartialViewXML','exemplosIconForm',  '', A_ACCESS, array()),
                        'formcustombox' => array('Form Usando Custom Box', 'exemplos/controls/formUsingCustomBox','exemplosIconForm',  '', A_ACCESS, array()),
                        'formmultipledataobj' => array('Form Multiple Data Objects', 'exemplos/controls/formMultipleDataObj','exemplosIconForm',  '', A_ACCESS, array()),
                    )),
                    'grids' => array('Grids', 'exemplos/controls/grid', 'exemplosIconForm', '', A_ACCESS, array()),
                    'containers' => array('Containers', 'exemplos/controls/container', 'exemplosIconForm', '', A_ACCESS, array()),
                    'dialogos' => array('Diálogos', 'exemplos/controls/dialogos', 'exemplosIconForm', '', A_ACCESS, array()),
                    'ajax' => array('Ajax', 'exemplos/controls/ajax', 'exemplosIconForm', '', A_ACCESS, array()),
                    'components' => array('Components', 'exemplos/controls/components', 'exemplosIconForm', '', A_ACCESS, array(
                        'formxml' => array('Form XML', 'exemplos/controls/formXML','exemplosIconForm',  '', A_ACCESS, array()),
                        'formviewxml' => array('Form View XML', 'exemplos/controls/formViewXML','exemplosIconForm',  '', A_ACCESS, array()),
                        'formpartialview' => array('Form Partial View', 'exemplos/controls/formPartialView','exemplosIconForm',  '', A_ACCESS, array()),
                        'formpartialviewxml' => array('Form Partial View XML', 'exemplos/controls/formPartialViewXML','exemplosIconForm',  '', A_ACCESS, array()),
                        'formcustombox' => array('Form Usando Custom Box', 'exemplos/controls/formUsingCustomBox','exemplosIconForm',  '', A_ACCESS, array()),
                        'formmultipledataobj' => array('Form Multiple Data Objects', 'exemplos/controls/formMultipleDataObj','exemplosIconForm',  '', A_ACCESS, array()),
                    )),
            )),
            'tipos' => array('Tipos', 'exemplos/main/types', 'exemplosIconForm', '', A_ACCESS, array(
                'datas' => array('Datas', 'types/dates', 'exemplosIconForm', '', A_ACCESS, array()),
                'currency' => array('Currency', 'types/currency', 'exemplosIconForm', '', A_ACCESS, array()),
            )),
            'util' => array('Utilitários', 'exemplos/main/utils', 'exemplosIconForm', '', A_ACCESS, array(
                'mkrono' => array('MKrono', 'utils/mkrono', 'exemplosIconForm', '', A_ACCESS, array()),
                'csvdump' => array('MCSVDump', 'utils/formcsvdump', 'exemplosIconForm', '', A_ACCESS, array()),
            )),
            'crud' => array('CRUD', 'exemplos/main/crud', 'exemplosIconForm', '', A_ACCESS, array(
                'pessoa' => array('Pessoa', 'pessoa/formFind', 'exemplosIconForm', '', A_ACCESS, array(
                    'pesquisar' => array('Pesquisar', 'formFind', 'exemplosIconForm', '', A_ACCESS, array()),
                    'novo' => array('Novo', 'formNew', 'exemplosIconForm', '', A_ACCESS, array()),
                )),
                'aluno' => array('Aluno', 'aluno/formFind', 'exemplosIconForm', '', A_ACCESS, array(
                    'pesquisar' => array('Pesquisar', 'formFind', 'exemplosIconForm', '', A_ACCESS, array()),
                    'novo' => array('Novo', 'formNew', 'exemplosIconForm', '', A_ACCESS, array()),
                    'novolookup' => array('Novo [Lookup]', 'formNewLookup', 'exemplosIconForm', '', A_ACCESS, array()),
                )),
            )),
            'persistence' => array('Persistência', 'exemplos/main/persistence', 'exemplosIconForm', '', A_ACCESS, array(
                    'sql' => array('SQL', 'exemplos/persistence/sql', 'exemplosIconForm', '', A_ACCESS, array()),
                    'criteriamethods' => array('Criteria com Métodos', 'exemplos/persistence/criteriaMethods', 'exemplosIconForm', '', A_ACCESS, array()),
                    'criteriacommands' => array('Criteria com Comandos', 'exemplos/persistence/criteriaCommands', 'exemplosIconForm', '', A_ACCESS, array()),
                    'objectmehtods' => array('Métodos de Objetos', 'exemplos/persistence/objectMethods', 'exemplosIconForm', '', A_ACCESS, array()),
                    'objectassociations' => array('Associações de Objetos', 'exemplos/persistence/objectAssociations', 'exemplosIconForm', '', A_ACCESS, array()),
                    'objecttransactions' => array('Transações', 'exemplos/persistence/objectTransactions', 'exemplosIconForm', '', A_ACCESS, array()),
                    'operations' => array('Operações de Conjunto', 'exemplos/persistence/setOperations', 'exemplosIconForm', '', A_ACCESS, array()),
            )),
            'relatorios' => array('Relatorios', 'exemplos/main/relatorios', 'exemplosIconForm', '', A_ACCESS, array(
                    'jasper' => array('Exemplo Jasper', 'exemplos/relatorios/formExemploCSV', 'exemplosIconForm', '', A_ACCESS, array()),
                    'ezpdf' => array('Exemplos EzPDF', 'exemplos/relatorios/formEzPDF', 'exemplosIconForm', '', A_ACCESS, array()),
                    'phpexcel' => array('Exemplos Excel', 'exemplos/relatorios/formExcel', 'exemplosIconForm', '', A_ACCESS, array()),
            )),
            'zend' => array('Zend', 'exemplos/main/zend', 'exemplosIconForm', '', A_ACCESS, array(
                'version' => array('Versão', 'zend/formVersion', 'exemplosIconForm', '', A_ACCESS, array()),
                'session' => array('Sessão', 'zend/formSession', 'exemplosIconForm', '', A_ACCESS, array()),
                'rand' => array('Random', 'zend/formRand', 'exemplosIconForm', '', A_ACCESS, array()),
                'bigint' => array('BigInteger', 'zend/formBigInteger', 'exemplosIconForm', '', A_ACCESS, array()),
                'captcha' => array('Captcha', 'zend/formCaptcha', 'exemplosIconForm', '', A_ACCESS, array()),
                'soapclient' => array('SOAP Client', 'zend/formSOAPClient', 'exemplosIconForm', '', A_ACCESS, array()),
            )),
            'diversos' => array('Diversos', 'exemplos/main/diversos', 'exemplosIconForm', '', A_ACCESS, array(
                'background' => array('Execução Background', 'diversos/formBackground', 'exemplosIconForm', '', A_ACCESS, array()),
                'emails' => array('Envio de emails', 'diversos/formEmail', 'exemplosIconForm', '', A_ACCESS, array()),
                'phplot' => array('Gráfico com PHPLot', 'diversos/formPhpLot', 'exemplosIconForm', '', A_ACCESS, array()),
            )),
    ))
);

?>