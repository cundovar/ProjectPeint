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
    public function index(OeuvreRepository $oeuvreRepo): Response
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

        return $this->json($data);
    }


    
    /**
     * @Route("/ajouter", name="admin_ajouter", methods={"GET","POST"})
     */
    public function ajouter(Request $request,EntityManagerInterface $manager)
    {
        $data=json_decode($request->getContent(),true);
           

        if (
            isset($data['titre'])&&
            isset($data['description'])&&
            isset($data['categories'])&&
            isset($data['matieres'])&&
            isset($data['image'])
        )
        {

            $oeuvre=new Oeuvre();
     
            $oeuvre->setTitre($data['titre']);
            $oeuvre->setDescription($data['description']);
            $oeuvre->setImage($data['image']);
     
            foreach ($data['categories'] as $category){
             $oeuvre->addCategory($category);
            }
            foreach ($data['matieres'] as $matiere){
             $oeuvre->addMatiere($matiere);
            }
     
            $manager->persist($oeuvre);
            $manager->flush();
     
              
            return new JsonResponse(['message' => 'L\'oeuvre a été ajoutée avec succès'], JsonResponse::HTTP_CREATED);
        }else{
            return new JsonResponse(['message' => 'données json incomplète'], JsonResponse::HTTP_BAD_REQUEST);

        }

       }



    }
