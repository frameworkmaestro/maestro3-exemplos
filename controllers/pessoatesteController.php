<?php
/**
 * $_comment
 *
 * @category   Maestro
 * @package    UFJF
 * @subpackage $_package
 * @copyright  Copyright (c) 2003-2012 UFJF (http://www.ufjf.br)
 * @license    http://siga.ufjf.br/license
 * @version
 * @since
 */

use \exemplos\models\DocumentoTeste;
use \exemplos\models\PessoaTeste;
use \exemplos\repositories\DocumentoTesteRepository;
use \exemplos\repositories\PessoaTesteCacheRepository;
use \exemplos\repositories\PessoaTesteRepository;

class PessoatesteController extends MController {

	private $pessoas;
	private $pessoasCache;
	private $documentos;

	public function __construct() {
		parent::__construct();

		$this->pessoas = new PessoaTesteRepository;
		$this->pessoasCache = PessoaTesteCacheRepository::getInstance();
		$this->documentos = new DocumentoTesteRepository;
	}

	public function main() {
		$this->render("formBase");
	}

	private function getIsSet() {
		for ($i = -3; $i < 3; $i++) {
			$isset = isset($this->pessoas[$i]);
			$is = var_export($isset, true);
			$result[] = 'isset($this->pessoas[' . $i . "]) = {$is}";
		}

		return implode('<br /> ', $result);
	}

	public function formFind() {
		try {
			$this->data->query = $this->pessoas->listByFilter($this->data->filter)->asQuery();
			$this->data->count = 'count($this->pessoas) = ' . count($this->pessoas);
			$this->data->countCache = 'sizeof($this->pessoasCache) = ' . sizeof($this->pessoasCache);
			$this->data->isset = $this->getIsSet();
			$this->render();
		} catch (\Exception $e) {
			$this->renderPrompt('error', $e->getMessage());
		}
	}

	public function formDocumentoFind() {
		$pessoateste = new PessoaTeste($this->data->id);
		$this->data->pessoateste = $pessoateste->getData();
		$this->data->query = $this->documentos->listByPessoa($pessoateste)->asQuery();
		$this->render();
	}

	public function formDocumentoNew() {
		$pessoateste = new PessoaTeste($this->data->id);
		$this->data->pessoateste = $pessoateste->getData();
		$this->render();
	}

	public function formNew() {
		$this->data->action = '@pessoateste/save';
		$this->render();
	}

	public function formObject() {
		$this->data->pessoateste = PessoaTeste::create($this->data->id)->getData();
		$this->render();
	}

	public function formUpdate() {
		$pessoateste = new PessoaTeste($this->data->id);
		$this->data->pessoateste = $pessoateste->getData();

		$this->data->action = '@pessoateste/save/' . $this->data->id;
		$this->render();
	}

	public function formDelete() {
		$pessoateste = new PessoaTeste($this->data->id);
		$ok = '>pessoateste/delete/' . $pessoateste->getId();
		$cancelar = '>pessoateste/formObject/' . $pessoateste->getId();
		$this->renderPrompt('confirmation', "Confirma remoção de {$pessoateste->getDescription()}?", $ok, $cancelar);
	}

	public function formDocumentoDelete() {
		$documento = new DocumentoTeste($this->data->id);
		$ok = '>pessoateste/deleteDocumento/' . $documento->getId();
		$cancelar = '>pessoateste/formDocumentoFind/' . $documento->getIdPessoaTeste();
		$this->renderPrompt('confirmation', "Confirma remoção do {$documento->getDescription()}?", $ok, $cancelar);
	}

	public function lookup() {
		$filter->idPessoaTeste = $this->data->idPessoaTeste;
		$this->data->query = $this->pessoas->listByFilter($filter)->asQuery();
		$this->render();
	}

	public function save() {
		try {
			$pessoateste = new PessoaTeste($this->data->pessoateste);
			$this->pessoas->add($pessoateste);

			$go = '>pessoateste/formUpdate/' . $pessoateste->getId();
			$this->renderPrompt('information', 'OK', $go);
		} catch (\Exception $e) {
			$this->renderPrompt('error', $e->getMessage(), $go);
		}
	}

	public function save2() {
		try {
			$pessoateste = new PessoaTeste($this->data->pessoateste);
			$repo = new PessoaTesteRepository;
			$repo->add($pessoateste);
			// (new PessoaTesteRepository)->add($pessoateste);

			$go = '>pessoateste/formUpdate/' . $pessoateste->getId();
			$this->renderPrompt('information', 'OK', $go);
		} catch (\Exception $e) {
			$this->renderPrompt('error', $e->getMessage(), $go);
		}
	}

	// public function save3() {
	// 	try {
	// 		$pessoateste = new PessoaTeste($this->data->pessoateste);
	// 		$repo = new PessoaTesteRepository($pessoateste);
	// 		$repo->add();
	// 		// (new PessoaTesteRepository($pessoateste))->add();

	// 		$go = '>pessoateste/formUpdate/' . $pessoateste->getId();
	// 		$this->renderPrompt('information', 'OK', $go);
	// 	} catch (\Exception $e) {
	// 		$this->renderPrompt('error', $e->getMessage(), $go);
	// 	}
	// }

	// public function saveGetRepositoryModel() {
	// 	try {
	// 		$pessoateste = new PessoaTeste($this->data->pessoateste);
	// 		$pessoateste->getRepository()->add();

	// 		$go = '>pessoateste/formUpdate/' . $pessoateste->getId();
	// 		$this->renderPrompt('information', 'OK', $go);
	// 	} catch (\Exception $e) {
	// 		$this->renderPrompt('error', $e->getMessage(), $go);
	// 	}
	// }

	public function saveVariosSemCache() {
		try {
			// $pessoateste1 = new PessoaTeste($this->data->pessoateste->idPessoaTeste);
			$pessoateste1 = $this->pessoas->get($this->data->pessoateste->idPessoaTeste);
			$pessoateste1->setNome($this->data->pessoateste->nome);

			$this->pessoas->add($pessoateste1);

			// $pessoateste2 = new PessoaTeste($this->data->pessoateste->idPessoaTeste);
			$pessoateste2 = $this->pessoas[$this->data->pessoateste->idPessoaTeste];
			$pessoateste2->setNumeroMaximoDocumentos($this->data->pessoateste->numeroMaximoDocumentos);

			$this->pessoas[] = $pessoateste2;

			// 2 selects + 2 inserts/updates

			$go = '>pessoateste/formUpdate/' . $pessoateste2->getId();
			$this->renderPrompt('information', 'OK', $go);
		} catch (\Exception $e) {
			$this->renderPrompt('error', $e->getMessage(), $go);
		}
	}

	public function saveVariosComCache() {
		try {
			$pessoateste1 = $this->pessoasCache->get($this->data->pessoateste->idPessoaTeste);
			$pessoateste1->setNome($this->data->pessoateste->nome);

			$this->pessoas->add($pessoateste1);

			$pessoateste2 = $this->pessoasCache->get($this->data->pessoateste->idPessoaTeste);
			$pessoateste2->setNumeroMaximoDocumentos($this->data->pessoateste->numeroMaximoDocumentos);

			$this->pessoas->add($pessoateste2);

			// 1 select + 2 inserts/updates

			$go = '>pessoateste/formUpdate/' . $pessoateste2->getId();
			$this->renderPrompt('information', 'OK', $go);
		} catch (\Exception $e) {
			$this->renderPrompt('error', $e->getMessage(), $go);
		}
	}

	public function saveDocumento() {
		try {
			$pessoateste = new PessoaTeste($this->data->pessoateste);
			$documento = new DocumentoTeste($this->data->documento);

			$pessoaDocumentoService = $this->getService('pessoaDocumento');
			$pessoaDocumentoService->saveDocumentoPessoa($pessoateste, $documento);

			$go = '>pessoateste/formDocumentoFind/' . $documento->getIdPessoaTeste();
			$this->renderPrompt('information', 'OK', $go);
		} catch (Exception $e) {
			$this->renderPrompt('error', $e->getMessage());
		}
	}

	public function delete() {
		$pessoateste = new PessoaTeste($this->data->id);
		$this->pessoas->remove($pessoateste);
		$go = '>pessoateste/formFind';
		$this->renderPrompt('information', "{$pessoateste->getDescription()} removido com sucesso", $go);
	}

	public function deleteDocumento() {
		try {
			$documento = $this->documentos[$this->data->id];
			// $this->documentos->remove($documento);
			unset($this->documentos[$this->data->id]);
			$go = ">pessoateste/formDocumentoFind/{$documento->getIdPessoaTeste()}";
			$this->renderPrompt('information', "{$documento->getDescription()} removido com sucesso", $go);
		} catch (Exception $e) {
			$this->renderPrompt('error', $e->getMessage());
		}
	}

	public function limparBancoInserir500Pessoas() {
		try {
			foreach ($this->pessoas as $pessoa) {
				$this->pessoas->remove($pessoa);
			}

			for ($i = 1; $i < 501; ++$i) {
				$data->nome = "Pessoa{$i}";
				$data->numeroMaximoDocumentos = "$i";
				$pessoa = PessoaTeste::create($data);
				$this->pessoas[] = $pessoa;
			}

			$go = ">pessoateste/formFind";
			$this->renderPrompt('information', '500 pessoas inseridas!', $go);
		} catch (Exception $e) {
			$this->renderPrompt('error', $e->getMessage());
		}
	}

	private function benchmark(Closure $functionToMeasure, $description) {
		$mem_empty = memory_get_usage();
		$start = microtime(TRUE);

		$functionToMeasure();

		$finis = microtime(TRUE);
		$mem_final = memory_get_usage();

		$time = $finis - $start;
		$mem = $mem_final - $mem_empty;

		$this->flush(sprintf("<b>{$description}:\nTime:</b> %0.6f milisegundos.\n<b>Memory:</b> %d bytes\n\n<br />", $time * 1000, $mem));
		// printf("{$description}:\nTime: %0.6f ms.\nMemory: %d\n\n<br />", $time * 1000, $mem);
	}

	public function benchmarkForeach() {
		$this->flush(sprintf("Foreach<br /><br />"));

		// foreach direcly from model
		$foreachModel = function () {
			foreach (PessoaTeste::create()->listAll()->asCursor()->getObjects() as $key => $value);
		};

		// foreach from database repository
		$foreachDatabase = function () {
			foreach ($this->pessoas as $key => $value);
		};

		// foreach from cache repository
		$foreachCache = function () {
			foreach ($this->pessoasCache as $key => $value);
		};

		// sleep(1);
		$this->benchmark($foreachModel, "Model");
		// sleep(1);
		$this->benchmark($foreachDatabase, "Database Repository");
		// sleep(1);
		$this->benchmark($foreachCache, "Cache Repository");
		// sleep(1);
	}

	public function benchmarkRead($readNTimes) {
		$this->flush(sprintf("Leitura {$readNTimes} vezes <br /><br />"));

		// read direcly from model
		$readModel = function () use ($readNTimes) {
			for ($i = 0; $i < $readNTimes; ++$i) {
				$pessoa = PessoaTeste::create(2);
			}
		};

		// read from database repository
		$readDatabase = function () use ($readNTimes) {
			for ($i = 0; $i < $readNTimes; ++$i) {
				$pessoa = $this->pessoas->get(2);
			}
		};

		// read from cache repository
		$readCache = function () use ($readNTimes) {
			for ($i = 0; $i < $readNTimes; ++$i) {
				$pessoa = $this->pessoasCache->get(2);
			}
		};

		// sleep(1);
		$this->benchmark($readModel, "Model");
		// sleep(1);
		$this->benchmark($readDatabase, "Database Repository");
		// sleep(1);
		$this->benchmark($readCache, "Cache Repository");
		// sleep(1);
	}

	public function benchmarkWrite() {
		$this->flush(sprintf("Escrita<br /><br />"));

		$pessoa = $this->pessoas[2];

		// read direcly from model
		$writeModel = function () use ($pessoa) {
			$pessoa->save();
		};

		// read from database repository
		$writeDatabase = function () use ($pessoa) {
			$this->pessoas->add($pessoa);
		};

		// read from cache repository
		$writeCache = function () use ($pessoa) {
			$this->pessoasCache->add($pessoa);
		};

		// sleep(1);
		$this->benchmark($writeModel, "Model");
		// sleep(1);
		$this->benchmark($writeDatabase, "Database Repository");
		// sleep(1);
		$this->benchmark($writeCache, "Cache Repository");
		// sleep(1);
	}

	public function formBenchmark() {
		$this->prepareFlush();

		$this->benchmarkRead(5);
		$this->flush(sprintf("<br /><br />"));
		$this->benchmarkForeach();
		$this->flush(sprintf("<br /><br />"));
		$this->benchmarkWrite();
	}

}