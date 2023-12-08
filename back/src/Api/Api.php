<?php

namespace App\Api;




class OeuvreReferenceUploadModel{

    private $datad ;
    private $decodedData;

    public function setData(?string $datad)
    {


        $this->datad=$datad;
        $this->decodedData=base64_decode($datad);
    }


    public function getdecodedData():string
    {
return $this->decodedData;
    }
}