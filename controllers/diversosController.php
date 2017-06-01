<?php

class DiversosController extends MController {

    public function formBackground() {
        $this->render();
    }

    public function formBackgroundExecute() {
        $this->data->background = Manager::getURL('diversos/background');
        $this->render();
    }

    public function background() {
        $this->prepareFlush();
        for($i=1;$i < 15;$i++){
            $this->data->idContainer = 'container'.$i;
            $this->data->message = 'Teste'.$i."\n";
            $this->renderFlush();
// alternativa para output de texto puro: $this->flush($this->data->message);
            sleep(1);
        }
    }
    
    public function formEmail() 
    {
        if(\Manager::getConf('mailer.smtpFrom'))
        {
            $this->data->desricaoConfFrom = '(' . \Manager::getConf('mailer.smtpFrom') . ')';
        }
        if(\Manager::getConf('mailer.smtpTo'))
        {
            $this->data->desricaoConfTo = '(' . \Manager::getConf('mailer.smtpTo') . ')';
        }
        
        $this->render();
    }
    
    public function formEmailEnviar()
    {
        // Os parametros dos destinatarios (to, cc e bcc) podem ser um array ou uma lista de emails separados por vírgula
        $params->to = $this->data->destinatario;
        $params->cc = $this->data->cc;
        $params->bcc = $this->data->bcc;
        
        $params->Subject = $this->data->assunto;
        
        $params->Body = $this->data->corpo;
        
        //Para a formatação com HTML
        $params->isHTML = true;
        
        // Remetente padrao \Manager::getConf('mailer.smtpFrom')
        if($this->data->remetente)
        {
            $params->From = $this->data->remetente;
        }
        
        $success = MMailer::send($params);
        
        if($success)
        {
            $this->renderPrompt('information', "Email enviado com sucesso");
        }
        else
        {
            $this->renderPrompt('error', "Tentativa de envio de email falhou");
        }
    }

    public function formPhpLot(){
        $this->data->tipoLotOpt = array(   
                                            'area'=> 'Área',
                                            'bars' => 'Barras Horizontais', 
                                            'stackedbars' => 'Barras Verticais',
                                            'bubbles' => 'Bolhas',
                                            'linepoints' => 'Linha com Pontos',
                                            'pie' => 'Pizza',
                                            'points' => 'Pontos',
                                            'thinbarline' =>'thinbarline',
                                            );
        $this->renderLot();
        $this->render();
    }

    public function renderLot(){
        $grafico = new PHPlot(800,600); 
        $grafico->SetFileFormat("jpg");
        $grafico->SetIsInline(True); 
        #Indicamos o títul do gráfico e o título dos dados no eixo X e Y do mesmo 
        $grafico->SetTitle($this->data->titulo); 
        $grafico->SetXTitle($this->data->eixoX); 
        $grafico->SetYTitle($this->data->eixoY); 
        
        #passamos o tipo de gráfico escolhido
        if(!$this->data->tipoLot)
            $this->data->tipoLot = 'bars';
        $grafico->SetPlotType($this->data->tipoLot);

        switch ($this->data->tipoLot) {
            case 'pie':
                $grafico->SetPieLabelType('index', 'custom', 'mycallback');
                $grafico->SetDataType('text-data-single'); 
                break;
            case 'stackedbars':
                $grafico->SetDataType('text-data-yx'); 
                break;
            case 'bubbles':
                $grafico->SetDataType('data-data-xyz');
                break;
           
        }
        $grafico->SetLegend($column_names);
        
        #Definimos os dados do gráfico
        switch ($this->data->tipoLot) {
            case 'pie':  
                $dados = array( array($this->data->x1, $this->data->y11),
                                array($this->data->x2, $this->data->y21),
                                array($this->data->x3, $this->data->y31),
                                array($this->data->x4, $this->data->y41)
                            ); 
                break;
            default:
                $dados = array( array($this->data->x1, $this->data->y11, $this->data->y12, $this->data->y13),
                                array($this->data->x2, $this->data->y21, $this->data->y22, $this->data->y23),
                                array($this->data->x3, $this->data->y31, $this->data->y32, $this->data->y33),
                                array($this->data->x4, $this->data->y41, $this->data->y42, $this->data->y43)
                            );
                break;
        }
        $grafico->SetDataValues($dados); 
        
        #Salvamos o gráfico
        $caminho = \Manager::getFilesPath();
        $fileName = uniqid().'.jpg';
        $grafico->SetOutputFile($caminho.'/'.$fileName );
        $grafico->SetIsInline(True);
        $grafico->DrawGraph();
        #obtemos o endereco do grafico
        $this->data->locate = \Manager::getDownloadURL('files', basename($fileName), true);
        
    }
    
}

?>