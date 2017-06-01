<?php

use exemplos\models as models;

class ControlsController extends MController {

    public function main() {
        $this->render();
    }

    public function input() {
        $this->render();
    }

    public function actions() {
        $this->render();
    }

    public function form() {
        $this->render();
    }

    public function grid() {
        $this->render();
    }

    public function container() {
        $this->render();
    }

    public function diversos() {
        $this->render();
    }

    public function formForm() {
        if ($this->data->nome == 'a') { // Simula erro no processamento
            $this->renderPrompt(MPrompt::error('Simulação de erro'));
        } elseif ($this->data->nome == 'b') { // Simula confirmação
            $this->renderPrompt(MPrompt::confirmation('Simula confirmação?', '>exemplos/controls.main', '>exemplos/controls/main'));
        } else {
            $this->render();
        }
    }

    public function formGrid() {
        $table = new models\Table($this->data->id);
        $this->data->object = $table->getData();
        $filter->nome = $this->data->nome;
        $this->data->query = $table->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function formXML() {
        $pessoa = new models\Pessoa();
        $this->data->object = $pessoa->getData();
        $filter->nome = $this->data->nome;
        $this->data->options = $pessoa->listByFilter($filter)->asQuery()->chunkResult(0, 2);
        $this->render();
    }

    public function formViewXML() {
        $pessoa = new models\Pessoa(2);
        $this->data->object = $pessoa->getData();
        $filter->nome = $this->data->nome;
        $this->data->options = $pessoa->listByFilter($filter)->asQuery()->chunkResult(0, 2);
        $this->render();
    }

    public function formPartialView() {
        $pessoa = new models\Pessoa(2);
        $this->data->object = $pessoa->getData();
        $filter->nome = $this->data->nome;
        $this->data->options = $pessoa->listAll()->asQuery()->chunkResult(0, 1);
        $usuario = new models\Usuario();
        $this->data->query = $usuario->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function formPartialViewXML() {
        $pessoa = new models\Pessoa(2);
        $this->data->object = $pessoa->getData();
        $filter->nome = $this->data->nome;
        $this->data->options = $pessoa->listAll()->asQuery()->chunkResult(0, 1);
        $usuario = new models\Usuario();
        $this->data->query = $usuario->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function formSimple() {
        $this->data->actionSimple = '@controls/formSimple';
        $this->render();
    }

    public function formMultipleDataObj() {
        $this->render();
    }

    public function formTextField() {
        $this->data->email = 'a@teste.com';
        $this->data->nomeValidator = false;
        $this->data->currency = Manager::currency(1234.56);
        $this->data->dataNascimento = Manager::date(Manager::getSysDate());
        $this->data->timestamp = Manager::timestamp(Manager::getSysTime());
        $this->render();
    }

    public function formButtons() {
        $this->render();
    }

    public function formButtonsPost() {
        $this->renderPrompt('information', 'Action executada via POST.');
    }

    public function ajaxButtons() {
        $this->render();
    }

    public function MenuBar(){
        $this->render();
    }
    
    public function ToolBar(){
        $this->render();
    }

    public function NavBar(){
        $this->render();
    }

    public function formSelection() {
        // selection from query
        $pessoa = new models\Pessoa();
        $this->data->object = $pessoa->getData();
        $filter = new stdClass();
        $filter->nome = $this->data->nome;
        $this->data->options = $pessoa->listByFilter($filter)->asQuery()->chunkResult(0, 1);
        // selection from simple array
        $this->data->simple = array('A' => 'Opção A', 'B' => 'Opção B', 'C' => 'Opção C', 'D' => 'Opção D', 'E' => 'Opção E');
        // selection from simple array
        $this->data->group = array(
            'A' => array('A1' => 'Opção A1', 'A2' => 'Opção A2', 'A3' => 'Opção A3'),
            'B' => array('B1' => 'Opção B1', 'B2' => 'Opção B2', 'B3' => 'Opção B3'),
            'C' => array('C1' => 'Opção C1', 'C2' => 'Opção C2', 'C3' => 'Opção C3')
        );
        $this->render();
    }

    public function formChoice() {
        $this->data->chk1 = 'A';
        $this->data->chkgroup1Options = array();
        $this->data->chkgroup1Options[] = new MCheckBox('id1', 'value1', '', false, 'text1');
        $this->data->chkgroup1Options[] = new MCheckBox('id2', 'value2', '', false, 'text2');
        $this->data->chkgroup1Options[] = new MCheckBox('id3', 'value3', '', false, 'text3');
        $this->data->chkgroup1Options[] = new MCheckBox('id4', 'value4', '', false, 'text4');

        $this->data->rdgroup1 = '3';
        $this->render();
    }

    public function formGridField() {
        $this->render();
    }

    public function formGridInput() {
        $this->data->opcoes = array('A' => 'Opção A', 'B' => 'Opção B', 'C' => 'Opção C', 'D' => 'Opção D', 'E' => 'Opção E');
        $this->data->grid3data =  "[{'codigoExemplo3':'12345','descricaoExemplo3':'Descrição exemplo'}]";
        $this->render();
    }
    
    public function gridInput(){
        $dados1 = json_decode($this->data->gridInputExemplo1_data);
        mdump($dados1);
        $dados2 = json_decode($this->data->gridInputExemplo2_data);
        mdump($dados2);
        $this->renderPrompt('information', 'OK');
    }

    public function formGridXML() {
        $pessoa = new models\Pessoa($this->data->id);
        $this->data->object = $pessoa->getData();
        $filter->nome = $this->data->nome;
        $this->data->query = $pessoa->listByFilter($filter)->asQuery();
        $checked = explode(':', $this->data->marca);
        $this->data->textoAtivo = array('0'=>'Não','1'=>'Sim');
        $this->render();
    }

    public function formDGridXML() {
        $pessoa = new models\Pessoa($this->data->id);
        $this->data->object = $pessoa->getData();
        $this->render();
    }

    public function formDGridData() {
        $pessoa = new models\Pessoa($this->data->id);
        $this->data->object = $pessoa->getData();
        $filter->nome = $this->data->nome;
        if ($this->data->count) {
            $query = $pessoa->listByFilter($filter)->asQuery();
            $query->setRange($this->data->start / $this->data->count, $this->data->count);
            $json = $query->asJSON('nome,idPessoa,dataNascimento,ativo');
            mdump($json);
        } else {
            $json = "[]";
        }
        $this->renderJson($json);
    }

    public function formArrayGrid() {
        $pessoa = new models\Pessoa();
        $filter->nome = $this->data->nome;
        $query = $pessoa->listByFilter($filter)->asQuery();
        $this->data->rowCount = $query->count();
        $this->data->pageLength = 5;
        // pegar a página atual para definição do range
        $pn = $this->data->_GRIDNAME . '_GOPAGE';
        $pageNumber = $this->data->$pn ? : 1;
        // definição do range
        $this->data->range = new MRange($pageNumber, $this->data->pageLength, $this->data->rowCount);
        $query->setRange($this->data->range);
        // definição do array
        $this->data->array = $pessoa->simulaCalculo($query->getResult());
        $this->render();
    }

    public function formTwoGrids() {
        $pessoa = new models\Pessoa($this->data->id);
        $this->data->object = $pessoa->getData();
        $filter->nome = $this->data->nome;
        $this->data->queryOne = $pessoa->listByFilter($filter)->asQuery();
        $this->data->queryTwo = $pessoa->listByFilter($filter)->asQuery();
        $checked = explode(':', $this->data->marca);
        $this->render();
    }

    public function formDnDGrids() {
        $pessoa = new models\Pessoa();
        $this->data->query = $pessoa->listAll()->asQuery();
        $this->render();
    }

    public function formRelatedGrids() {
        $pessoa = new models\Pessoa();
        $this->data->query = $pessoa->listAll()->asQuery();
        $this->render();
    }

    public function formScrollGrid() {
        $pessoa = new models\Pessoa();
        $this->data->query = $pessoa->listAll()->asQuery();
        $this->render();
    }

    public function formFullGrid() {
        $pessoa = new models\Pessoa();
        $this->data->query = $pessoa->listFuncionario()->asQuery();
        $this->render();
    }

    public function formLookup() {
        $model = new models\Usuario();
        $this->data->options = $model->listAll()->asQuery()->chunkResult();
        $this->data->lookupPessoa = $model->getPessoa()->getData();
        $this->render();
    }

    public function formJavascript() {
        $this->render();
    }

    public function formContentPane() {
        $this->render();
    }

    public function formBoxPane() {
        $this->render();
    }

    public function formCustomBox() {
        $this->render();
    }

    public function formBaseGroup() {
        $this->render();
    }

    public function formStack() {
        $this->render();
    }

    public function formAccordion() {
        $this->render();
    }

    public function formTab() {
        $this->render();
    }

    public function formEvent() {
        $this->render();
    }

    public function renderPartialView() {
        $this->renderPartial('renderPartialView1');
        $this->render();
    }

    public function formUsingCustomBox() {
        $this->render();
    }

    public function componentGrid() {
        $pessoa = new models\Pessoa();
        $this->data->query = $pessoa->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function componentPHP() {
        $this->render();
    }

    public function formFileUpload() {
        $this->render();
    }

    public function formWindowBase() {
        $this->render();
    }

    public function formPrompt() {
        $this->render();
    }

    public function window1() {
        $this->render();
    }

    public function window2() {
        $this->render();
    }

    public function formTree() {
        $this->render();
    }

    public function formCSS() {
        $this->render();
    }

    public function formImagens() {
        $this->data->location = Manager::getStaticURL('exemplos', 'images/logo.png');
        $this->data->icon = Manager::getStaticURL('exemplos', 'images/16x16/find.png');
        $this->render();
    }

    public function formTextTable() {
        $pessoa = new models\Pessoa();
        $this->data->rows = $pessoa->listTextTable()->asQuery()->getResult();
        $this->render();
    }

    public function formTransferBox() {
        $this->data->list = array(
            'RJ' => 'Rio de Janeiro',
            'MG' => 'Minas Gerais',
            'SP' => 'São Paulo',
            'ES' => 'Espírito Santo',
            'BA' => 'Bahia',
            'RS' => 'Rio Grande do Sul'
        );
		$this->render();
    }

    public function treeSelect() {
        $this->render('formTree');
    }

    public function uploadFile() {
        //mdump($_FILES);
        $files = \MUtil::parseFiles('uploadFile');
        if (is_array($files)) {
            foreach ($files as $file) {
                $path = \Manager::getPublicPath('exemplos', '', 'files/' . $file->getName());
                $file->copyTo($path);
            }
        }
        $files = \MUtil::parseFiles('uploadMultiple');
        if (is_array($files)) {
            foreach ($files as $file) {
                $path = \Manager::getPublicPath('exemplos', '', 'files/' . $file->getName());
                $file->copyTo($path);
            }
        }
        $go = 'exemplos/controls/formFileUpload';
        $this->renderPrompt('information', 'OK', $go);
    }

    public function lookupPessoa() {
        $model = new models\Pessoa();
        $this->data->lookup = $this->data->lookupPessoa ? : $this->data->pessoa;
        $this->data->query = $model->listByFilter($this->data->lookup)->asQuery();
        $this->render();
    }

    public function lookupUsuario() {
        $model = new models\Usuario();
        $filter->login = $this->data->filter0;
        $filter->idUsuario = $this->data->filter1;
        $this->data->options = $model->listAll()->asQuery()->chunkResult();
        $this->data->query = $model->listByFilter($filter)->asQuery();
        $this->render();
    }

    public function exportExcel() {
        $pessoa = new models\Pessoa($this->data->id);
        $filter->nome = $this->data->nome;
        $query = $pessoa->listByFilter($filter)->asQuery();

        $dadosArray = $query->getResult();
        $columnNames = array($query->getColumnNames());

        $planilha['Planilha MDataGrid'] = array_merge($columnNames, $dadosArray);

        $exporter = new MExporter('xls');
        $urlArquivo = $exporter->execute($planilha);

        $this->redirect($urlArquivo);
    }

    public function exportCSV() {
        $pessoa = new models\Pessoa($this->data->id);
        $filter->nome = $this->data->nome;
        $query = $pessoa->listByFilter($filter)->asQuery();
        ;

        $dadosArray = $query->getResult();
        $columnNames = $query->getColumnNames();

        $exporter = new MExporter('csv');
        $exporter->addColumns($columnNames);
        $urlArquivo = $exporter->execute($dadosArray);

        $this->redirect($urlArquivo);
    }

    public function exportPDF() {
        $pessoa = new models\Pessoa($this->data->id);
        $filter->nome = $this->data->nome;
        $query = $pessoa->listByFilter($filter)->asQuery();
        ;

        $dadosArray = $query->getResult();
        $columnNames = $query->getColumnNames();

        $exporter = new MExporter('pdf');
        $exporter->addColumns($columnNames);
        $urlArquivo = $exporter->execute($dadosArray);

        $this->redirect($urlArquivo);
    }

    public function pluginTest() {
        $a = explode("/maestro/apps/", $this->data->url);
        $context = new MContext($this->data->url);
        $this->render();
    }

}