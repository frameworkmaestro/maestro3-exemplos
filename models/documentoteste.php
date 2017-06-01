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

class DocumentoTeste extends map\DocumentotesteMap {

	public static function config() {
		return array(
			'log' => array('nome', 'numero'),
			'validators' => array(
				'nome' => array('notnull', 'notblank'),
				'numero' => array('notnull', 'notblank'),
			),
			'converters' => array(
				'nome' => array('upper'),
				'numero' => array('upper'),
			),
		);
	}

	public function getDescription() {
		return "Documento: {$this->nome} / nº: {$this->numero}";
	}

}

?>