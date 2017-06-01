<?php
/**
 *
 *
 * @category   Maestro
 * @package    UFJF
 * @subpackage siga3
 * @copyright  Copyright (c) 2003-2012 UFJF (http://www.ufjf.br)
 * @license    http://siga.ufjf.br/license
 * @version
 * @since
 */

namespace exemplos\models;

class PessoaTeste extends map\PessoatesteMap {

	public static function config() {
		return array(
			'log' => array('nome', 'numeroMaximoDocumentos'),
			'validators' => array(
				'nome' => array('notnull', 'notblank'),
				'numeroMaximoDocumentos' => array('notnull', 'notblank'),
			),
			'converters' => array(
				'nome' => array('upper'),
			),
		);
	}

	public function getDescription() {
		return $this->nome;
	}

    public function podeAdicionarDocumento()
    {
        return count($this->getDocumentos()) < $this->numeroMaximoDocumentos;
    }

}