<?php
// Diretorio do script corrente
$dir = dirname(__FILE__);

// Path do Maestro
$dir = strstr($dir,"maestro",true) . "maestro";

// Configuração para tratamento de erros
ini_set("error_reporting", E_ALL & ~E_NOTICE & ~E_DEPRECATED & ~E_STRICT);
ini_set("log_errors","on");
ini_set("error_log", $dir . "core/var/log/php_error.log");

// Inclusão do framework
$conf = $dir.'/core/conf/conf.php';
require_once($dir . '/core/classes/manager.php');
set_error_handler('Manager::errorHandler'); 

// Endereco do servico a ser executado
$_SERVER['REQUEST_URI'] = $_SERVER['SCRIPT_NAME'] . 'exemplos/data/dadosPessoaByNome';

// Inicialização do framework
Manager::init($conf, $dir);

?>