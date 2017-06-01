<?php
/**
 * @category   Maestro
 * @package    UFJF
 * @subpackage siga3
 * @copyright  Copyright (c) 2003-2013 UFJF (http://www.ufjf.br)
 * @license    http://siga.ufjf.br/license
 * @version
 * @since
 */

// wizard - code section created by Wizard Module

namespace exemplos\models\map;

class PessoatesteMap extends \MBusinessModel {

    
    public static function ORMMap() {

        return array(
            'class' => \get_called_class(),
            'database' => 'exemplos',
            'table' => 'PessoaTeste',
            'attributes' => array(
                'idPessoaTeste' => array('column' => 'idPessoaTeste','key' => 'primary','idgenerator' => 'seq_PessoaTeste','type' => 'integer'),
                'nome' => array('column' => 'nome','type' => 'string'),
                'numeroMaximoDocumentos' => array('column' => 'numeroMaximoDocumentos','type' => 'integer'),
            ),
            'associations' => array(
                'documentos' => array('toClass' => 'exemplos\models\documentoteste', 'cardinality' => 'oneToMany' , 'keys' => 'idPessoaTeste:idPessoaTeste'), 
            )
        );
    }
    
    /**
     * 
     * @var integer 
     */
    protected $idPessoaTeste;
    /**
     * 
     * @var string 
     */
    protected $nome;
    /**
     * 
     * @var integer 
     */
    protected $numeroMaximoDocumentos;

    /**
     * Associations
     */
    protected $documentos;
    

    /**
     * Getters/Setters
     */
    public function getIdPessoaTeste() {
        return $this->idPessoaTeste;
    }

    public function setIdPessoaTeste($value) {
        $this->idPessoaTeste = $value;
    }

    public function getNome() {
        return $this->nome;
    }

    public function setNome($value) {
        $this->nome = $value;
    }

    public function getNumeroMaximoDocumentos() {
        return $this->numeroMaximoDocumentos;
    }

    public function setNumeroMaximoDocumentos($value) {
        $this->numeroMaximoDocumentos = $value;
    }
    /**
     *
     * @return Association
     */
    public function getDocumentos() {
        if (is_null($this->documentos)){
            $this->retrieveAssociation("documentos");
        }
        return  $this->documentos;
    }
    /**
     *
     * @param Association $value
     */
    public function setDocumentos($value) {
        $this->documentos = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationDocumentos() {
        $this->retrieveAssociation("documentos");
    }

    

}
// end - wizard

?>