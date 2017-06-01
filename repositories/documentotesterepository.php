<?php

namespace exemplos\repositories;

use \exemplos\models\PessoaTeste;

class DocumentoTesteRepository extends \MRepository {

	public function listFind($filter) {
		return $this->listByFilter($filter)->orderBy('numero');
	}

	public function listByFilter($filter) {
		$criteria = $this->getCriteria()->select('*');

		return $this->applyCriteriaFilters($criteria, $filter);
	}

	public function listByPessoa(PessoaTeste $pessoa, $filter) {
		$filter->idPessoaTeste = $pessoa->getId();

		return $this->listFind($filter);
	}

	public function applyCriteriaFilters($criteria, $filter) {
		if ($filter->idDocumentoTeste) {
			$criteria->where("idDocumentoTeste", '=', $filter->idDocumentoTeste);
		}
		if ($filter->idPessoaTeste) {
			$criteria->where("idPessoaTeste", '=', $filter->idPessoaTeste);
		}
		if ($filter->numero) {
			$criteria->where("numero like upper('%{$filter->numero}%'");
		}

		return $criteria;
	}
}
