<?php

namespace App\Controller;

use App\Entity\Oeuvre;
use Symfony\Component\HttpFoundation\Request;

class PostImageController
{
    public function __invoke(Request $request)
    {

        $oeuvre=$request->attributes->get('data');
        $file=$request->files->get('file');
        $oeuvre->setImage($request->files->get('file'));
        $oeuvre->setDateAt(new \DateTime());
        return $oeuvre;
    }
}
