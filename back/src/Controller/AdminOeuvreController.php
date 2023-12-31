<?php
namespace App\Controller;

use App\Encoder\MultipartDecoder;
use App\Entity\Oeuvre;
use App\Form\AjouterType;
use App\Repository\CategorieRepository;
use App\Repository\MatiereRepository;
use App\Repository\OeuvreRepository;
use App\Serializer\UploadedFileDenormalizer;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Mapping\Entity;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncode;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
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
     * @Route("/{id}", name="admin_show", methods={"GET"})
     */
    public function show($id)
    {
     // Récupérer l'entité Oeuvre par son ID depuis la base de données
     $oeuvre = $this->getDoctrine()->getRepository(Oeuvre::class)->find($id);

     // Si l'œuvre n'est pas trouvée, retourner une réponse JSON appropriée
     if (!$oeuvre) {
         return new JsonResponse(['message' => 'Oeuvre non trouvée'], 404);
     }

     // Convertir l'entité Oeuvre en tableau ou objet que vous souhaitez retourner
     $data = [
         'id' => $oeuvre->getId(),
         'titre' => $oeuvre->getTitre(),
         'description' => $oeuvre->getDescription(),
         // Ajoutez d'autres champs selon votre modèle Oeuvre
     ];

     // Retourner une réponse JSON avec les détails de l'œuvre
     return $this->json($data);
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
        isset($data['image'])&&
     
        isset($data['categories']) &&
        isset($data['matieres'])
    ) {
        // Création d'une nouvelle instance de l'entité Oeuvre
        $oeuvre = new Oeuvre();
        $oeuvre->setTitre($data['titre']);
        $oeuvre->setDescription($data['description']);
        $oeuvre->setImage($data['image']);

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


          // Gestion du fichier image
          if ($request->files->has('image')) {
            /** @var UploadedFile $imageFile */
            //recuperation de image dans champs react image de formdata
            $imageFile = $request->files->get('image');
            $newFileName = md5(uniqid()) . '.' . $imageFile->getClientOriginalExtension();

            try {
                // Déplacez le fichier vers le répertoire où vous souhaitez le stocker
                $imageFile->move($this->getParameter('image_oeuvre_directory') . '/' . $newFileName);

                // Mettez à jour le nom du fichier dans votre entité
                $oeuvre->setImage($newFileName);
            } catch (FileException $e) {
                // Gérez l'erreur de téléchargement
                return $this->json(['message' => 'Erreur lors du téléchargement de l\'image'], 500);
            }
        } else {
            // Aucun fichier image n'a été fourni
            return $this->json(['message' => 'L\'image est requise'], 400);
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

 /**
     * @Route("/{id}", name="edit", methods={"PUT"})
     */
    public function editOeuvre(int $id, Request $request, SerializerInterface $serializer, ValidatorInterface $validator): JsonResponse
    {
        // Récupérer l'œuvre à partir de la base de données
        $oeuvre = $this->getDoctrine()->getRepository(Oeuvre::class)->find($id);

        // Si l'œuvre n'est pas trouvée, retourner une réponse 404
        if (!$oeuvre) {
            return $this->json(['message' => 'Œuvre non trouvée.'], 404);
        }

        // Désérialiser les données de la requête dans l'entité Oeuvre
        $data = json_decode($request->getContent(), true);

        // Appliquer les données désérialisées à l'entité Oeuvre
        $serializer->deserialize(
            $request->getContent(),
            Oeuvre::class,
            'json',
            [AbstractNormalizer::OBJECT_TO_POPULATE => $oeuvre]
        );

        // Valider l'entité Oeuvre
        $errors = $validator->validate($oeuvre);

        // S'il y a des erreurs de validation, retourner une réponse 400 avec les erreurs
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[] = $error->getMessage();
            }

            return $this->json(['errors' => $errorMessages], 400);
        }

        // Enregistrer les modifications en base de données
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->flush();

        // Retourner une réponse 200 OK avec l'œuvre mise à jour
        return $this->json(['message' => 'Œuvre mise à jour avec succès.', 'data' => $oeuvre], 200);
    }

}
