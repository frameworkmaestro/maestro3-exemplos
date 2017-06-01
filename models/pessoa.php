<?php

/**
 * 
 *
 * @category   SIGA
 * @package    UFJF
 * @subpackage examples_Classes
 * @copyright  Copyright (c) 2003-2011 UFJF (http://www.ufjf.br)
 * @license    http://siga.ufjf.br/license
 * @version    
 * @since      
 */

namespace exemplos\models;

require 'pessoa/pessoalist.php';
require 'pessoa/pessoaretrieve.php';

class Pessoa extends map\PessoaMap {

    public $list;
    public $retrieve;

    public function __construct(){
        $this->list = new PessoaList($this);
        $this->retrieve = new PessoaRetrieve($this);
        //$retrieve = new PessoaMethods\retrieve($this);
        parent::__construct();
    }

    public static function config() {
        return array(
            'log' => array('nome'),
            'validators' => array(
            //'nome' => array('notnull', 'notblank', 'minlength' => 8),
            //'cpf' => array('notnull'),
            ),
            'converters' => array(
                'nome' => array('case' => 'upper'),
                'nome' => array('trim' => 'all'),
                'cpf' => array('default' => '12345678909'),
            )
        );
    }

    public function validate() {
        parent::validate();
        // exemplo de validação específica: recusa nascidos em julho..
        $dataNascimento = $this->getDataNascimento();
        if ($dataNascimento) {
            if ($dataNascimento->getMonth() == '07') {
                throw new \EModelException('Nascidos em julho não são aceitos!');
            }
        }
    }

    public function setData($data) {
        // exemplo de um tratamento específico: acrescentar prefixo
        $data->nome = 'Sr(a). ' . str_replace('Sr(a). ', '', $data->nome);
        // files não são convertidos automaticamente
        $data->foto = \Mutil::parsefiles('foto', 0);
        // campos NULL devem ser forçados
        $data->opcional = $data->opcional ? : NULL;
        // testa CPF vazio
        // executa setData (faz as conversoes de tipo se necessário)
        parent::setData($data);
    }

    public function getDescription() {
        return $this->getNome();
    }

    public function listByFilter($filter) {
        mdump($filter);
        $criteria = $this::getCriteria()->select('idPessoa, nome, cpf, dataNascimento, email');
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

    public function simulaCalculo($data) {
        // simula o acréscimo de colunas em um array exibido com MGrid
        // $data com o array bidimensional original (colunas 0 a 5)
        $lines = count($data);
        for ($i = 0; $i < $lines; $i++) {
            $data[$i][4] = ''; // remove o arquivo
            $data[$i][6] = strlen($data[$i][1]);
            $data[$i][7] = strlen($data[$i][5]);
        }
        return $data;
    }

    public function listTextTable() {
        $criteria = $this->getCriteria()->select('idPessoa,nome,dataNascimento,email,cpf');
        return $criteria;
    }

    public function listFuncionario() {
        $criteria = $this->getCriteria()->select('idPessoa,nome,dataNascimento,email,cpf, salario')->
                join('pessoa', 'funcionario', 'pessoa.idPessoa=funcionario.idPessoa', 'left');
        return $criteria;
    }

}

?>