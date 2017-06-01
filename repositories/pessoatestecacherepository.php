<?php

namespace exemplos\repositories;

class PessoaTesteCacheRepository extends \MCacheRepository {

	public function init() {
		$this->setInnerRepository(new PessoaTesteRepository);
	}

}