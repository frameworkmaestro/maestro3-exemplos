<?php

namespace exemplos\models;

class PessoaRetrieve {

    public $model;

    public function __construct($model) {
        $this->model = $model;
    }

    public function byNome($nome) {
        mdump("Called retrieve->byNome");
        $criteria = $this->model->select("idPessoa")->where("nome = '{$nome}'");
        return $this->model->retrieveFromCriteria($criteria);
    }

}
