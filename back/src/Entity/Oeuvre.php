<?php

namespace App\Entity;

use App\Repository\OeuvreRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiSubresource;
/**
 * @ApiResource(
 *     normalizationContext={"groups"={"api"}},
 *     denormalizationContext={"groups"={"api"}}
 *    
 *      
 * )   
 * 
 *  
 * )
 * @ORM\Entity(repositoryClass=OeuvreRepository::class)
 * 
    
 */
class Oeuvre
{


    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"api"})
     */
    private $id;

    /**
     * 
     * @ORM\Column(type="string", length=255)
     * @Groups({"api"})
     */
    private $titre;

  

  
    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     *@Groups({"api"})
     *
     */
    private $description;

    /**
     * @ORM\ManyToMany(targetEntity=Categorie::class, mappedBy="oeuvre")
     * 
     *  
     * @Groups({"api"})
     */
    private $categories;

    /**
     *@Groups({"api"})
     * @ORM\ManyToMany(targetEntity=Matiere::class, mappedBy="oeuvre")
     * 
     *  
     */
    private $matieres;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"api"})
     */
    private $image;




    /**
     * @Assert\File(
     *     maxSize = "5M",
     *     mimeTypes = {"image/jpeg", "image/png", "image/gif", "application/pdf", "application/x-pdf"},
     *     mimeTypesMessage = "Veuillez télécharger un fichier valide (JPG, PNG, GIF, PDF)"
     * )
     */
    private $imageFile;


 

    public function __construct()
    {
        $this->categories = new ArrayCollection();
        $this->matieres = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitre(): ?string
    {
        return $this->titre;
    }

    public function setTitre(string $titre): self
    {
        $this->titre = $titre;

        return $this;
    }


 



   

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection<int, Categorie>
     */
    public function getCategories(): Collection
    {
        return $this->categories;
    }

    public function addCategory(Categorie $category): self
    {
        if (!$this->categories->contains($category)) {
            $this->categories[] = $category;
            $category->addOeuvre($this);
        }

        return $this;
    }

    public function removeCategory(Categorie $category): self
    {
        if ($this->categories->removeElement($category)) {
            $category->removeOeuvre($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, Matiere>
     */
    public function getMatieres(): Collection
    {
        return $this->matieres;
    }

    public function addMatiere(Matiere $matiere): self
    {
        if (!$this->matieres->contains($matiere)) {
            $this->matieres[] = $matiere;
            $matiere->addOeuvre($this);
        }

        return $this;
    }

    public function removeMatiere(Matiere $matiere): self
    {
        if ($this->matieres->removeElement($matiere)) {
            $matiere->removeOeuvre($this);
        }

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): self
    {
        $this->image = $image;

        return $this;
    }

    public function getimageFile(): ?UploadedFile
    {
        return $this->imageFile;
    }

    public function setimageFile(?UploadedFile $imageFile): self
    {
        $this->imageFile = $imageFile;

        // Ajoutez votre logique ici pour gérer le téléchargement du fichier

        return $this;
    }

    
}
