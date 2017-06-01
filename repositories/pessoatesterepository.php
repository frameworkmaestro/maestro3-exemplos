<?php

namespace exemplos\repositories;

class PessoaTesteRepository extends \MRepository {

	public function listFind($filter) {
		return $this->listByFilter($filter)->orderBy('nome');
	}

	public function listByFilter($filter) {
		$criteria = $this->getCriteria()->select('*');

		return $this->applyCriteriaFilters($criteria, $filter);
	}

	private function applyCriteriaFilters($criteria, $filter) {
		if ($filter->idPessoaTeste) {
			$criteria->where("idPessoaTeste", '=', $filter->idPessoaTeste);
		}
		if ($filter->nome) {
			$criteria->where("nome like upper('%{$filter->nome}%')");
		}
		if ($filter->numeroMaximoDocumentos) {
			$criteria->where("numeroMaximoDocumentos >= {$filter->numeroMaximoDocumentos}");
		}

		return $criteria;
	}
}
