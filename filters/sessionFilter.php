<?php

class SessionFilter extends MFilter {
    
    public function preProcess() {
        $frontController = $this->frontController; 
        // exemplo de alteração da configuração dependendo do controller sendo executado
        $context = $frontController->getContext();
        $controller = $context->getController();
        if ($controller == 'controls') {
            Manager::setConf('session.check', false);
        }
        // é necessário validar a sessão?
        if (Manager::getConf('login.check') || Manager::getConf('session.check')) {
            $timeout = Manager::getSession()->checkTimeout(Manager::getConf('session.exception'));
        }
        if ($timeout) {
            $frontController->canCallHandler(false);
            $url = Manager::getURL(Manager::getApp() . '/main');
            $frontController->setResult(new MRedirect(NULL, $url));
        }
    }
}



?>