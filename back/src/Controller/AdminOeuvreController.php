<?php
namespace App\Controller;


use App\Entity\Oeuvre;
use App\Repository\OeuvreRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


/**
 * @Route("/admin/oeuvre")
 *
 */
class AdminOeuvreController extends AbstractController
{
    /**
     * @Route("/", name="admin_index", methods={"GET"})
     */
    public function index(OeuvreRepository $oeuvreRepo): JsonResponse
    {
        $oeuvres = $oeuvreRepo->findAll();
        $data = [];

        foreach ($oeuvres as $oeuvre) {
            $data[] = [
                'id' => $oeuvre->getId(),
                'titre' => $oeuvre->getTitre(),
                'image' => $oeuvre->getImage(),
                'categorie' => $oeuvre->getCategories(),
                'commentaire' => $oeuvre->getCommentaire(),
            ];
        }

        return new JsonResponse($data);
    }
}