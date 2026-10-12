<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class InformationRequest extends Model
{
    protected $guarded = ['id'];

    protected function casts(): array
    {
        return ['submitted_at' => 'date', 'estimated_completed_at' => 'date'];
    }

    public function document(): BelongsTo
    {
        return $this->belongsTo(UploadedDocument::class, 'document_id');
    }

    public function histories(): HasMany
    {
        return $this->hasMany(RequestHistory::class);
    }
}