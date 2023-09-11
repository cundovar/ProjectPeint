<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230911094530 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE categorie (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE categorie_oeuvre (categorie_id INT NOT NULL, oeuvre_id INT NOT NULL, INDEX IDX_B3D884C7BCF5E72D (categorie_id), INDEX IDX_B3D884C788194DE8 (oeuvre_id), PRIMARY KEY(categorie_id, oeuvre_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE matiere (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE matiere_oeuvre (matiere_id INT NOT NULL, oeuvre_id INT NOT NULL, INDEX IDX_151D0BE3F46CD258 (matiere_id), INDEX IDX_151D0BE388194DE8 (oeuvre_id), PRIMARY KEY(matiere_id, oeuvre_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE oeuvre (id INT AUTO_INCREMENT NOT NULL, titre VARCHAR(255) NOT NULL, image VARCHAR(255) NOT NULL, commentaire VARCHAR(255) DEFAULT NULL, description VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL, available_at DATETIME NOT NULL, delivered_at DATETIME DEFAULT NULL, INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE categorie_oeuvre ADD CONSTRAINT FK_B3D884C7BCF5E72D FOREIGN KEY (categorie_id) REFERENCES categorie (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE categorie_oeuvre ADD CONSTRAINT FK_B3D884C788194DE8 FOREIGN KEY (oeuvre_id) REFERENCES oeuvre (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE matiere_oeuvre ADD CONSTRAINT FK_151D0BE3F46CD258 FOREIGN KEY (matiere_id) REFERENCES matiere (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE matiere_oeuvre ADD CONSTRAINT FK_151D0BE388194DE8 FOREIGN KEY (oeuvre_id) REFERENCES oeuvre (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE categorie_oeuvre DROP FOREIGN KEY FK_B3D884C7BCF5E72D');
        $this->addSql('ALTER TABLE categorie_oeuvre DROP FOREIGN KEY FK_B3D884C788194DE8');
        $this->addSql('ALTER TABLE matiere_oeuvre DROP FOREIGN KEY FK_151D0BE3F46CD258');
        $this->addSql('ALTER TABLE matiere_oeuvre DROP FOREIGN KEY FK_151D0BE388194DE8');
        $this->addSql('DROP TABLE categorie');
        $this->addSql('DROP TABLE categorie_oeuvre');
        $this->addSql('DROP TABLE matiere');
        $this->addSql('DROP TABLE matiere_oeuvre');
        $this->addSql('DROP TABLE oeuvre');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
