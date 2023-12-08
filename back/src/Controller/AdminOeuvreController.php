<?php
namespace App\Controller;

use App\Encoder\MultipartDecoder;
use App\Entity\Oeuvre;
use App\Form\AjouterType;
use App\Repository\OeuvreRepository;
use App\Serializer\UploadedFileDenormalizer;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncode;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * @Route("/admin/oeuvre")
 *
 */
class AdminOeuvreController extends AbstractController
{

    /**
     * @Route("/", name="admin_index", methods={"GET"})
     */
    public function index(OeuvreRepository $oeuvreRepo)
    {
      return $this->json($oeuvreRepo->findAll(),200,['groups'=>'read:article']);
    }


    /**
 * @Route("/", name="admin_ajouter", methods={"POST"})
 */
public function ajouter(Request $request,EntityManagerInterface $entityManager):JsonResponse
{   // Récupération des données JSON de la requête
    $data = json_decode($request->getContent(), true);
    // Vérification de la présence des champs requis
    if (
        isset($data['titre']) &&
        isset($data['description'])
    ) {
        // Création d'une nouvelle instance de l'entité Oeuvre
        $oeuvre = new Oeuvre();
        $oeuvre->setTitre($data['titre']);
        $oeuvre->setDescription($data['description']);

     
      

        // Enregistrement de l'objet Oeuvre en base de données
        $entityManager->persist($oeuvre);
        $entityManager->flush();

        return $this->json(['message' => 'L\'oeuvre a été créée avec succès'], 201);
    } else {
        return $this->json(['message' => 'Les données sont incomplètes'], 400);
    }


}

 
}
