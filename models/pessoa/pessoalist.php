<?php

namespace exemplos\models;

class PessoaList {

    public $model;
    
    public function __construct($model) {
        $this->model = $model;
    }

    public function byFilter($filter) {
        //mdump("Called list->byFilter");
        $criteria = $this->model->getCriteria()->select('idPessoa, nome, cpf, dataNascimento, email');
        if ($filter->nome) {
            $criteria->where("nome LIKE '%{$filter->nome}%'");
        }
        if ($filter->cpf) {
            $criteria->where("cpf = '{$filter->cpf}'");
        }
        if ($filter->email) {
            $criteria->where("email LIKE '{$filter->email}%'");
        }
        return $criteria;
    }
}