<?php

use exemplos\models\DocumentoTeste;
use exemplos\models\PessoaTeste;
use exemplos\repositories\DocumentoTesteRepository;

class PessoaDocumentoService extends \MService {

	private $documentos;

	public function __construct() {
		parent::__construct();

		$this->documentos = new DocumentoTesteRepository;
	}

	public function saveDocumentoPessoa(PessoaTeste $pessoa, DocumentoTeste $documento) {
		$transaction = $documento->beginTransaction();

		try {
			if (!$pessoa->podeAdicionarDocumento() && !$documento->isPersistent()) {
				throw new \Exception("Não é possível cadastrar mais documentos para essa pessoa!");
			}

			$documento->setIdPessoaTeste($pessoa->getId());
			$this->documentos->add($documento);

			$transaction->commit();
		} catch (\Exception $e) {
			$transaction->rollback();

			throw $e;
		}
	}

}