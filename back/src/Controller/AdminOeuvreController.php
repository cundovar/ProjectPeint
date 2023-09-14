<?php
namespace App\Controller;


use App\Entity\Oeuvre;
use App\Form\AjouterType;
use App\Repository\OeuvreRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
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
    private $validator;

    public function __construct(ValidatorInterface $validator)
    {
        $this->validator=$validator;
    }
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
public function ajouter(Request $request, EntityManagerInterface $manager, SerializerInterface $serializer)
{
    try {
        $data = json_decode($request->getContent());

        if (
            isset($data->titre) &&
            isset($data->description) &&
            isset($data->categories) &&
            isset($data->matieres) &&
            isset($data->image)
        ) {
            $oeuvre = new Oeuvre();
            $oeuvre->setTitre($data->titre);
            $oeuvre->setDescription($data->description);
            $oeuvre->setImage($data->image);

            foreach ($data->categories as $category) {
                $oeuvre->addCategory($category);
            }

            foreach ($data->matieres as $matiere) {
                $oeuvre->addMatiere($matiere);
            }

            $manager->persist($oeuvre);
            $manager->flush();

            return new JsonResponse(['message' => 'L\'oeuvre a été ajoutée avec succès'], JsonResponse::HTTP_CREATED);
        } else {
            return new JsonResponse(['message' => 'Données JSON incomplètes'], JsonResponse::HTTP_BAD_REQUEST);
        }
    } catch (\JsonException $e) {
        return new JsonResponse(['message' => 'Erreur JSON : ' . $e->getMessage()], JsonResponse::HTTP_BAD_REQUEST);
    } catch (\Exception $e) {
        // Gérez d'autres exceptions ici, par exemple des exceptions liées à la base de données.
        return new JsonResponse(['message' => 'Une erreur s\'est produite : ' . $e->getMessage()], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
    }
}


    }
