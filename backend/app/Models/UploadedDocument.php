<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class UploadedDocument extends Model
{
    protected $guarded = ['id'];

    protected function casts(): array
    {
        return ['scanned_at' => 'datetime'];
    }

    public function request(): HasOne
    {
        return $this->hasOne(InformationRequest::class, 'document_id');
    }
}