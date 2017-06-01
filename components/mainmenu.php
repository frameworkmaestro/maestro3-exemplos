<?php

class MainMenu extends MAccordion {

    public function onCreate() {
        parent::onCreate();
        $this->setId('exemplosMainMenu');

        $actions = Manager::getActions('exemplos');
        foreach ($actions as $i => $group) {
            $baseGroup = new MBaseGroup("menu{$i}", $group[0]);
            $baseGroup->setFieldSet(false);

            $tree = new MTree("tree{$i}");
            $groupActions = $group[5];
            $array = array();
            foreach($groupActions as $j => $action){
                $array[] = array($j, $action[0], $action[1], 'root');
            }
            $tree->setItemsFromArray($array);

            $baseGroup->addControl($tree);
            $this->addControl($baseGroup);
        }
    }

}

?>