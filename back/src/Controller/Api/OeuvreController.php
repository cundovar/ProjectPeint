<?php

// src/Controller/Api/OeuvreController.php

namespace App\Controller\Api;

use App\Entity\Oeuvre;
use App\Service\FileUpLoader;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;

/**
 * @Route("/api", name="api_")
 */



