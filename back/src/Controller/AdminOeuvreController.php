<?php
namespace App\Controller;

use App\Encoder\MultipartDecoder;
use App\Entity\Oeuvre;
use App\Form\AjouterType;
use App\Repository\CategorieRepository;
use App\Repository\MatiereRepository;
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
      return $this->json($oeuvreRepo->findAll(),200);
    }


    /**
 * @Route("/", name="admin_ajouter", methods={"POST"})
 */
public function ajouter(Request $request,MatiereRepository $matierepo,EntityManagerInterface $entityManager,CategorieRepository $categoryrepo):Response
{   // Récupération des données JSON de la requête
    $data = json_decode($request->getContent(), true);
    // Vérification de la présence des champs requis
    if (
        isset($data['titre']) &&
        isset($data['description'])&&
        isset($data['image']) &&
        isset($data['categories']) &&
        isset($data['matieres'])
    ) {
        // Création d'une nouvelle instance de l'entité Oeuvre
        $oeuvre = new Oeuvre();
        $oeuvre->setTitre($data['titre']);
        $oeuvre->setDescription($data['description']);

         // Gérer les relations "categories" et "matieres"
         foreach ($data['categories'] as $categorieId) {
            $categorie = $categoryrepo->find($categorieId);
            if ($categorie) {
                $oeuvre->addCategory($categorie);
            }
        }

        foreach ($data['matieres'] as $matiereId) {
            $matiere = $matierepo->find($matiereId);
            if ($matiere) {
                $oeuvre->addMatiere($matiere);
            }
        }
      

        // Enregistrement de l'objet Oeuvre en base de données
        $entityManager->persist($oeuvre);
        $entityManager->flush();

        return $this->json(['message' => 'L\'oeuvre a été créée avec succès'], 201);
    } else {
        return $this->json(['message' => 'Les données sont incomplètes'], 400);
    }


}

/**
 * @Route("/{id}", name="admin_sup", methods={"DELETE"})
 */

 public function deleteOeuvre(Oeuvre $oeuvre,EntityManagerInterface $em): JsonResponse
 {
    $em->remove($oeuvre);
    $em->flush();

    return new JsonResponse(null, Response::HTTP_NO_CONTENT);
 }

 
}
