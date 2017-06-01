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

class DocumentotesteMap extends \MBusinessModel {

    
    public static function ORMMap() {

        return array(
            'class' => \get_called_class(),
            'database' => 'exemplos',
            'table' => 'DocumentoTeste',
            'attributes' => array(
                'idDocumentoTeste' => array('column' => 'idDocumentoTeste','key' => 'primary','idgenerator' => 'seq_DocumentoTeste','type' => 'integer'),
                'nome' => array('column' => 'nome','type' => 'string'),
                'numero' => array('column' => 'numero','type' => 'string'),
                'idPessoaTeste' => array('column' => 'idPessoaTeste','key' => 'foreign','type' => 'integer'),
            ),
            'associations' => array(
                'pessoa' => array('toClass' => 'exemplos\models\pessoateste', 'cardinality' => 'oneToOne' , 'keys' => 'idPessoaTeste:idPessoaTeste'), 
            )
        );
    }
    
    /**
     * 
     * @var integer 
     */
    protected $idDocumentoTeste;
    /**
     * 
     * @var string 
     */
    protected $nome;
    /**
     * 
     * @var string 
     */
    protected $numero;
    /**
     * 
     * @var integer 
     */
    protected $idPessoaTeste;

    /**
     * Associations
     */
    protected $pessoa;
    

    /**
     * Getters/Setters
     */
    public function getIdDocumentoTeste() {
        return $this->idDocumentoTeste;
    }

    public function setIdDocumentoTeste($value) {
        $this->idDocumentoTeste = $value;
    }

    public function getNome() {
        return $this->nome;
    }

    public function setNome($value) {
        $this->nome = $value;
    }

    public function getNumero() {
        return $this->numero;
    }

    public function setNumero($value) {
        $this->numero = $value;
    }

    public function getIdPessoaTeste() {
        return $this->idPessoaTeste;
    }

    public function setIdPessoaTeste($value) {
        $this->idPessoaTeste = $value;
    }
    /**
     *
     * @return Association
     */
    public function getPessoa() {
        if (is_null($this->pessoa)){
            $this->retrieveAssociation("pessoa");
        }
        return  $this->pessoa;
    }
    /**
     *
     * @param Association $value
     */
    public function setPessoa($value) {
        $this->pessoa = $value;
    }
    /**
     *
     * @return Association
     */
    public function getAssociationPessoa() {
        $this->retrieveAssociation("pessoa");
    }

    

}
// end - wizard

?>