<?php
// api/src/Serializer/UploadedFileDenormalizer.php

namespace App\Serializer;

use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

final class UploadedFileDenormalizer implements DenormalizerInterface
{
    /**
     * {@inheritdoc}
     */
    public function denormalize($data, string $type, string $format = null, array $context = []): mixed
    {
        if ($data instanceof UploadedFile) {
            return $data;
        }

        // Gérer le cas où la donnée n'est pas une instance de UploadedFile
        // Par exemple, vous pouvez lever une exception ou retourner null selon la logique métier.

        // Retourner null pour cet exemple (vous pouvez adapter cela à votre logique métier)
        return null;
    }

    /**
     * {@inheritdoc}
     */
    public function supportsDenormalization($data, $type, $format = null): bool
    {
        return $data instanceof UploadedFile;
    }
}
